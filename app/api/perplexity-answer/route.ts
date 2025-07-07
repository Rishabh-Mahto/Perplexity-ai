import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // Safely parse the request body
    const body = await req.json().catch(() => ({}));
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Valid query is required" },
        { status: 400 }
      );
    }

    // Your custom prompt for Gemini
    const prompt = `
      Depending upon the user input sources, summarise and search about the topic. 
      Give a markdown text with proper formatting.
      User input is: "${query.trim()}"
    `;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      const error = await geminiRes.json();
      throw new Error(error.error?.message || "Gemini API request failed");
    }

    const geminiData = await geminiRes.json();
    const markdown = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!markdown) {
      throw new Error("No content generated");
    }

    return NextResponse.json({ markdown });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
