import * as fn from './functions'
import * as commands from './commands'
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { bot } from './config';
import { CallbackQuery } from 'node-telegram-bot-api';

let botName: string

const start = async () => {

  bot.getMe().then((user: any) => {
    botName = user.username!.toString()
  })

  bot.setMyCommands(commands.commandList)

  bot.on(`message`, async (msg: any) => {
    const chatId = msg.chat.id!
    const text = msg.text!
    const msgId = msg.message_id!
    const username: string = msg.from!.username!
    const callbackQueryId = msg.id!

    switch (text) {

      case `/top_holders`:
        await fn.GeneralFn.topHolderMsg(msg)
        break;
      case `/early_pf_wallets`:
        await fn.PumpfunFn.earlyPfWalletsMsg(msg)
        break;
      case `/hmap`:
        await fn.Hmap.hmap(msg)
        break;

      default:
        if (text != "" && text != undefined) {
          switch (text.split(" ")[0]) {
            case `/top_holders`:
              await fn.GeneralFn.topHolderFn(msg)
              break;

            case `/early_pf_wallets`:
              await fn.PumpfunFn.earlyPfWalletsFn(msg)
              break;

            case `/hmap`:
              await fn.Hmap.hmap(msg)
              break;

            default:
              break;
          }
        }
        break;
    }
  })
}

start()