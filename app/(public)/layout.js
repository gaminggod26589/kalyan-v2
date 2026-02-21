/**
 * layout.js — Root Layout
 * Wraps every page with shared fonts, metadata, Navbar, and Footer.
 * next/font/google loads fonts at build time (zero layout shift).
 */

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* Inter for body text — clean, readable */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Playfair Display for headings — elegant, trustworthy */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/* SEO metadata for every page (overridden per-page) */
export const metadata = {
  title: {
    default: "Kalyan Physiotherapy | Expert Care & Rehabilitation",
    template: "%s | Kalyan Physiotherapy",
  },
  description:
    "Kalyan Physiotherapy provides expert physiotherapy, rehabilitation, and pain management services in Kalyan, Maharashtra. Book your appointment today.",
  keywords: [
    "physiotherapy",
    "kalyan",
    "rehabilitation",
    "sports injury",
    "orthopaedic",
    "spine care",
    "physio clinic",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kalyan Physiotherapy",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#f7fafa]">
        {/* Sticky top navigation */}
        <Navbar />

        {/* Page content */}
        <main>{children}</main>

        {/* Site footer */}
        <Footer />
      </body>
    </html>
  );
}
