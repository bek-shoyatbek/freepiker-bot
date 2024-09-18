export const i18n = {
  uz: {
    welcome: "Xush kelibsiz! Ro'yxatdan muvaffaqiyatli o'tdingiz. ✅",
    welcomeBack: "Xush kelibsiz!",
    chooseOption: "Iltimos, birini tanlang:",
    chooseLanguage: "Tilni tanlang: ",
    languageSet: "Til muvaffaqiyatli o'rnatildi",
    viewTariffs: "📊 Tarif Rejalarini Ko'rish",
    mySubscription: "📜 Mening Obunam",
    help: "☎️ Yordam",
    aboutUs: "ℹ️ Biz haqimizda",
    chooseTariff: "Tarifni tanlang: 📦",
    basic: {
      name: "Basic",
      price: "19 000 so'm / oy",
      description: "🔹 Har kuni 5 ta fayl yuklab olish imkoniyati.",
    },
    standard: {
      name: "Standart",
      price: "29 000 so'm / oy",
      description: "🔹 Har kuni 10 ta fayl yuklab olish imkoniyati.",
      mostPreferred: "(Eng afzal ko'rilgani)",
    },
    premium: {
      name: "Premium",
      price: "39 000 so'm / oy",
      description: "🔹 Har kuni 20 ta fayl yuklab olish imkoniyati",
    },
    tariffConfirmation: (plan: string) => `Siz ${plan} tarifini tanladingiz:`,
    price: (price: number) => `Narx: ${price}`,
    dailyDownload: (count: number) => `Kunlik yuklab olish: ${count} ta fayl`,
    continueSubscription: "Xaridni davom ettirasizmi?",
    yes: "Ha",
    reject: "Rad etish",
    cancelPurchase: "Sotib olish bekor qilindi",
    sendPaymentCheck: "Iltimos, to'lov chekingizni rasm formatida yuboring. 🧾",
    paymentProcessing:
      "To'lovingiz ko'rib chiqilmoqda.\nTasdiqlangandan so'ng sizga xabar beramiz. ⏳",
    paymentConfirmed:
      "To'lovingiz tasdiqlandi.\nTarifingiz endi faol. ✅ 🎉\nMenga link yuborishingiz mumkin 🔗 🙌",
    paymentRejected: "To'lovingiz tasdiqlanmadi. ❌",
    congratulations: "Tabriklaymiz! 🎉",
    currentPlan: (plan: string) => "Joriy  tarif: " + plan,
    expiresOn: (date: string) => "Amal qilish muddati: " + date,
    dailyDownloadText: "Kunlik yuklab olish:",
    askSupport:
      "Iltimos, bizga xabar berish uchun t.me/@tgplanbot ni ulashing.",
    readyToDownload: (link: string) => `🎨 Sizning resursingiz tayyor! 🎨
Faylni tortib olish uchun quyida havola berildi👇
🔗 <a href="${link}">${link}</a>

Tabriklaymiz! 🎉`,
  },
  en: {
    welcome: "Welcome! You have successfully registered. ✅",
    welcomeBack: "Welcome!",
    chooseLanguage: "Choose language: ",
    languageSet: "Language set successfully",
    chooseOption: "Please choose one:",
    viewTariffs: "📊 View Tariff Plans",
    mySubscription: "📜 My Subscription",
    cancelPurchase: "Purchase canceled",
    help: "☎️ Help",
    aboutUs: "ℹ️ About us",
    chooseTariff: "Choose tariff: 📦",
    basic: {
      name: "Basic",
      price: "$1.49 / month",
      description: "🔹 Ability to download 5 files every day.",
    },
    standard: {
      name: "Standard",
      price: "$2.27 / month",
      description: "🔹 Ability to download 10 files every day.",
      mostPreferred: "(most preferred)",
    },
    premium: {
      name: "Premium",
      price: "$3.05 / month",
      description: "🔹 20 file downloads every day",
    },
    tariffConfirmation: (plan: string) => `You chose the ${plan}:`,
    price: (price: number) => `Price: ${price}`,
    dailyDownload: (count: number) => `Daily download: ${count} files`,
    continueSubscription: "Continue subscribing?",
    yes: "Yes",
    reject: "Rejection",
    sendPaymentCheck:
      "Please send your payment check in picture or PDF format. 🧾",
    paymentProcessing:
      "Your payment is being considered.\nWe will let you know after confirmation. ⏳",
    paymentConfirmed:
      "Your payment has been confirmed.\nYour tariff is now active. ✅ 🎉\nYou can send me a link 🔗 🙌",
    paymentRejected: "Your payment has been rejected. ❌",
    resourceReady: "🎨 Your resource is ready! 🎨",
    downloadLink: "The link below was given to pull the file👇",
    clickToDownload: "Click here to download your file",
    congratulations: "Congratulations! 🎉",
    currentPlan: (plan: string) => "Current plan: " + plan,
    expiresOn: (date: string) => "Expires on: " + date,
    dailyDownloadText: `Daily download:`,
    askSupport: "Please ask support via @tgplanbot",
    readyToDownload: (link: string) => `🎨 Your resource is ready! 🎨

The link below was given to pull the file👇

🔗 <a href="${link}">${link}</a>

Congratulations! 🎉`,
  },
  ru: {
    welcome: "Добро пожаловать! Вы успешно зарегистрировались. ✅",
    welcomeBack: "Добро пожаловать!",
    chooseLanguage: "Выберите язык: ",
    languageSet: "Язык установлен успешно",
    chooseOption: "Пожалуйста, выберите один из них:",
    viewTariffs: "📊 Просмотр тарифных планов",
    mySubscription: "📜 Моя подписка",
    help: "☎️ Справка",
    aboutUs: "ℹ️ О нас",
    chooseTariff: "Выберите тариф: 📦",
    cancelPurchase: "Покупка отменена",
    basic: {
      name: "Basic",
      price: "19 000 сум / месяц",
      description: "✔️ Возможность загрузки 5 файлов каждый день.",
    },
    standard: {
      name: "Стандарт",
      price: "29 000 сум / месяц",
      description: "✔️ Возможность загрузки 10 файлов каждый день.",
      mostPreferred: "(наиболее предпочтительный)",
    },
    premium: {
      name: "Премиум",
      price: "39 000 сум / месяц",
      description: "✔️ Возможность загрузки 20 файлов каждый день",
    },
    tariffConfirmation: (plan: string) => `Вы выбрали ${plan} тариф:`,
    price: (price: number) => `Цена: ${price}`,
    dailyDownload: (count: number) => `Ежедневная загрузка: ${count} файлов`,
    continueSubscription: "Продолжаете делать покупки?",
    yes: "Да",
    reject: "Отказ",
    sendPaymentCheck:
      "Пожалуйста, пришлите ваш платежный чек в виде картинки или в формате PDF. 🧾",
    paymentProcessing:
      "Ваш платеж рассматривается.\nМы сообщим вам об этом после подтверждения. ⏳",
    paymentConfirmed:
      "Ваш платеж подтвержден.\nТеперь ваш тариф активен. ✅ 🎉\nВы можете прислать мне ссылку 🔗 🙌",
    paymentRejected: "Ваш платеж отклонен. ❌",
    resourceReady: "🎨 Ваш ресурс готов! 🎨",
    downloadLink: "Для скачивания файла была указана ссылка ниже👇",
    clickToDownload: "Нажмите здесь, чтобы загрузить свой файл",
    congratulations: "Поздравляю! 🎉",
    currentPlan: (plan: string) => "Текущий тариф: " + plan,
    expiresOn: (date: string) => "Срок действия: " + date,
    dailyDownloadText: `Ежедневная загрузка:`,
    askSupport: "Пожалуйста, задайте свою проблему через @tgplanbot",
    readyToDownload: (link: string) => `🎨 Ваш ресурс готов! 🎨

Ссылка ниже была дана для скачивания вашего файла👇

🔗 <a href="${link}">${link}</a>

Поздравляю! 🎉`,
  },
};
