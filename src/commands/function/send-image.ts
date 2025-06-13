// import { apiKey, session, chatIds, baseUrl } from "../../config/env.ts";

// export async function sendTextMessage(caption: string) {
//   const response = await fetch(`${baseUrl}/api/sendText`, {
//     method: "POST",
//     headers: {
//       "accept": "application/json",
//       "Content-Type": "application/json",
//       "X-Api-Key": apiKey,
//     },
//     body: JSON.stringify({
//       chatId: chatIds,
//       "file": {
//         "mimetype": "image/jpeg",
//         "filename": "filename.jpg",
//         "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
//     },
//       caption: caption,
//       session: session,
//     }),
//   });

//   const result = await response.json();
//   console.log("Response:", result);
// }