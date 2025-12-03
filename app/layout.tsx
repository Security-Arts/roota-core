import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roota — Ideas Stock Exchange",
  description: "Roota · Ideas Stock Exchange · Proof & Pulse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shell: React.CSSProperties = {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 16px 40px",
    boxSizing: "border-box",
  };

  const headerRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 16,
  };

  const logoRow: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    textDecoration: "none",
    color: "#e5e7eb",
  };

  const logoTitle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "0.24em",
  };

  const logoSubtitle: React.CSSProperties = {
    fontSize: 12,
    color: "#9ca3af",
  };

  const navRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 16,
  };

  const navPills: React.CSSProperties = {
    display: "flex",
    gap: 8,
    padding: 3,
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(2,6,23,0.9)",
  };

  const navLinkBase: React.CSSProperties = {
    padding: "5px 14px",
    borderRadius: 999,
    textDecoration: "none",
    fontSize: 13,
  };

  const navLinkPrimary: React.CSSProperties = {
    ...navLinkBase,
    border: "1px solid #1d4ed8",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.45), transparent 60%) #020617",
    color: "#e5e7eb",
  };

  const navLinkSecondary: React.CSSProperties = {
    ...navLinkBase,
    border: "1px solid transparent",
    color: "#9ca3af",
  };

  const langRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#9ca3af",
  };

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif",
          background:
            "radial-gradient(circle at top left, rgba(30,64,175,0.22), transparent 60%), #020617",
          color: "#f8fafc",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div style={shell}>
          {/* HEADER */}
          <header style={headerRow}>
            {/* Logo */}
            <Link href="/" style={logoRow}>
              <span style={logoTitle}>ROOTA</span>
              <span style={logoSubtitle}>
                Ideas Stock Exchange · Proof &amp; Pulse
              </span>
            </Link>

            {/* Nav + Languages */}
            <div style={navRow}>
              {/* Нав-таблетки */}
              <div style={navPills}>
                <Link href="/" style={navLinkPrimary}>
                  Hive
                </Link>
                <Link href="/about" style={navLinkSecondary}>
                  About
                </Link>
              </div>

              {/* Мови */}
              <div style={langRow}>
                <span style={{ color: "#e5e7eb", fontWeight: 500 }}>EN</span>
                <span>·</span>
                <span>ES</span>
                <span>·</span>
                <span>日本語</span>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
