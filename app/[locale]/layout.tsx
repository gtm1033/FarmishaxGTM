import type { Metadata } from "next";
import "../globals.css";
import { Poppins } from "@next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/react";
import initTranslations from "../i18n";
import LanguageChanger from "@/components/LanguageChanger";
import TranslationProvider from "@/components/TranslationProvider";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FarmIsha",
  description:
    "FarmIsha brings you sustainable hydroponic farming solutions for fresh, soil-free produce year-round.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string }; 
}

const i18nNamespaces = ["default", "Home", "Dashboard"]; 

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const direction = dir(locale); 

  if (!i18nConfig.locales.includes(locale)) {
    console.warn(`Unsupported locale "${locale}" detected.`);
  }

  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${poppins.variable} font-poppins bg-white pt-2 sm:pt-6 lg:pt-8 pb-0 px-2 sm:px-12 lg:px-20 overflow-x-hidden`}
      >
        <UserProvider>
          <TranslationProvider
            locale={locale}
            namespaces={i18nNamespaces}
            resources={resources}
          >
            <div className="absolute top-0 right-0 h-6 w-10 flex justify-end items-center">
              <LanguageChanger />
            </div>
            <Header />
            {children}
            <Analytics />
            <Footer />
          </TranslationProvider>
        </UserProvider>
      </body>
    </html>
  );
}
