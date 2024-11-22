import type { Metadata } from "next";
//GLOBAL CSS
import "./globals.css";
//POPPINS GOOGLE FONT
import { Poppins } from "@next/font/google";
//COMPONENTS - HEADER , FOOTER
import Header from "../components/Header";
import Footer from "@/components/Footer";
//CONTEXT - PROVIDER
import { UserProvider } from "@/context/UserContext";
//WEB ANALYTICS VERCEL
import { Analytics } from '@vercel/analytics/next';  // WEB ANALYTICS VERCEL

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FarmIsha",
  description: "FarmIsha brings you sustainable hydroponic farming solutions for fresh, soil-free produce year-round.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable}  font-poppins bg-white pt-2 sm:pt-6 lg:pt-8 pb-0 px-2 sm:px-12 lg:px-20  overflow-x-hidden`}
      >
        <UserProvider>
          <Header />
          {children}
          <Analytics />
          < Footer />
        </UserProvider>
      </body>
    </html>
  );
}
