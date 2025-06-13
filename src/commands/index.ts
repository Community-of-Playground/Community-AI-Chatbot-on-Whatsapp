import { sendTextMessage } from "./function/send-text.ts";
import { getGroupParticipants } from "./function/mention-all.ts";

// Add Logic Command here

export async function runPingPong(chatId: string, replyTo: string) {
  await sendTextMessage("Pong! 🏓", chatId, replyTo);
}

export async function runMorningCommand(chatId: string, replyTo: string) {
  await sendTextMessage("Selamat pagi! ☀️", chatId, replyTo);
}

export async function runTimeCommand(chatId: string, replyTo: string) {
  const currentTime = new Date().toLocaleTimeString('id-ID');
  await sendTextMessage(`Sekarang jam ${currentTime} ⏰`, chatId, replyTo);
}

export async function runAuthorCommand(chatId: string, replyTo: string) {
  await sendTextMessage("Bot ini dibuat oleh Wahyu 👨‍💻", chatId, replyTo);
}

export async function kontol(chatId: string, replyTo: string) {
  await sendTextMessage("yahaha hayyu", chatId, replyTo);
}

export async function MentionAllGroup(chatId: string, replyTo: string) {
  const participants = await getGroupParticipants();
  const text = participants.map((id: string) => `@${id.replace("@c.us", "")}`).join(" ")

  await sendTextMessage(text, chatId, replyTo);
}

export async function runHelpCommand(chatId: string, replyTo: string) {
  const helpText = `
📋 *Daftar Command Bot SAWI*

🏓 /ping - Health check
☀️ /morning - Sapaan pagi
⏰ /time - Waktu saat ini
👨‍💻 /author - Info pembuat bot
👥 /everyone - Mention semua anggota grup
❓ /help - Tampilkan bantuan ini
  `;
  await sendTextMessage(helpText.trim(), chatId, replyTo);
}

// Add Command Handlers here
export const commandHandlers: Record<string, (chatId: string, replyTo: string) => Promise<void>> = {
  "/ping": runPingPong,
  "/morning": runMorningCommand,
  "/time": runTimeCommand,
  "/author": runAuthorCommand,
  "/everyone": MentionAllGroup,
  "/help": runHelpCommand,
};
