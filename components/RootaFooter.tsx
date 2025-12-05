"use client";

export function RootaFooter() {
  return (
    <footer
      style={{
        marginTop: 60,
        padding: "30px 20px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
        fontSize: 13,
        color: "#94a3b8",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.6) 100%)",
      }}
    >
      <div style={{ marginBottom: 6 }}>
        Roota • Ideas Stock Exchange · Proof & Pulse
      </div>

      <div style={{ opacity: 0.6 }}>
        © {new Date().getFullYear()} Roota. All rights reserved.
      </div>
    </footer>
  );
}
