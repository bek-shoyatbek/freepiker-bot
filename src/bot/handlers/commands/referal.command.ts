import { generateReferalLink } from "../../generators/referal";
import { MyContext } from "../../types/context";

export const onReferalCommand = async (ctx: MyContext) => {
  const referalLink = generateReferalLink(ctx.from!.id.toString());
  await ctx.reply(
    `Ushbu havolangizni do'stlarga yuborish orqali har bir tarif obunasi uchun siz 20 ta bepul fayl qo'yga kiritasiz. 🤩

Sizning taklif havolangiz tayyor🥳: <a href="${referalLink}">link</a>`,
    { parse_mode: "HTML" },
  );
  return;
};
