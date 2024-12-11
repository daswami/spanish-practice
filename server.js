// Import necessary modules
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure Google Generative AI
const geminiApiKey = process.env.GOOGLE_API_KEY;
if (!geminiApiKey) {
  console.error("API key is missing! Please add it to your .env file.");
  process.exit(1);
}

const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  geminiConfig,
});

// Middleware to parse JSON requests
app.use(express.json());

// Add static file serving - place this before your routes
app.use(express.static('public')); // Assumes your frontend files are in a 'public' directory

// Add route for the root path
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// Store conversation history outside the route handler
let conversationHistory = [];

// Route to handle text generation
app.post("/generate", async (req, res) => {
  // Function to generate the full prompt with context
  function generatePrompt(userPrompt) {
    const preprompt = "You are a helpful assistant that is fluent in Spanish. Your goal is to provide simple answers to the user's question to hold a conversation, helping them practice their second language which is Spanish. You may make up details about your situation as long as they could be logical in response to the question. Please be simple.";
    
    // Build context from conversation history
    let context = "";
    if (conversationHistory.length > 0) {
      context = "\n\nPrevious conversation:\n" + 
        conversationHistory.map(exchange => 
          `User: ${exchange.userPrompt}\nAssistant: ${exchange.response}`
        ).join("\n");
    }

    return `${preprompt}${context}\n\nUser: ${userPrompt}`;
  }

  const userPrompt = req.body.prompt;
  console.log("User prompt:", userPrompt);
  const prompt = generatePrompt(userPrompt);
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required!" });
  }

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = (await result.response.text()).replace(/\*/g, '');
    
    // Add the current exchange to the conversation history
    conversationHistory.push({ userPrompt, response });

    res.json({ response });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
