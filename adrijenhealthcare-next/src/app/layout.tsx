import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideActionBar } from "@/components/layout/SideActionBar";
import { EnquiryDrawer } from "@/components/layout/EnquiryDrawer";
import { EnquiryProvider } from "@/components/layout/EnquiryContext";
import { JsonLd } from "@/components/shared/JsonLd";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { SITE_SETTINGS } from "@/data/settings";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://adrijenhealthcare.com/#organization",
  name: "Adrijen Healthcare Pvt. Ltd.",
  alternateName: "Adrijen Healthcare",
  url: "https://adrijenhealthcare.com/",
  logo: "https://adrijenhealthcare.com/images/logo.png",
  image: "https://adrijenhealthcare.com/images/og.png",
  description,
  telephone: SITE_SETTINGS.phoneTel,
  email: SITE_SETTINGS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 115, Industrial Area Phase-1",
    addressLocality: "Panchkula",
    addressRegion: "Haryana",
    postalCode: "134113",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.7046,
    longitude: 76.8547,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  sameAs: Object.values(SITE_SETTINGS.social).filter((url) => url && url !== "#"),
  vatID: SITE_SETTINGS.gst,
  taxID: SITE_SETTINGS.cin,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://adrijenhealthcare.com/#website",
  url: "https://adrijenhealthcare.com/",
  name: "Adrijen Healthcare",
  publisher: { "@id": "https://adrijenhealthcare.com/#organization" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <GoogleAnalytics />
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
