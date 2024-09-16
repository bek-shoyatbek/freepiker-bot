import { Translator } from "./translator.interface";

export class TranslatorService implements Translator {
  constructor(private lang: "uz" | "en" | "ru") {}

  getMainMenuText(): string {
    switch (this.lang) {
      case "uz":
        return `Xush kelibsiz! Ro'yxatdan muvaffaqiyatli o'tdingiz. ✅
Iltimos, birini tanlang: `;
      case "en":
        return `Welcome! You have successfully registered. ✅

Please choose one:  `;
      case "ru":
        return `Добро пожаловать! Вы успешно зарегистрировались. ✅

Пожалуйста, выберите один из них: `;
    }
  }
}
