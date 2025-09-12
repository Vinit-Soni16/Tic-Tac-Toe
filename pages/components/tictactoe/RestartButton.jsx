import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../ui/button";

export function RestartButton({ show, onClick }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    try {
      if (show) {
        gsap.fromTo(
          ref.current,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }
        );
      } else {
        gsap.to(ref.current, {
          y: 8,
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
        });
      }
    } catch (e) {
      // ignore animation errors
    }
  }, [show]);

  return (
    <div
      ref={ref}
      className={show ? "pointer-events-auto" : "pointer-events-none opacity-0"}
    >
      <Button onClick={onClick} size="lg" className="px-6">
        Restart Game
      </Button>
    </div>
  );
}
