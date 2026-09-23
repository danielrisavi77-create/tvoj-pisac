import type { JSX } from "react";

export function DecorativeScene(): JSX.Element {
  return (
    <div aria-hidden="true" className="decorative-scene">
      <span aria-hidden="true" className="decorative-scene__orb decorative-scene__orb--sun" />
      <span aria-hidden="true" className="decorative-scene__orb decorative-scene__orb--ink" />
      <span aria-hidden="true" className="decorative-scene__line" />
    </div>
  );
}
