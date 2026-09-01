import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Manrope,
  Inter,
} from "next/font/google";

import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MealEats | Nutrition & Healthy Eating Guidance",

  description:
    "Get personalized nutrition guidance, healthy meal recommendations, and helpful information to make better food choices with MealEats.",

  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${instrumentSans.variable}
        ${manrope.variable}
        ${instrumentSerif.variable}
        ${inter.variable}
      `}
    >
      <body className="min-h-full bg-white text-[#1A1A1A] antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}