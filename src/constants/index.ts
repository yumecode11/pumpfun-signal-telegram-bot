import { config } from 'dotenv';

const EARLY_PF_WALLET_COUNT = parseInt(process.env.EARLY_PF_WALLET_COUNT || "5")

export {
  EARLY_PF_WALLET_COUNT
}