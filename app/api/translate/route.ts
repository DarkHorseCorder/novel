import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

export async function POST(req: Request): Promise<Response> {
    try{
        // Check if the OPENAI_API_KEY is set, if not return 400
        if (!process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY === "") {
            return new Response(
                "Missing GOOGLE_TRANSLATE_API_KEY – make sure to add it to your .env file.",
                {
                    status: 400,
                },
            );
        }
        console.log("Request received:", req.url);
        if (
            process.env.NODE_ENV != "development" &&
            process.env.KV_REST_API_URL &&
            process.env.KV_REST_API_TOKEN
        ) {
            const ip = req.headers.get("x-forwarded-for");
            const ratelimit = new Ratelimit({
            redis: kv,
            limiter: Ratelimit.slidingWindow(50, "1 d"),
            });
        
            const { success, limit, reset, remaining } = await ratelimit.limit(
            `novel_ratelimit_${ip}`,
            );
        
            if (!success) {
            return new Response("You have reached your request limit for the day.", {
                status: 429,
                headers: {
                "X-RateLimit-Limit": limit.toString(),
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": reset.toString(),
                },
            });
            }
        }

        const { text, langcode } = await req.json();
        console.log("Received text:", text);
        console.log("Received langcode:", langcode);

        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}&q=${text}&target=${langcode}`
        );
        console.log("Google Translate API response:", response.status);
        
        // If the response is unauthorized, return a 401 error
        if (response.status === 401) {
            return new Response("Error: You are unauthorized to perform this action", {
                status: 401,
            });
        }
        if(response.status === 200){
            const translatedText = await response.json();
            return new Response(JSON.stringify(translatedText.data.translations[0].translatedText), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response("Unknown Error", {
            status: 500,
        });
        
    } catch(err) {
        return new Response("Internal Server Error", {
            status: 500,
        })
    }
}