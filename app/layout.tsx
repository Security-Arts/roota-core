import "./globals.css";
import type { Metadata } from "next";
import { RootaHeader } from "@/components/RootaHeader";

export const metadata: Metadata = {
  title: "Roota · Ideas Stock Exchange",
  description: "Ideas Stock Exchange · Proof & Pulse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif",
          backgroundColor: "#020617",
          color: "#f9fafb",
          margin: 0,
        }}
      >
        <RootaHeader />
        {/* щоб контент не заїжджав під fixed header */}
        <div
          style={{
            paddingTop: 96,
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
