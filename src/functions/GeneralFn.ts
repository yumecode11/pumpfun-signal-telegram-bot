import { bot, connection } from "../config";
import * as commands from '../commands'
import { PublicKey } from "@solana/web3.js";
import { AccountLayout, getMint } from '@solana/spl-token';
import { getMetaData } from "../utils";

const topHolderMsg = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.General.topHoldersInValid();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}

const topHolderFn = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!


  try {
    const mintAddr = new PublicKey(text.split(" ")[1])
    const metadata = await getMetaData(mintAddr)

    const tokenHoldersAta = await connection.getTokenLargestAccounts(mintAddr)
    const tokenHolderAddrs = tokenHoldersAta.value.map(ele => ele.address)
    const tokenAccountInfo = await connection.getMultipleParsedAccounts(tokenHolderAddrs, { commitment: "processed" })

    const tokenInfo = await getMint(connection, mintAddr)

    const holderInfo = tokenAccountInfo.value.map((ele, idx) => {
      //  @ts-ignore
      // console.log("=> ", ele?.data.parsed.info.tokenAmount.amount);
      return {
        //  @ts-ignore
        holder: ele?.data.parsed.info.owner,
        ...tokenHoldersAta.value[idx],
        //  @ts-ignore
        percentage: Number(ele?.data.parsed.info.tokenAmount.amount) * 100 / Number(tokenInfo.supply)
      }
    })

    console.log(tokenInfo);
    console.log(holderInfo);
    // console.log(metadata);

    // console.log(tokenInfo);

    // console.log(holderInfo);

    await bot.sendMessage(chatId, mintAddr.toBase58(), {
      parse_mode: 'HTML'
    })

  } catch (error) {
    const mintAddrInvalidMsg = await commands.General.mintAddrInvalidMsg();

    await bot.sendMessage(chatId, mintAddrInvalidMsg, {
      parse_mode: 'HTML'
    })


  }

}

export {
  topHolderMsg,
  topHolderFn
}