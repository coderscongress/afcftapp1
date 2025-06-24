// src/server/openaiHelper.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askChatGPT  = async (prompt: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', 
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0]?.message?.content ?? '🤖 No response';
};
