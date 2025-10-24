import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roota Core",
  description: "Ideas Stock Exchange"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          margin: 0
        }}
      >
        {children}
      </body>
    </html>
  );
}
