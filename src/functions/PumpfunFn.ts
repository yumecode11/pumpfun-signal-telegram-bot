import { PublicKey } from '@solana/web3.js'
import * as commands from '../commands'
import { bot, connection } from '../config'
import { getMint } from '@solana/spl-token'
import { getMintTransaction } from '../utils'
import { EARLY_PF_WALLET_COUNT } from '../constants'

const earlyPfWalletsMsg = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.Pumpfun.earlyPfWallets();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}

const earlyPfWalletsFn = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.Pumpfun.earlyPfWallets();

  try {
    const mintAddr = new PublicKey(text.split(" ")[1])
    const tokenInfo = await getMint(connection, mintAddr)

    const mintTx = await getMintTransaction(mintAddr)


    let txSigs: string[] = []

    //  @ts-ignore
    mintTx[0].forEach(element => txSigs = [element.signature, ...txSigs]);

    // Safely calculate the starting index

    if (txSigs.length > EARLY_PF_WALLET_COUNT) {
      txSigs = txSigs.slice(0, EARLY_PF_WALLET_COUNT)
    }
    console.log(txSigs);

    const payers = await connection.getParsedTransactions(txSigs, { commitment: "confirmed", maxSupportedTransactionVersion: 0 })
   
    /// contact https://t.me/yumecode for parse payer

  } catch (error) {
    const mintAddrInvalidMsg = await commands.General.mintAddrInvalidMsg();

    await bot.sendMessage(chatId, mintAddrInvalidMsg, {
      parse_mode: 'HTML'
    })
  }


  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}

export {
  earlyPfWalletsMsg,
  earlyPfWalletsFn
}