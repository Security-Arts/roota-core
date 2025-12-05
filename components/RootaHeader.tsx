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
        </div>

        {/* Hero: текст + картка */}
        <div className="roota-hero">
          <div className="roota-hero-main">
            <div className="roota-kicker">
              ROOTA · IDEAS DESERVE A HOME, NOT A FEED.
            </div>
            <h1 className="roota-hero-title">
              Ideas deserve a home,
              <br />
              not a feed.
            </h1>
            <p className="roota-hero-text">
              Roota turns raw thoughts into timestamped records with{" "}
              <strong>proof</strong> and <strong>pulse</strong>. It's a live
              hive — a place where ideas take root, grow and stay visible to
              people who actually care.
            </p>

            <div className="roota-cta-row">
              <button className="roota-cta roota-cta--primary">
                Enter the Hive
              </button>
              <button className="roota-cta roota-cta--ghost">
                Why Roota exists
              </button>
            </div>
          </div>

          <aside className="roota-hero-card">
            <div className="roota-card-kicker">HEARTBEAT, NOT APPLAUSE</div>
            <p className="roota-card-text">
              Product launches chase applause — a spike of attention, then
              silence. Roota tracks the heartbeat of ideas: every proof fixes a
              moment in time, every pulse adds energy.
            </p>
            <ul className="roota-card-list">
              <li>Visible signals</li>
              <li>Proof tokens, pulse changes, live idea pages.</li>
              <li>Missing on purpose</li>
              <li>Screenshots, pitch decks and vanity likes don’t live here.</li>
            </ul>
          </aside>
        </div>
      </div>
    </header>
  );
}

export default RootaHeader;
