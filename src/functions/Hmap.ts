import { bot, connection } from '../config'
import { captureCanvas } from '../utils/img'
import fs from 'fs';

const hmap = async (msg: any) => {
  const chatId = msg.chat.id;

  /// contact https://t.me/yumecode for scraping data

    // Send the image to the user
    bot.sendPhoto(chatId, fs.createReadStream(outputPath));
  } catch (error) {
    //  @ts-ignore
    bot.sendMessage(chatId, `Failed to capture canvas: ${error.message}`);
  }
}

export {
  hmap
}