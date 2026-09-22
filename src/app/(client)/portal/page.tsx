import { AppHeader } from "@/components/shell/AppHeader";

export default function PortalPage() {
  return (
    <div className="app-shell">
      <AppHeader surface="Klijentski portal" />
      <main className="surface-card">
        <p className="eyebrow">Razvojni shell</p>
        <h1>Klijentski portal — razvojni shell</h1>
        <p>Ovdje će kasnija faza dodati zaštićeni prostor za klijenta.</p>
      </main>
    </div>
  );
}
