import type { Metadata } from "next";
import localFont from "next/font/local";
import logo from "../assets/logo/logo-tab-rounded.png";
import { PageTransition } from "./components/PageTransition";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const playfair = localFont({
  src: [
    { path: "../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf", style: "normal", weight: "400 900" },
    { path: "../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf", style: "italic", weight: "400 900" },
  ],
  variable: "--font-playfair",
});

const itim = localFont({
  src: "../assets/fonts/Itim-Regular.ttf",
  style: "normal",
  weight: "400",
  variable: "--font-itim",
});

const merriweatherSans = localFont({
  src: "../assets/fonts/MerriweatherSans-Regular.ttf",
  style: "normal",
  weight: "400",
  variable: "--font-merriweather-sans",
});

const merriweatherSansBold = localFont({
  src: "../assets/fonts/MerriweatherSans-Bold.ttf",
  style: "normal",
  variable: "--font-merriweather-sans-bold",
});

export const metadata: Metadata = {
  title: "Gal Nissan",
  description: "Gal Nissan in a web format",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${itim.variable} ${merriweatherSans.variable} ${merriweatherSansBold.variable}`}><PageTransition><SiteHeader />{children}<SiteFooter /></PageTransition></body>
    </html>
  );
}
