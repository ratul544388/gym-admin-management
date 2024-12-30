import { Geist, Geist_Mono, Rubik_Vinyl } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubikVinyl = Rubik_Vinyl({
  variable: "--font-rubik-vinyl",
  subsets: ["latin"],
  weight: ["400"],
});

export const fontsClasses = `${geistSans.variable} ${geistMono.variable} ${rubikVinyl.variable}`;
