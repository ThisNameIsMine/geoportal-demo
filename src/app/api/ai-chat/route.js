import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ensure the API key is stored securely in an environment variable
export async function POST(req) {
  try {
    const { prompt } = await req.json(); // Parse incoming request data

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error generating AI content:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
