import "./globals.css";
import type { Metadata } from "next";
import { RootaHeader } from "@/components/RootaHeader";
import { RootaFooter } from "@/components/RootaFooter";

export const metadata: Metadata = {
  title: "Roota • Ideas Stock Exchange",
  description: "A live registry of ideas with proof & pulse."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          margin: 0,
        }}
      >
        {/* Fixed header */}
        <RootaHeader />

        {/* Page content */}
        <main style={{ paddingTop: 80 }}>{children}</main>

        {/* 🔥 Footer goes HERE */}
        <RootaFooter />
      </body>
    </html>
  );
}
