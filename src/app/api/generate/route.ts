import { NextRequest, NextResponse } from "next/server";

export interface RizzResponseItem {
  id: string;
  category: string;
  text: string;
  score: string;
  vibe: string;
  deliveryTip: string;
}

// Preset tailored suggestions organized by vibe when API key is not configured or as fallback
const VIBE_TEMPLATES: Record<string, RizzResponseItem[]> = {
  flirty: [
    {
      id: "flirty-1",
      category: "The Icebreaker",
      text: "You had me at your second photo, but this conversation is where the real charm begins 😏",
      score: "98% Match",
      vibe: "Warm & Magnetic",
      deliveryTip: "Send when they've just replied. Keeps the chemistry rolling without sounding desperate.",
    },
    {
      id: "flirty-2",
      category: "Smooth Pivot",
      text: "I was going to wait an hour to reply so I'd look mysteriously cool, but honestly you're way too interesting for that.",
      score: "96% Match",
      vibe: "Confident & Honest",
      deliveryTip: "Self-aware charm always disarms overthinkers.",
    },
    {
      id: "flirty-3",
      category: "Playful Tease",
      text: "Are you always this dangerous to talk to on a Tuesday night, or is today a special occasion?",
      score: "99% Match",
      vibe: "Playful & Bold",
      deliveryTip: "High tension opener. Forces them to laugh and justify themselves.",
    },
  ],
  savage: [
    {
      id: "savage-1",
      category: "Playful Tease",
      text: "That bio has main character energy, but let's see if your banter can actually back it up 💅",
      score: "95% Match",
      vibe: "Savage & Sassy",
      deliveryTip: "Delivered with confidence. Shows you aren't easily impressed.",
    },
    {
      id: "savage-2",
      category: "Smooth Pivot",
      text: "Bold opening move. I'll give it a solid 7.2/10—room for improvement, but you definitely have potential.",
      score: "97% Match",
      vibe: "Teasing Critic",
      deliveryTip: "Flirtatious negging done gently. Expect a fiery response.",
    },
    {
      id: "savage-3",
      category: "The Icebreaker",
      text: "I was warned about people like you, but I clearly make questionable life choices.",
      score: "99% Match",
      vibe: "Unhinged Charisma",
      deliveryTip: "Humorous deflection that immediately establishes an intriguing dynamic.",
    },
  ],
  witty: [
    {
      id: "witty-1",
      category: "The Icebreaker",
      text: "Two truths and a lie: I'm great at making pasta, I have never ghosted anyone, and this is already my favorite match today.",
      score: "97% Match",
      vibe: "Clever & Interactive",
      deliveryTip: "Gives them an irresistible mini-game to play instead of standard small talk.",
    },
    {
      id: "witty-2",
      category: "Smooth Pivot",
      text: "Our compatibility test: If we ordered takeout right now, are we sharing fries or are you defending your carton with your life?",
      score: "98% Match",
      vibe: "Relatable & Fun",
      deliveryTip: "Food debates reveal values faster than 20 generic questions.",
    },
    {
      id: "witty-3",
      category: "Playful Tease",
      text: "I see your profile and raise you one mildly controversial opinion on iced matcha vs coffee.",
      score: "94% Match",
      vibe: "Sharp & Engaging",
      deliveryTip: "Creates a low-stakes debate with effortless banter.",
    },
  ],
  chill: [
    {
      id: "chill-1",
      category: "The Icebreaker",
      text: "Low-key love the vibe of your profile. How's your week treating you so far?",
      score: "93% Match",
      vibe: "Calm & Natural",
      deliveryTip: "Zero pressure, pure authentic warmth. Perfect if you hate over-the-top lines.",
    },
    {
      id: "chill-2",
      category: "Smooth Pivot",
      text: "That spot in your 3rd photo looks unreal—putting together a weekend hitlist, did it live up to the hype?",
      score: "96% Match",
      vibe: "Curious & Casual",
      deliveryTip: "People love sharing recommendations about places they enjoyed.",
    },
    {
      id: "chill-3",
      category: "Playful Tease",
      text: "Not to skip to the good part, but what’s the soundtrack to your Sunday mornings?",
      score: "95% Match",
      vibe: "Aesthetic & Intimate",
      deliveryTip: "Music taste is an instant vibe-check that flows naturally into a playlist exchange.",
    },
  ],
  bold: [
    {
      id: "bold-1",
      category: "The Icebreaker",
      text: "Life's too short for a 3-week text marathon. Drinks this Thursday, or should we pretend we're both too busy first?",
      score: "99% Match",
      vibe: "Direct & Decisive",
      deliveryTip: "For when the conversation is warm and it's time to set up the in-person date.",
    },
    {
      id: "bold-2",
      category: "Smooth Pivot",
      text: "I have a theory that your taste in drinks matches your profile energy: surprisingly sophisticated with a kick.",
      score: "97% Match",
      vibe: "Magnetic & Flirty",
      deliveryTip: "Leads straight into: 'Let's test it at [Cool Bar Name] this week.'",
    },
    {
      id: "bold-3",
      category: "Playful Tease",
      text: "You seem like trouble, but the kind of trouble that comes with great stories and zero regrets.",
      score: "98% Match",
      vibe: "High Voltage",
      deliveryTip: "Flattering, audacious, and guaranteed to stand out from 50 'Hey how are you' texts.",
    },
  ],
};

