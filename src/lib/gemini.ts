import { GoogleGenAI } from "@google/genai";
import { instituteData } from "../data/instituteData";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY is missing in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

const SYSTEM_PROMPT = `
You are "instiGPT", an intelligent, highly reliable, and context-aware AI assistant built exclusively for students at ${instituteData.name}.
Your purpose is to act as a real-time operating layer for student life, academics, and campus interactions.

CORE BEHAVIOR:
- Be precise, fast, and action-oriented.
- Never give vague or generic answers.
- Always prefer institute-specific knowledge over general knowledge.
- If data is unavailable, clearly say so and suggest the next best step.
- Understand informal student language, slang, and abbreviations (e.g., 'insti', 'mess', 'CGPA', 'proff', 'DH').
- Respond naturally, like a smart senior student who knows everything about campus.

INSTITUTE KNOWLEDGE BASE (STRICT SOURCE):
${JSON.stringify(instituteData, null, 2)}

RESPONSE STYLE:
- Confident, helpful, slightly informal.
- Not robotic, not overly casual.
- Use bullet points for readability.
- Clear and structured.

FEATURE MODULES GUIDANCE:
1. ACADEMIC: Answer courses, syllabus, grading.
2. DASHBOARD: Timetable, deadlines.
3. CAMPUS LIFE: Hostels, mess, transport.
4. SENIOR INSIGHTS: Reviews, tips (distinguish from facts).
5. NAVIGATION: Building locations.
6. CAREER: Resumes, interviews.

ERROR HANDLING:
If you don't have exact info, say: "I don't have that exact info yet. Here's what you can do: [suggest action]".
`;

export async function chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], isLowLatency: boolean = false) {
  try {
    const response = await ai.models.generateContent({
      model: isLowLatency ? "gemini-3.1-flash-lite-preview" : "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role === 'model' ? 'model' : 'user', parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      tools: [
        { googleSearch: {} },
        { googleMaps: {} }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
      toolConfig: { includeServerSideToolInvocations: true }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I hit a snag. Try again in a bit?";
  }
}
