import type { Metadata } from "next";
// GLOBAL CSS
import "../globals.css";
// POPPINS GOOGLE FONT
import { Poppins } from "@next/font/google";
// COMPONENTS - HEADER, FOOTER
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// CONTEXT - PROVIDER
import { UserProvider } from "@/context/UserContext";
// WEB ANALYTICS VERCEL
import { Analytics } from "@vercel/analytics/react";
// LANGUAGE CHANGER
import LanguageChanger from "@/components/LanguageChanger";

import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

// POPPINS FONT CONFIG
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
  params: { locale: string }; // Ensure locale is passed correctly
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const direction = dir(locale); // Determine text direction

  // Validate locale
  if (!i18nConfig.locales.includes(locale)) {
    console.warn(`Unsupported locale "${locale}" detected.`);
  }

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${poppins.variable} font-poppins bg-white pt-2 sm:pt-6 lg:pt-8 pb-0 px-2 sm:px-12 lg:px-20 overflow-x-hidden`}
      >
        <UserProvider>
          <div className="absolute top-0 right-2 h-6 w-10 flex justify-end items-center">
            <LanguageChanger />
          </div>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
