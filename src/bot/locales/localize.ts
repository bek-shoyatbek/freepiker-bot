import { i18n } from "./i18n";

type Lang = "uz" | "en" | "ru";
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${DeepKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type I18nKey = DeepKeys<typeof i18n.en>;

export function localize<K extends I18nKey>(
  key: K,
  lang: Lang,
  params: Record<string, string> = {}
): string {
  const langData = i18n[lang] || i18n.en; // Default to English if language not found
  const keys = key.split(".") as (keyof typeof langData)[];
  let text = keys.reduce((obj, k) => obj && obj[k], langData as any) as
    | string
    | undefined;

  if (typeof text === "undefined") {
    console.warn(`Translation key "${key}" not found for language "${lang}"`);
    return key; // Return the key itself if translation is missing
  }

  // Replace parameters in the text
  Object.entries(params).forEach(([param, value]) => {
    text = text!.replace(new RegExp(`{${param}}`, "g"), value);
  });

  return text;
}

// Example usage:
// const translatedText = localize("basic.name", "en", { param1: "value1" });
