// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { RootaHeader } from "@/components/RootaHeader";
import { RootaFooter } from "@/components/RootaFooter";
// якщо RootaFooter є — імпортуй, якщо ні, прибери його з JSX
export const metadata: Metadata = {
  title: "Roota · Ideas Stock Exchange",
  description: "Roota is a live registry of ideas with proof and pulse.",
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
          margin: 0,
          backgroundColor: "#020617",
          color: "#e5e7eb",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        }}
      >
        <RootaHeader />

        {/* відступ зверху, щоб контент не ліз під fixed-хедер */}
        <div
          style={{
            minHeight: "100vh",
            paddingTop: 88,
          }}
        >
          {children}
        </div>

        {/* якщо є футер — залиш, якщо ні, прибери */}
        {/* <RootaFooter /> */}
      </body>
    </html>
  );
}

