import { apiKey, session, chatId, baseUrl } from "../../config/env.ts";

export async function sendTextMessage(text: string) {
  const response = await fetch(`${baseUrl}/api/sendText`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      chatId: chatId,
      reply_to: null,
      text: text,
      session: session,
    }),
  });

  const result = await response.json();
  console.log("Response:", result);
}