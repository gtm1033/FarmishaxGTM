// 'use client';

// import { I18nextProvider } from 'react-i18next';
// import { i18n as I18nInstance } from 'i18next';
// import { ReactNode } from 'react';

// interface TranslationProviderProps {
//   children: ReactNode;
//   i18n: I18nInstance;
// }

// export default function TranslationProvider({
//   children,
//   i18n,
// }: TranslationProviderProps) {
//   return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
// }

'use client';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';

interface TranslationProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Record<string, any>; // Adjust if you have a stricter type for resources
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationProviderProps) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}