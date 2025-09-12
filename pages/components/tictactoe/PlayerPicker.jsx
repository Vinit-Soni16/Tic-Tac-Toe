import { useEffect } from "react";
import { Button } from "../ui/button";

export function PlayerPicker({ open, onPick }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key.toLowerCase() === "x") onPick("X");
      if (e.key.toLowerCase() === "o") onPick("O");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onPick]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center backdrop-blur-sm bg-black/20 dark:bg-black/40"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xl w-[min(92vw,420px)]">
        <h2 className="text-2xl font-bold text-center">Choose your mark</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Who plays first? Press X or O, or click a button below.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" onClick={() => onPick("X")} className="px-8">
            X
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onPick("O")}
            className="px-8"
          >
            O
          </Button>
        </div>
      </div>
    </div>
  );
}
