// import "jsr:@std/dotenv/load";
import "https://deno.land/x/dotenv/load.ts";

// Grup WA Spesifik
export const chatIds = [
  "120363399604541928@g.us",
//   "120363123456789@g.us",
//   "6281234567890@c.us", 
];

// Environment variables
export const apiKey = Deno.env.get("X_API_KEY");
export const session = Deno.env.get("SESSION");
export const baseUrl = Deno.env.get("BASE_URL");
export const websocket = Deno.env.get("WEBSOCKET");

// Validate required environment variables
if (!apiKey) {
  throw new Error("X_API_KEY environment variable is required");
}

if (!session) {
  throw new Error("SESSION environment variable is required");
}

if (!baseUrl) {
  throw new Error("BASE_URL environment variable is required");
}

if (!websocket) {
  throw new Error("WEBSOCKET environment variable is required");
}
