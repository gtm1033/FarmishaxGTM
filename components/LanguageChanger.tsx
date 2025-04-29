'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import initTranslations from '@/app/i18n';

export default function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();

  // State to manage current locale
  const [currentLocale, setCurrentLocale] = useState(i18nConfig.defaultLocale);

  useEffect(() => {
    // Get the locale from cookies or default
    const storedLocale =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1] || i18nConfig.defaultLocale;

    setCurrentLocale(storedLocale);
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Update cookies
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // Update i18n
    // await initTranslations(newLocale, ['Home']); // Assuming 'default' namespace is mandatory
    await initTranslations(newLocale, ['default', 'Home', 'Dashboard']);


    // Update local state
    setCurrentLocale(newLocale);

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push(`/${newLocale}${currentPathname}`);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }
    router.refresh();
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      className="bg-green1 text-green3 cursor-pointer font-semibold text-sm outline-none px-2 py-1 rounded"
    >
      {i18nConfig.locales.map((locale) => (
        <option key={locale} value={locale} className='cursor-pointer'>
          {locale.charAt(0).toUpperCase() + locale.slice(1)}
        </option>
      ))}
    </select>
  );
}
