import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAQ — Tigre Beta",
  description: "3 cartas para decidir rápido: gastronomía, escapadas y bolucompras.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
