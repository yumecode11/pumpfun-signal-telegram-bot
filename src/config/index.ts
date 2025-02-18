import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';

config()

const MAINNET_RPC = process.env.MAINNET_RPC || ""
const CHANNEL_HANDLE = process.env.CHANNEL_HANDLE || ""



const connection = new Connection(MAINNET_RPC, { commitment: "processed" })

const botToken = process.env.BOT_TOKEN!

const bot = new TelegramBot(botToken, { polling: true });

export {
  connection,
  CHANNEL_HANDLE,
  bot,
}