import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Lora,
  Fraunces,
  Space_Grotesk,
  Syne,
  Instrument_Serif,
  DM_Serif_Display,
  Sora,
  Manrope,
} from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SpatialBackground from "@/components/ui/SpatialBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourwebsite.com"),
  title: {
    default: "Chang Liu - Full-Stack Developer & HCI/HRI Researcher",
    template: "%s | Chang Liu",
  },
  description:
    "Portfolio of Chang Liu - UI/UX Designer and Developer specializing in user research, product design, and full-stack development.",
  keywords: [
    "UI Design",
    "UX Design",
    "Product Design",
    "Full Stack Developer",
    "User Research",
    "Design Systems",
  ],
  authors: [{ name: "Chang Liu" }],
  creator: "Chang Liu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    siteName: "Chang Liu Portfolio",
    title: "Chang Liu - Full-Stack Developer & HCI/HRI Researcher",
    description:
      "Portfolio showcasing full-stack development and HRI research projects",
      images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chang Liu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chang Liu - Full-Stack Developer & HCI/HRI Researcher",
    description: "Portfolio showcasing full-stack development and HCI/HRI research projects",
    images: ["/og-image.png"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} ${playfair.variable} ${lora.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${syne.variable} ${instrumentSerif.variable} ${dmSerifDisplay.variable} ${sora.variable} ${manrope.variable}`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <body className="antialiased text-[#dde5f4] bg-[#0a0f1e]">
        <SpatialBackground />
        <ScrollToTop />
        <ScrollAnimations />
        <CustomCursor />
        <div className="relative z-10">
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
