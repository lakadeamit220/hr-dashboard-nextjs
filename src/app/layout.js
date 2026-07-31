import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "HR Dashboard",
  description: "Modern HR Management Dashboard",
};

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-transparent">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
