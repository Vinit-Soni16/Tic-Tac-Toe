import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function Status({ text }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    try {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );
    } catch (e) {
      // ignore animation errors
    }
  }, [text]);

  return (
    <div ref={ref} aria-live="polite" className="text-center">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">Status</p>
      <p className="mt-1 text-xl sm:text-2xl font-semibold">{text}</p>
    </div>
  );
}
