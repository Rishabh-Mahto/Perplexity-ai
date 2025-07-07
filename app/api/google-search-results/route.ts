import { NextRequest, NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const limitedResults = {
      ...data,
      items: data.items?.slice(0, 4) || [],
    };
    return NextResponse.json(limitedResults);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
