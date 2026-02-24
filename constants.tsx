
import { Statute, LegalCategory } from './types';

export const MOCK_BARE_ACTS: Statute[] = [
  {
    id: 'ipc-302',
    title: 'Punishment for Murder',
    section: 'Section 302',
    description: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    category: LegalCategory.CRIMINAL,
    actName: 'Indian Penal Code (IPC)'
  },
  {
    id: 'cpa-2-7',
    title: 'Defective Goods',
    section: 'Section 2(7)',
    description: 'Relates to any fault, imperfection or shortcoming in the quality, quantity, potency, purity or standard which is required to be maintained by or under any law.',
    category: LegalCategory.CONSUMER,
    actName: 'Consumer Protection Act, 2019'
  },
  {
    id: 'ipc-420',
    title: 'Cheating and dishonestly inducing delivery of property',
    section: 'Section 420',
    description: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person...',
    category: LegalCategory.CRIMINAL,
    actName: 'Indian Penal Code (IPC)'
  },
  {
    id: 'ida-25',
    title: 'Unfair Labour Practices',
    section: 'Section 25-T',
    description: 'Prohibition of unfair labour practices by employers or workmen or trade unions.',
    category: LegalCategory.LABOUR,
    actName: 'Industrial Disputes Act, 1947'
  },
  {
    id: 'it-66a',
    title: 'Punishment for sending offensive messages through communication service',
    section: 'Section 66A',
    description: 'Any person who sends, by means of a computer resource or a communication device...',
    category: LegalCategory.CIVIL,
    actName: 'Information Technology Act, 2000'
  }
];

export const SYSTEM_PROMPT = `You are "LEGAL LENSE", an elite Legal Assistant specialized in Indian Law. 
Your goal is to perform Scenario-Based Rule Fetching (RAG).
Given a user's scenario:
1. Identify the core legal conflict.
2. Search for relevant sections from Indian Bare Acts (IPC, CrPC, CPC, etc.).
3. Explain the legal implications in simple terms.
4. Provide structured advice on next steps.

Always cite the specific Act and Section. 
If specific laws are found via Google Search, include their links.
Use a professional, empathetic, and objective tone.`;
