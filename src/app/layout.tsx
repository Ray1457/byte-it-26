import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Metro Nexus",
  description:
    "Metro Nexus — A smarter urban transit system that reimagines how people move through a city. Seamless, intelligent, and personalized travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className="h-full bg-[#0a0a0a] text-white antialiased overflow-hidden">
        <Navbar />
        <main className="absolute top-[52px] bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
