import { sendTextMessage } from "./function/send-text.ts";

export async function runPingPong() {
  await sendTextMessage("Pong!");
}

export async function runMorningCommand() {
  await sendTextMessage("Selamat pagi!");
}

export async function runTimeCommand() {
  const currentTime = new Date().toLocaleTimeString();
  await sendTextMessage(`Sekarang itu jam ${currentTime}`);
}

export async function runAuthorCommand() {
  await sendTextMessage("Yang buat adalah Wahyu");
}

export async function kontol() {
  await sendTextMessage("yahaha hayyu");
}

