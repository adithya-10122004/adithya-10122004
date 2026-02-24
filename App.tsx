
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, Statute } from './types';
import { geminiService } from './services/geminiService';
import { performLocalRetrieval } from './services/ragEngine';
import { auth, onAuthStateChanged, User } from './services/firebase';
import ChatMessage from './components/ChatMessage';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import StatuteLibrary from './components/StatuteLibrary';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [currentView, setCurrentView] = useState<'assistant' | 'library'>('assistant');
  const [history, setHistory] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Good day. I am LEGAL LENSE, your premium jurisprudence assistant. Describe a legal conflict or a factual scenario, and I will facilitate the retrieval of pertinent Indian Bare Acts.',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (auth && auth.app) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setInitializing(false);
      });
      return unsubscribe;
    } else {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, currentView]);

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSubmit = async (e?: React.FormEvent, directInput?: string) => {
    if (e) e.preventDefault();
    const query = directInput || input;
    if (!query.trim() || isTyping) return;

    // Ensure we are in assistant view when submitting
    setCurrentView('assistant');

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setHistory(prev => [query, ...prev.filter(h => h !== query)].slice(0, 10));
    setInput('');
    setIsTyping(true);

    try {
      const localMatches = performLocalRetrieval(query);
      const contextString = localMatches.map(m => `${m.section} of ${m.actName}: ${m.description}`).join('\n');

      const { text, sources } = await geminiService.analyzeScenario(
        `Scenario: ${query}\n\nLocal Statutes Context:\n${contextString}`
      );

      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: Date.now(),
        data: {
          analysis: text,
          relevantStatutes: localMatches,
          suggestedSteps: [],
          sources,
        }
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Operational interruption. Statutory repository sync failed.",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleHistorySelect = (scenario: string) => {
    handleSubmit(undefined, scenario);
  };

  const handleDemoAccess = () => {
    setIsDemo(true);
  };

  if (initializing) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-[4px] border-slate-50 rounded-full"></div>
          <div className="w-20 h-20 border-t-[4px] border-[#1A2B4B] rounded-full animate-spin absolute inset-0"></div>
        </div>
      </div>
    );
  }

  if (!user && !isDemo) {
    return <Auth onDemoAccess={handleDemoAccess} />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FC] text-[#1A2B4B]">
      <Sidebar 
        history={history} 
        onHistorySelect={handleHistorySelect} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-white lg:m-6 lg:rounded-[3rem] shadow-2xl z-10 overflow-hidden border border-slate-100 relative">
        {currentView === 'assistant' ? (
          <>
            {/* Header */}
            <header className="px-12 py-12 flex items-center justify-between bg-white border-b border-slate-50 sticky top-0 z-20">
              <div className="flex items-center gap-10">
                <div className="lg:hidden w-12 h-12 bg-[#1A2B4B] rounded-2xl flex items-center justify-center">
                  <i className="fas fa-balance-scale text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="legal-heading text-4xl font-black text-[#1A2B4B] tracking-tight flex items-center gap-4 uppercase">
                    Counsel Terminal
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-md border border-emerald-100">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">RAG Optimized Engine</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest leading-none mb-1">Security Standard</span>
                  <span className="text-sm font-black text-[#1A2B4B] uppercase tracking-tighter">RSA-Verified Access</span>
                </div>
              </div>
            </header>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-10 md:px-24 py-16 space-y-12 bg-[#FDFDFF] no-scrollbar scroll-smooth"
            >
              <div className="max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-12 pl-16">
                    <div className="bg-white p-10 rounded-[3rem] rounded-tl-none border border-slate-100 shadow-2xl shadow-slate-200/40 flex items-center gap-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-[#1A2B4B] rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-[#1A2B4B] rounded-full animate-bounce delay-150"></div>
                        <div className="w-3 h-3 bg-[#1A2B4B] rounded-full animate-bounce delay-300"></div>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Consulting Statutory Archives...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Control */}
            <div className="p-12 lg:p-16 bg-white border-t border-slate-50 shadow-[0_-30px_60px_rgba(0,0,0,0.03)]">
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-[#1A2B4B] rounded-[3rem] opacity-0 group-focus-within:opacity-5 transition-opacity blur-3xl"></div>
                  <div className="relative flex gap-5 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-5 shadow-sm transition-all focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-blue-900/5">
                    <button 
                      type="button"
                      onClick={toggleVoice}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white border border-slate-200 text-slate-400 hover:text-[#1A2B4B]'}`}
                    >
                      <i className={`fas ${isListening ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter scenario for rule fetching..."
                      className="flex-1 px-2 py-4 bg-transparent outline-none text-[#1A2B4B] text-lg font-black placeholder:text-slate-300 placeholder:italic placeholder:font-bold"
                    />
                    <button 
                      type="submit"
                      disabled={isTyping || !input.trim()}
                      className="bg-[#1A2B4B] hover:bg-[#2A3B5B] disabled:bg-slate-100 disabled:text-slate-300 text-white px-12 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-[13px] transition-all flex items-center gap-4 shadow-xl active:scale-95 group"
                    >
                      <span className="hidden sm:inline">Fetch Rules</span>
                      <i className="fas fa-bolt group-hover:rotate-12 transition-transform"></i>
                    </button>
                  </div>
                </div>
                <div className="mt-10 flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
                  {[
                    { label: "Contractual Dispute", icon: "fa-signature" },
                    { label: "IP Theft", icon: "fa-certificate" },
                    { label: "Criminal Trespass", icon: "fa-person-running" },
                    { label: "Defective Products", icon: "fa-box-open" },
                    { label: "Unfair Labour", icon: "fa-users-slash" }
                  ].map(tag => (
                    <button 
                      key={tag.label}
                      type="button"
                      onClick={() => setInput(tag.label)}
                      className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:bg-[#1A2B4B] hover:text-white hover:border-[#1A2B4B] transition-all whitespace-nowrap group shadow-sm"
                    >
                      <i className={`fas ${tag.icon} text-slate-200 group-hover:text-amber-400 transition-colors`}></i>
                      {tag.label}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </>
        ) : (
          <StatuteLibrary />
        )}
      </main>
    </div>
  );
};

export default App;
