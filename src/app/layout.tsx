import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
const roboto = localFont({
  src: [
    {
      path: "./fonts/Light.otf",
      weight: "400",
      style: "normal",
    },

    {
      path: "./fonts/Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Ultrabold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Omar Taheri's Resume",
  description:
    "Explore the professional journey, skills, and accomplishments of Omar Taheri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
