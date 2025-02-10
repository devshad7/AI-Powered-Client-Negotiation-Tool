import { NextResponse } from "next/server";
import OpenAI from "openai";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { getAuth } from "@clerk/nextjs/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            // console.error("❌ No userId found in Clerk authentication.");
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        let requestCount = 10;

        if (userSnap.exists()) {
            requestCount = userSnap.data().requests ?? 10;
        } else {
            await setDoc(userRef, { requests: 10 });
        }

        if (requestCount <= 0) {
            return NextResponse.json({
                message: "Limit exceeded! You have used all your request limits.",
                summary: "Request limit reached.",
                sentiment: "Neutral",
                remainingRequests: 0
            });
        }

        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // System Prompt for NegotiaAI with an example
        const systemMessage = {
            role: "system",
            content: `You are NegotiaAI, an advanced AI-powered negotiation assistant. Your goal is to help users navigate business negotiations,
                    contracts, and deal-making with strategic insights, persuasive arguments, and effective counteroffers. 

                    **Your Role:**
                    - Analyze the conversation and identify leverage points.
                    - Suggest professional, well-reasoned responses that maximize value.
                    - Maintain a confident, persuasive, and professional tone.
                    - Adapt to the user's negotiation style.
                    - Encourage win-win agreements while prioritizing the user’s interests.

                    **This is very important**
                    --Analyze the conversation and determine the user's industry.
                    And also ask user for their industry like if they ask like "The asking price is too high. Can we lower it by 10%?" or anything like this then ask for which industry you want like for freelancing, saas, real estate, etc apne hisaab se haa but ye option dena response me ki what is your industry type freelancing, ecommerce, saas, realstate etc ye chiz italic me rahna chahiye 
                    --If it involves freelancing, real estate, SaaS, etc., adjust your responses accordingly.

                     agar user kaa message greeting type hai jaise ki: hey, hye, hello, sun like this they reply something like this Hello! How can I assist you with your negotiation or business discussion today?

                    **Additional Task:**
                    After generating your negotiation response, also provide:
                    1. A short summary of the conversation.
                    2. Sentiment analysis (Positive, Neutral, or Negative).
                    
                    **Response Format (JSON):**
                    {
                      "message": "AI-generated negotiation response...",
                      "summary": "Brief conversation summary...",
                      "sentiment": "Positive | Neutral | Negative"
                    }

                    If the user asks anything unrelated to negotiation, respond with:
                    "Sorry, I specialize in negotiation assistance only. If you need help with deals, counteroffers, or contracts, feel free to ask!"
                    
                    If the user asks anything which is not understandable or any random text like "fjksdf jksfjksdhf j sjdfhjsrf askjhdfj a", then respond:
                    "Sorry, I didn't get you" apne tarike me thoda "Sorry, I didn't get you" apne tarike me likhna same nahi`,
        };

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [systemMessage, ...messages],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0]?.message?.content || "{}");

        // Update request count in Firestore
        await updateDoc(userRef, { requests: requestCount - 1 });

        return NextResponse.json({
            message: result.message || "No response received",
            summary: result.summary || "No summary generated",
            sentiment: result.sentiment || "Neutral",
            remainingRequests: requestCount - 1,
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
