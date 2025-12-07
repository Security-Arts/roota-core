"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootaLogo } from "./RootaLogo";

export function RootaHeader() {
  const pathname = usePathname();

  // Hive підсвічується і на /, і на /hive
  const isHive = pathname === "/hive" || pathname === "/";
  const isOverview = pathname === "/overview";
  const isAbout = pathname === "/about";

  // Стиль тільки для активного таба
  const activeTabStyle: React.CSSProperties = {
    border: "1px solid #3b82f6",
    background:
      "radial-gradient(circle at 20% 0, rgba(37,99,235,1), rgba(15,23,42,1))",
    color: "#ffffff",
  };

  return (
    <header className="roota-header-shell">
      <div className="roota-header-inner">
        {/* Бренд зліва — лінк на головну */}
        <Link href="/" className="roota-header-brand">
          <div className="roota-logo-box">
            <RootaLogo size={26} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div className="roota-brand-title">ROOTA</div>
            <div className="roota-brand-subtitle">
              Ideas Stock Exchange · Proof &amp; Pulse
            </div>
          </div>
        </Link>

        {/* Таби справа */}
        <nav className="roota-header-tabs">
          <Link
            href="/hive"
            className="roota-tab"
            style={isHive ? activeTabStyle : undefined}
          >
            Hive
          </Link>

          <Link
            href="/overview"
            className="roota-tab"
            style={isOverview ? activeTabStyle : undefined}
          >
            Overview
          </Link>

          <Link
            href="/about"
            className="roota-tab"
            style={isAbout ? activeTabStyle : undefined}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default RootaHeader;
