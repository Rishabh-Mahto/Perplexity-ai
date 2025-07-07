import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  // Google’s autocomplete endpoint (used by their own search box)
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url, {
      headers: {
        // force JSON (sometimes it returns JSONP if no header)
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Suggest API responded ${res.status}`);
    }

    // Response shape: [ originalQuery: string, suggestions: string[] ]
    const [_, suggestions]: [string, string[]] = await res.json();

    // Return up to 6 suggestions
    return NextResponse.json({ suggestions: suggestions.slice(0, 6) });
  } catch (err: any) {
    console.error("Autocomplete error:", err);
    return NextResponse.json(
      { error: "Failed to fetch autocomplete suggestions" },
      { status: 500 }
    );
  }
}
