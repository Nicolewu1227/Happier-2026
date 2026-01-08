
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getMindfulnessAdvice = async (task: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a gentle and supportive life coach focused on mindfulness and mental well-being. 
      The user is performing this task today: "${task}". 
      Please provide a short, healing, and practical piece of advice (3-4 sentences) on how to approach this task mindfully and find joy in it. 
      Keep the tone warm, minimalist, and encouraging. 
      IMPORTANT: Respond in the same language as the task provided (if the task is in Chinese, respond in Chinese; if in English, respond in English).`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "保持正念，感受当下的每一份宁静与快乐。Stay mindful and enjoy the moment.";
  }
};
