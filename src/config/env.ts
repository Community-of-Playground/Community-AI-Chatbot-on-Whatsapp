// import "jsr:@std/dotenv/load";
import "https://deno.land/x/dotenv/load.ts";

export const apiKey = Deno.env.get("X_API_KEY") || "";
export const session = Deno.env.get("SESSION") || "";
export const chatId = Deno.env.get("CHAT_ID") || "";
export const baseUrl = Deno.env.get("BASE_URL") || "";
export const websocket = Deno.env.get("WEBSOCKET") || "";
