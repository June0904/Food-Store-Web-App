import { useEffect, useState } from "react";
import { sfx } from "../../lib/soundEffects";

export function GlobalExperience() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const interactive = Boolean((e.target as HTMLElement | null)?.closest("button, a, input, select, textarea, [role='button'], .md-surface-card, .md-instant-tile"));
      setActive(interactive);
    };
    const onDown = (e: MouseEvent) => {
      setClicking(true);
      const interactive = Boolean((e.target as HTMLElement | null)?.closest("button, a, [role='button']"));
      if (interactive) sfx.click();
      else sfx.softTap();
    };
    const onUp = () => setClicking(false);
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest("button, a, [role='button'], .md-surface-card, .md-instant-tile, .badge")) {
        sfx.hover();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") sfx.whoosh();
      else sfx.keyType();
    };
    const onWheel = () => sfx.scrollTick();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="d-none d-lg-block" style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 10000 }}>
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: clicking ? 22 : active ? 44 : 30,
          height: clicking ? 22 : active ? 44 : 30,
          borderRadius: "50%",
          border: active ? "2px solid #8FB36B" : "1.5px solid rgba(143, 179, 107, 0.55)",
          background: clicking ? "rgba(143, 179, 107, 0.32)" : active ? "rgba(143, 179, 107, 0.12)" : "transparent",
          boxShadow: active ? "0 0 18px rgba(143, 179, 107, 0.45)" : "none",
          transform: "translate(-50%, -50%)",
          transition: "width 0.18s ease, height 0.18s ease, background-color 0.18s ease, border-color 0.18s ease",
        }}
      />
    </div>
  );
}
