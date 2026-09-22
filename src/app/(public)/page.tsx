import { AppHeader } from "@/components/shell/AppHeader";

export default function PublicPage() {
  return (
    <div className="app-shell">
      <AppHeader surface="Foundation" />
      <main className="surface-card">
        <p className="eyebrow">Javni prostor</p>
        <h1>Tvoj Pisac</h1>
        <p>
          Osnovni prostor za upoznavanje usluge, dogovor opsega i komunikaciju o
          projektu.
        </p>
      </main>
    </div>
  );
}
