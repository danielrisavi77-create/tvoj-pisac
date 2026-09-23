import type { ReactNode } from "react";
import { DecorativeScene } from "@/components/public/DecorativeScene";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-layout">
      <DecorativeScene />
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
