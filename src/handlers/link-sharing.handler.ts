import { Context, InputFile } from "grammy";
import { RapidapiService } from "../downloaders/rapidapi/rapidapi.service";
import fs from "fs";
import path from "path";

export async function handleLinkSharing(ctx: Context) {
  const downloadUrl = ctx.message?.text;
  if (!downloadUrl) {
    return ctx.reply("Download url is not valid or provided!");
  }
  const rapidapi = new RapidapiService();
  const filePath = await rapidapi.download(downloadUrl);
  if (!filePath) {
    return ctx.reply("Sorry we can't find .zip file for this content :(");
  }

  // Read the file into a buffer
  const fileBuffer = fs.readFileSync(filePath);

  // Get the file name
  const fileName = path.basename(filePath);

  // Send the file using InputFile
  await ctx.replyWithDocument(new InputFile(fileBuffer, fileName));

  // Delete the file after sending
  fs.unlinkSync(filePath);
  return;
}
