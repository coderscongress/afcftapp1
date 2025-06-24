"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const readline_sync_1 = __importDefault(require("readline-sync"));
const openai_1 = require("openai");
(0, dotenv_1.config)(); // Load API key from .env
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
async function askChatGPT(question) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
            temperature: 0.7,
        });
        const answer = response.choices[0].message.content;
        return answer;
    }
    catch (error) {
        console.error('❌ Error communicating with ChatGPT:', error);
        return 'Sorry, something went wrong. Please try again.';
    }
}
async function startChat() {
    console.log('💬 AfCFTA Chatbot Support is now online.');
    console.log("Type 'exit' to end the chat.\n");
    while (true) {
        const userInput = readline_sync_1.default.question('You: ');
        if (userInput.toLowerCase() === 'exit') {
            console.log('👋 Goodbye!');
            break;
        }
        const response = await askChatGPT(userInput);
        console.log(`ChatGPT: ${response}\n`);
    }
}
startChat();
