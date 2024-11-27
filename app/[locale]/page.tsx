import Banner1 from '@/components/Banner1';
import Banner2 from '@/components/Banner2';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
// import Intro from '@/components/Intro';
import initTranslations from '@/app/i18n';
import TranslationProvider from '@/components/TranslationProvider';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Intro = dynamic(() => import('@/components/Intro'), {
  ssr: false, loading: () => <div className='min-h-screen flex justify-center items-center'>
    <span className='border-2 border-l-green3 border-green2 animate-spin duration-500 h-8 w-8 rounded-full'></span>
  </div>,
});
const i18nNamespaces = ['Home'];
export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  console.log('initTranslations:', initTranslations);

  return (
    <TranslationProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="flex flex-col justify-center items-center">
        {/* {t('login')} */}
        <Suspense fallback={<div className='min-h-screen flex justify-center items-center'>
          <span className='border-2 border-l-green3 border-green2 animate-spin duration-500 h-8 w-8 rounded-full'></span>
        </div>}>
          <Intro />
        <Banner1 />
        <Features />
        <Banner2 />
        <FAQ />
        </Suspense>
      </div>
    </TranslationProvider>
  );
}
