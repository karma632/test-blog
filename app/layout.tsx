import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { Toaster } from "sonner";
import Providers from "./providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "AppNovia",
  description: "A clean, modern blog landing page.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
   
    <html lang="en" >
       <Providers>
      <body className="min-h-full bg-[#f7f7f2] text-black">
        <div className="min-h-screen">
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-12 lg:py-8">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <Toaster/>
      </body>
      </Providers>
    </html>
  );
}
