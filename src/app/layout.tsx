import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

import SmoothScroll from "@/components/animations/SmoothScroll";
import ProjectCursor from "@/components/animations/ProjectCursor";
import NavigationGuard from "@/components/animations/NavigationGuard";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  preload: true,
});

export const metadata: Metadata = {
  title: "UkrMadera | Arquitectura en madera",
  description:
    "Diseño, fabricación y construcción de casas y estructuras de madera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body>
        <SmoothScroll />

        <ProjectCursor />
        <NavigationGuard />

        {children}
      </body>
    </html>
  );
}