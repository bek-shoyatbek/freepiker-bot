export const i18n = {
  uz: {
    greetWithOldUser: (name: string) => `Salom, ${name}!
Iltimos, file linkini yuboring 👇`,
    greetWithNewUser: (name: string) => `Salom, ${name}!

Sizda 1 ta premium file yuklab olish imkoniyati taqdim etildi 🥳
  
Iltimos, file linkini yuboring 👇`,
    welcome: "Xush kelibsiz! Ro'yxatdan muvaffaqiyatli o'tdingiz. ✅",
    welcomeBack: "Xush kelibsiz!",
    supportRespondText: `Agar biron bir muammoga duch kelsangiz yoki taklifingiz bo'lsa, biz bilan bog'laning

Aloqa: @leadercreador | @bek_shoyatbek`,
    chooseOption: "Iltimos, birini tanlang:",
    chooseLanguage: "Tilni tanlang: ",
    languageSet: "Til muvaffaqiyatli o'rnatildi",
    viewTariffs: "📊 Tarif Rejalarini Ko'rish",
    mySubscription: "📜 Mening Obunam",
    help: "☎️ Yordam",
    aboutUs: "ℹ️ Biz Haqimizda",
    aboutUsRespondText: `ℹ️ Endi siz Freepik.com saytidan premium resurslarni oson, tez va hamyonbop narxlarda yuklab olishingiz mumkin! 
✅ Birinchi premium faylni BEPUL yuklab oling!

Premium contentlar: https://t.me/freepiker24

Biznig asosiy telegram bot: https://t.me/freepikerbot`,
    chooseTariff: "Tarifni tanlang: 📦",
    plans: `Basic - 19 000 so‘m / oy
🔹 Har kuni 5 ta fayl yuklab olish imkoniyati.

Standart - 29 000 so‘m / oy (Eng afzal ko'rilgani)
🔹 Har kuni 10 ta fayl yuklab olish imkoniyati.

Premium - 39 000 so‘m / oy
🔹 Har kuni 20 ta fayl yuklab olish imkoniyati`,
    tariffConfirmation: (plan: string) => `Siz ${plan} tarifini tanladingiz:`,
    price: (price: number) => `Narx: ${price}`,
    dailyDownload: (count: number) => `Kunlik yuklab olish: ${count} ta fayl`,
    continueSubscription: "Xaridni davom ettirasizmi?",
    yes: "Ha",
    reject: "Rad etish",
    cancelPurchase: "Sotib olish bekor qilindi",
    sendPaymentCheck: "Iltimos, to'lov chekingizni rasm formatida yuboring. 🧾",
    paymentProcessing: `To'lovingiz ko'rib chiqilmoqda.

Tasdiqlangandan so'ng sizga xabar beramiz. ⏳`,
    paymentConfirmed: `To'lovingiz tasdiqlandi.

Tarifingiz endi faol. ✅ 🎉
      
Menga link yuborishingiz mumkin 🔗 🙌`,
    paymentRejected: "To'lovingiz tasdiqlanmadi. ❌",
    congratulations: "Tabriklaymiz! 🎉",
    currentPlan: (plan: string) => "Joriy  tarif: " + plan,
    expiresOn: (date: string) => "Amal qilish muddati: " + date,
    dailyDownloadText: "Kunlik yuklab olish:",
    askSupport:
      "Iltimos, bizga xabar berish uchun t.me/@tgplanbot ni ulashing.",
    readyToDownload: (link: string) => `🎨 Sizning resursingiz tayyor! 🎨
    
Faylni tortib olish uchun quyida havola berildi👇

🔗 <a href="${link}">Faylni yuklab olish uchun ushbu linkni bosing</a>

Tabriklaymiz! 🎉`,
    inlivalidLink: "Link not valid. Please try again.",
    requestProcessing: "Sizning so'ro'vingiz yuborilmoqda. ⏳",
    onlyFreepikPremiumContentAllowed:
      "Faqat freepik premium resurslarni yuklab olishingiz lozim.",
    freeTrialAlreadyUsed:
      "Siz bepul sinovdan foydalanib bo'ldingiz. Iltimos, xizmatdan foydalanishda davom etish uchun tarif sotib oling.",
  },
  en: {
    greetWithOldUser: (name: string) => `Hi, ${name}!
Please, Send freepik premium content link here:`,
    greetWithNewUser: (name: string) => `Hi, ${name}!
  
You have been given a free download chance to download premium content 🥳
  
Please, Send freepik premium content link here:`,
    welcome: "Welcome! You have successfully registered. ✅",
    welcomeBack: "Welcome!",
    supportRespondText: `If you encounter any problem or have a suggestion, feel free to contact us

Contact: @leadercreador | @bek_shoyatbek`,
    chooseLanguage: "Choose language: ",
    languageSet: "Language set successfully",
    chooseOption: "Please choose one:",
    viewTariffs: "📊 View Tariff Plans",
    mySubscription: "📜 My Subscription",
    cancelPurchase: "Purchase canceled",
    help: "☎️ Help",
    aboutUs: "ℹ️ About Us",
    aboutUsRespondText: `Now you can download premium resources fast and easily from  Freepik.com at affordable prices! 
✅ Download the first premium file for FREE!

Premium contents: https://t.me/freepiker24

Our telegram bot: https://t.me/freepiker24bot`,
    chooseTariff: "Choose tariff: 📦",
    plans: `Choose tariff: 📦

Basic- 19 000 sum / month
🔹 Ability to download 5 files every day.

Standard- 29 000 sum / month (most preferred)
🔹 Ability to download 10 files every day.

Premium- 39 000 sum / month
🔹 20 file downloads every day`,
    tariffConfirmation: (plan: string) => `You chose the ${plan}:`,
    price: (price: number) => `Price: ${price}`,
    dailyDownload: (count: number) => `Daily download: ${count} files`,
    continueSubscription: "Continue subscribing?",
    yes: "Yes",
    reject: "Rejection",
    sendPaymentCheck:
      "Please send your payment check in picture or PDF format. 🧾",
    paymentProcessing: `Your payment is being considered.
      
We will let you know after confirmation. ⏳`,
    paymentConfirmed: `Your payment has been confirmed.

Your plan is now active. ✅ 🎉

You can send me a link 🔗 🙌`,
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

🔗 <a href="${link}">Click this link to download the file</a>

Congratulations! 🎉`,
    inlivalidLink: "Link not valid. Please try again.",
    requestProcessing: "Your request is being processed.",
    onlyFreepikPremiumContentAllowed:
      "Only freepik premium content is allowed.",
    freeTrialAlreadyUsed:
      "You've already used your free trial. Please purchase a plan to continue using the service.",
  },
  ru: {
    greetWithOldUser: (name: string) => `Привет, ${name}!
Пожалуйста, отправьте ссылку на премиум контент:`,
    greetWithNewUser: (name: string) => `Привет, ${name}!
      
Вы получили шанс загрузить премиум контент без регистрации 🥳
  
Пожалуйста, отправьте ссылку на премиум контент:
  `,
    welcome: "Добро пожаловать! Вы успешно зарегистрировались. ✅",
    welcomeBack: "Добро пожаловать!",
    supportRespondText: `Если у вас возникнут какие-либо проблемы или у вас есть предложение, не стесняйтесь обращаться к нам.

Контакт: @leadercreador | @bek_shoyatbek`,
    chooseLanguage: "Выберите язык: ",
    languageSet: "Язык установлен успешно",
    chooseOption: "Пожалуйста, выберите один из них:",
    viewTariffs: "📊 Просмотр тарифных планов",
    mySubscription: "📜 Моя подписка",
    help: "☎️ Справка",
    aboutUs: "ℹ️ О нас",
    aboutUsRespondText: `ℹ️ Теперь вы можете быстро и легко загружать ресурсы премиум-класса с сайта Freepik.com по доступным ценам! 
✅ Скачайте первый файл премиум-класса бесплатно!

Премиум-контент: https://t.me/freepiker24

Наш телеграм-бот: https://t.me/freepiker24bot`,
    chooseTariff: "Выберите тариф: 📦",
    cancelPurchase: "Покупка отменена",
    plans: `Basic- 19 000 сум / месяц
✔️ Возможность загрузки 5 файлов каждый день.

Стандарт- 29 000 сум / месяц (наиболее предпочтительный)
✔️ Возможность загрузки 10 файлов каждый день.

Премиум- 39 000 сум / месяц
✔️ Возможность загрузки 20 файлов каждый день`,
    tariffConfirmation: (plan: string) => `Вы выбрали ${plan} тариф:`,
    price: (price: number) => `Цена: ${price}`,
    dailyDownload: (count: number) => `Ежедневная загрузка: ${count} файлов`,
    continueSubscription: "Продолжаете делать покупки?",
    yes: "Да",
    reject: "Отказ",
    sendPaymentCheck:
      "Пожалуйста, пришлите ваш платежный чек в виде картинки или в формате PDF. 🧾",
    paymentProcessing: `Ваш платеж рассматривается.
      
Мы сообщим вам об этом после подтверждения. ⏳`,
    paymentConfirmed: `Ваш платеж подтвержден.
      
Теперь ваш тариф активен. ✅ 🎉
      
Вы можете прислать мне ссылку 🔗 🙌`,
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

🔗 <a href="${link}">Нажмите на эту ссылку, чтобы загрузить файл</a>

Поздравляю! 🎉`,
    inlivalidLink: "Ссылка не действительна. Пожалуйста, попробуйте ещё раз.",
    requestProcessing:
      "Ваша заявка рассматривается. Мы сообщим вам об этом после подтверждения. ⏳",
    onlyFreepikPremiumContentAllowed:
      "Вы можете использовать только контент Freepik Premium.",
    freeTrialAlreadyUsed:
      "Вы уже использовали свою бесплатную пробную версию. Пожалуйста, приобретите тарифный план, чтобы продолжить пользоваться сервисом.",
  },
};
