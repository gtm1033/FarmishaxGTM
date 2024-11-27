
import { createInstance, InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18nConfig';

interface InitTranslationsResult {
  i18n: ReturnType<typeof createInstance>;
  resources: Record<string, any>; // Adjusted to `any` to match the actual resource store data structure
  t: (key: string) => string;
}

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: ReturnType<typeof createInstance>,
  resources?: Record<string, any> // Adjusted to `any` to match the actual resource store data structure
): Promise<InitTranslationsResult> {
  const instance = i18nInstance || createInstance();

  instance.use(initReactI18next);

  if (!resources) {
    instance.use(
      resourcesToBackend(
        (language:string, namespace:string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await instance.init({
    lng: locale,
    resources,
    fallbackLng: 'en',
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

  return {
    i18n: instance,
    resources: instance.services.resourceStore.data, // No need to cast or adjust here; type is relaxed above
    t: instance.t.bind(instance),
  };
}
