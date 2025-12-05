// components/RootaFooter.tsx
import React from "react";

export function RootaFooter() {
  const year = new Date().getFullYear();

  const styles: { [key: string]: React.CSSProperties } = {
    wrap: {
      borderTop: "1px solid #111827",
      padding: "16px 20px 22px",
      marginTop: 32,
      display: "flex",
      justifyContent: "center",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    },
    inner: {
      width: "100%",
      maxWidth: 1120,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      fontSize: 12,
      color: "#9ca3af",
    },
    right: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      alignItems: "center",
    },
    link: {
      color: "#93c5fd",
      textDecoration: "none",
    },
  };

  return (
    <footer style={styles.wrap}>
      <div style={styles.inner}>
        <div>© {year} Roota · Ideas Stock Exchange · Proof &amp; Pulse</div>
        <div style={styles.right}>
          <span>Public hive stays open.</span>
          <span>
            Contact:{" "}
            <a href="mailto:team@roota.exchange" style={styles.link}>
              team@roota.exchange
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
