
export enum LegalCategory {
  CRIMINAL = 'Criminal Law',
  CIVIL = 'Civil Law',
  CONSUMER = 'Consumer Protection',
  LABOUR = 'Labour & Employment',
  CONSTITUTIONAL = 'Constitutional Law',
  FAMILY = 'Family Law'
}

export interface Statute {
  id: string;
  title: string;
  section: string;
  description: string;
  category: LegalCategory;
  actName: string;
}

export interface LegalQueryResponse {
  analysis: string;
  relevantStatutes: Statute[];
  suggestedSteps: string[];
  sources: { title: string; uri: string }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  data?: LegalQueryResponse;
}
