// components/RootaHeader.tsx
import React from "react";
import { RootaLogo } from "./RootaLogo";

export function RootaHeader() {
  return (
    <header className="roota-header">
      <div className="roota-header-inner">
        {/* Верхній рядок: бренд + таби */}
        <div className="roota-header-top">
          <div className="roota-brand">
            <div className="roota-logo-box">
              <RootaLogo size={24} />
            </div>
            <div className="roota-brand-text">
              <div className="roota-brand-title">ROOTA</div>
              <div className="roota-brand-subtitle">
                Ideas Stock Exchange · Proof &amp; Pulse
              </div>
            </div>
          </div>

          <nav className="roota-tabs">
            <button className="roota-tab roota-tab--active">Hive</button>
            <button className="roota-tab">Overview</button>
            <button className="roota-tab">About</button>
          </nav>
          </header>
  );
}

export default RootaHeader;