function parseJsonSafe(rawText: string) {
  try {
    return JSON.parse(rawText);
  } catch {
    const cleaned = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  }
}

export async function POST(req: NextRequest) {
  let detectedKeyName = "None";
  let lastError: string | null = null;

  try {
    const body = await req.json();
    const { tone = "flirty", image = null, text = "" } = body;

    // Support both MERCURY_API_KEY, MERCURY-3, INCEPTION_API_KEY, and AI_API_KEY
    const inceptionKey =
      process.env.MERCURY_API_KEY ||
      process.env.MERCURY_3 ||
      process.env["MERCURY-3"] ||
      process.env.INCEPTION_API_KEY;

    const apiKey = inceptionKey || process.env.AI_API_KEY;

    if (inceptionKey) detectedKeyName = "Inception Labs (Mercury-3)";
    else if (process.env.AI_API_KEY) detectedKeyName = "AI_API_KEY";

    const toneKey = (tone || "flirty").toLowerCase();
    const fallbackList = VIBE_TEMPLATES[toneKey] || VIBE_TEMPLATES.flirty;

    // Effective conversation context for prompt
    const effectiveContext = text && text.trim().length > 0
      ? text.trim()
      : "User matched on a dating app (Tinder/Hinge/Bumble) and needs high-converting witty reply options.";

    // 1. Try Inception Labs (Mercury-3)
    if (inceptionKey && inceptionKey.trim() !== "") {
      try {
        const inceptionRes = await fetch("https://api.inceptionlabs.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${inceptionKey.trim()}`,
          },
          body: JSON.stringify({
            model: "mercury-3",
            messages: [
              {
                role: "system",
                content: `You are RIZZ, an elite dating wingman AI. You write irresistible, witty, charming dating replies tailored to what the match said.
Tone: '${tone.toUpperCase()}'.
Return strictly valid JSON only:
{
  "suggestions": [
    {
      "category": "The Icebreaker",
      "text": "Specific, witty response here",
      "score": "98% Match",
      "vibe": "Quick 2-word vibe",
      "deliveryTip": "Actionable tip on timing/delivery"
    },
    {
      "category": "Smooth Pivot",
      "text": "Specific, clever second option here",
      "score": "96% Match",
      "vibe": "Quick 2-word vibe",
      "deliveryTip": "Actionable tip on timing/delivery"
    },
    {
      "category": "Playful Tease",
      "text": "Specific, bold third option here",
      "score": "99% Match",
      "vibe": "Quick 2-word vibe",
      "deliveryTip": "Actionable tip on timing/delivery"
    }
  ]
}`,
              },
              {
                role: "user",
                content: `Here is what the match said or their profile info: "${effectiveContext}".
Generate 3 distinct dating reply suggestions in '${tone}' tone that directly address what they said!`,
              },
            ],
            temperature: 0.85,
          }),
        });

        if (inceptionRes.ok) {
          const data = await inceptionRes.json();
          const rawContent = data.choices?.[0]?.message?.content;
          if (rawContent) {
            const parsed = parseJsonSafe(rawContent);
            if (Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
              return NextResponse.json({
                success: true,
                tone,
                isLiveAI: true,
                engine: "Inception Labs Mercury-3",
                keyDetected: true,
                suggestions: parsed.suggestions.slice(0, 3).map((item: any, idx: number) => ({
                  id: `mercury-${Date.now()}-${idx}`,
                  category: item.category || (idx === 0 ? "The Icebreaker" : idx === 1 ? "Smooth Pivot" : "Playful Tease"),
                  text: item.text,
                  score: item.score || `${95 + Math.floor(Math.random() * 5)}% Match`,
                  vibe: item.vibe || tone,
                  deliveryTip: item.deliveryTip || "Send with confidence.",
                })),
              });
            }
          }
        } else {
          const errBody = await inceptionRes.text();
          lastError = `Inception Labs HTTP ${inceptionRes.status}: ${errBody.slice(0, 100)}`;
          console.error(lastError);
        }
      } catch (err: any) {
        lastError = `Inception call error: ${err.message}`;
        console.error("Inception Labs call failed:", err);
      }
    }

    // 2. Try Gemini Vision (Multimodal - looks at actual image pixels!)
    if (apiKey && apiKey.trim() !== "" && (apiKey.startsWith("AIza") || !inceptionKey)) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const promptText = `
You are the RIZZ AI dating wingman. 
Look at the attached dating app chat screenshot or profile.
Match tone: "${tone.toUpperCase()}".
Additional context: "${effectiveContext}".

Generate 3 high-impact dating reply suggestions directly reacting to what the person said or their bio in the screenshot.
Respond strictly in JSON:
{
  "suggestions": [
    {
      "category": "The Icebreaker" | "Smooth Pivot" | "Playful Tease",
      "text": "The exact response string to send",
      "score": "9X% Match",
      "vibe": "2-3 word vibe label",
      "deliveryTip": "Actionable tactical tip on delivery"
    }
  ]
}
`;

        const contentsParts: any[] = [{ text: promptText }];
        if (image && typeof image === "string" && image.startsWith("data:")) {
          const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            contentsParts.unshift({
              inlineData: { mimeType: matches[1], data: matches[2] },
            });
          }
        }

        const geminiRes = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: contentsParts }],
            generationConfig: {
              temperature: 0.85,
              responseMimeType: "application/json",
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textResponse) {
            const parsed = parseJsonSafe(textResponse);
            if (Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
              return NextResponse.json({
                success: true,
                tone,
                isLiveAI: true,
                engine: "Gemini Vision AI",
                keyDetected: true,
                suggestions: parsed.suggestions.slice(0, 3).map((item: any, idx: number) => ({
                  id: `gemini-${Date.now()}-${idx}`,
                  category: item.category || (idx === 0 ? "The Icebreaker" : idx === 1 ? "Smooth Pivot" : "Playful Tease"),
                  text: item.text,
                  score: item.score || `${95 + Math.floor(Math.random() * 5)}% Match`,
                  vibe: item.vibe || tone,
                  deliveryTip: item.deliveryTip || "Send with confidence.",
                })),
              });
            }
          }
        }
      } catch (err: any) {
        lastError = `Gemini call error: ${err.message}`;
        console.error("Gemini call failed:", err);
      }
    }

    // Dynamic rotation for curated fallback
    const shuffled = [...fallbackList].sort(() => 0.5 - Math.random());
    const prepared = shuffled.map((item, index) => ({
      ...item,
      id: `${item.id}-${Date.now()}-${index}`,
    }));

    return NextResponse.json({
      success: true,
      tone,
      isLiveAI: false,
      keyDetected: !!apiKey,
      detectedKeyName,
      lastError,
      engine: apiKey ? "RIZZ Fallback (Redeploy Needed)" : "RIZZ Curated Engine",
      suggestions: prepared,
    });
  } catch (error: any) {
    console.error("Route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate rizz",
        suggestions: VIBE_TEMPLATES.flirty,
      },
      { status: 500 }
    );
  }
}
