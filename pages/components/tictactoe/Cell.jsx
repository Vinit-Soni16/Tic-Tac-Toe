import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cell({ index, value, onClick, disabled, isWinning }) {
  const markRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (value && markRef.current) {
      try {
        gsap.fromTo(
          markRef.current,
          { scale: 0.4, rotate: -8, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.22, ease: "power2.out" },
        );
      } catch (e) {
        // ignore animation parsing errors in constrained environments
      }
    }
  }, [value]);

  const aria = value ? `Cell ${index + 1}, ${value}` : `Cell ${index + 1}, empty`;

  return (
    <button
      ref={buttonRef}
      aria-label={aria}
      aria-pressed={!!value}
      onClick={onClick}
      disabled={disabled || !!value}
      className={[
        "relative isolate aspect-square w-full select-none rounded-xl",
        "border border-border/70 bg-card/70 backdrop-blur-sm",
        "hover:border-ring/60 hover:bg-card/90 transition-colors",
        "flex items-center justify-center",
        value ? "cursor-default" : "cursor-pointer",
        isWinning ? "ring-2 ring-ring/70" : "",
      ].join(" ")}
    >
      <span
        ref={markRef}
        className={[
          "text-4xl sm:text-5xl md:text-6xl font-extrabold",
          value === "X" ? "text-primary" : value === "O" ? "text-accent" : "text-transparent",
        ].join(" ")}
      >
        {value}
      </span>
    </button>
  );
}
