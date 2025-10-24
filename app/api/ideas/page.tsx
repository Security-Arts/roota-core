export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#1e293b",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow:
          "0 24px 48px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)",
        width: "100%",
        maxWidth: "480px",
        lineHeight: 1.4
      }}
    >
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: "#fff"
        }}
      >
        Roota Core 🌱
      </h1>

      <p
        style={{
          fontSize: "0.95rem",
          opacity: 0.8,
          marginBottom: "1rem",
          color: "#fff"
        }}
      >
        Fresh Next.js project is live.
      </p>

      <p
        style={{
          fontSize: "0.8rem",
          opacity: 0.6,
          color: "#fff"
        }}
      >
        Якщо ти бачиш цю сторінку на Vercel — деплой спрацював ✅
      </p>
    </main>
  );
}
