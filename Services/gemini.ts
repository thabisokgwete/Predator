import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Predator Strategic Consultant, a world-class expert in Game Theory for Competitive Business Environments. 
Your tone is professional, authoritative, analytical, and results-oriented.
You help users understand how to apply 'Predator Models' (Game Theory Frameworks) to their business challenges.
The user is interested in two main frameworks:
1. PREDATOR MODEL: An Offensive Approach for Businesses to Win, Dominate, and Lead in Competitive Markets.
2. PREDATOR MODEL: An Offensive Approach for Firms to Win, Dominate, and Lead in Competitive Private Equity Markets.

Always frame your answers around concepts like:
- Zero-sum vs. non-zero-sum games.
- Nash Equilibrium in competitive markets.
- Information asymmetry in PE deals.
- Incentive structures in organizational design.

Keep responses concise but high-impact.
`;

export const getStrategyResponse = async (history: ChatMessage[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but my strategic processing unit is currently offline. Please try again in a moment.";
  }
};