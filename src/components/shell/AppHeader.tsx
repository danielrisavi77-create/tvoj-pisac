import Link from "next/link";

type AppHeaderProps = {
  surface: string;
};

export function AppHeader({ surface }: AppHeaderProps) {
  return (
    <header className="app-header">
      <Link className="app-header__brand" href="/">
        Tvoj Pisac
      </Link>
      <span className="app-header__surface">{surface}</span>
    </header>
  );
}
