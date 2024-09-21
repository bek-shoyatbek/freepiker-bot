import { User } from "../../../models/user.model";
import { MyContext } from "../../types/context";
import { showLanguageMenu } from "./language.command";

export async function handleStart(ctx: MyContext) {
  ctx.session.onStart = true;
  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  if (!user) {
    const newUser = new User({
      telegramId: ctx.from!.id.toString(),
      name: ctx.from!.first_name,
      username: ctx.from?.username,
    });
    await newUser.save();
    ctx.session.isNewUser = true;
  } else {
    ctx.session.isNewUser = false;
  }
  await showLanguageMenu(ctx);
}
