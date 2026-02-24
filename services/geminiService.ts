
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeScenario(scenario: string) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: scenario,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
        // We want a mix of text analysis and search results
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return {
      text: response.text || "I'm sorry, I couldn't analyze that scenario.",
      sources,
    };
  }

  async getStructuredAdvice(scenario: string, retrievedLaws: string) {
    // This helper transforms the raw analysis into a more structured UI-friendly format
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Scenario: ${scenario}\n\nRetrieved Context: ${retrievedLaws}\n\nPlease provide a structured summary with categories: Primary Concern, Key Statutes, and Suggested Legal Steps.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { analysis: response.text };
    }
  }
}

export const geminiService = new GeminiService();
