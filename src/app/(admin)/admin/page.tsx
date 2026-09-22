import { AppHeader } from "@/components/shell/AppHeader";

export default function AdminPage() {
  return (
    <div className="app-shell">
      <AppHeader surface="Administracija" />
      <main className="surface-card">
        <p className="eyebrow">Razvojni shell</p>
        <h1>Administracija — razvojni shell</h1>
        <p>Ovdje će kasnija faza dodati zaštićene operativne alate.</p>
      </main>
    </div>
  );
}
