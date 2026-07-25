import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideActionBar } from "@/components/layout/SideActionBar";
import { EnquiryDrawer } from "@/components/layout/EnquiryDrawer";
import { EnquiryProvider } from "@/components/layout/EnquiryContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const title = "Adrijen Healthcare — Pharmaceutical Manufacturing & PCD Franchise";
const description =
  "Adrijen Healthcare is a Panchkula-based, WHO-GMP certified pharmaceutical company supplying 157+ formulations to distributors, wholesalers and chemists across India. Inquire for bulk orders and PCD franchise partnerships.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adrijenhealthcare.com"),
  title: {
    default: title,
    template: "%s",
  },
  description,
  keywords: [
    "PCD pharma company",
    "pharma distributors India",
    "WHO-GMP pharma",
    "third party manufacturing",
    "pharma wholesale supplier",
    "ISO 9001 pharma",
    "Adrijen Healthcare",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://adrijenhealthcare.com/",
    title: "Adrijen Healthcare — PCD Pharma Franchise",
    description: "157 quality pharma products with monopoly rights, on-time delivery and complete promotional support.",
    images: ["/images/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#0f4c81",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <EnquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SideActionBar />
          <EnquiryDrawer />
        </EnquiryProvider>
      </body>
    </html>
  );
}
