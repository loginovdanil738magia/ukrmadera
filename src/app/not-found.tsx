import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span className="not-found-code">404</span>
      <p>Página no encontrada</p>
      <h1>Este espacio todavía no existe.</h1>
      <Link href="/">Volver al inicio</Link>
    </main>
  );
}
