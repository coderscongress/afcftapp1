// server/openaiHelper.ts

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const fetchOpenAIResponse = async (userPrompt: string): Promise<string> => {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are ChatGPT, a helpful assistant in a group chat about AfCFTA trade topics.',
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.data.choices[0].message?.content?.trim() || 'No response';
};
