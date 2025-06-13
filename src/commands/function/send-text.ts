import { apiKey, session, baseUrl } from "../../config/env.ts";

export async function sendTextMessage(text: string, chatId: string, reply_to: string) {
  const response = await fetch(`${baseUrl}/api/sendText`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
      "X-Api-Key": apiKey ?? "",
    },
    body: JSON.stringify({
      chatId: chatId,
      reply_to: reply_to,
      text: text,
      session: session,
    }),
  });

  const result = await response.json();
  console.log("Response:", result);
}