import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Board } from "../components/tictactoe/Board";
import { RestartButton } from "../components/tictactoe/RestartButton";
import { Status } from "../components/tictactoe/Status";
import { ThemeToggle } from "../components/tictactoe/ThemeToggle";
import { PlayerPicker } from "../components/tictactoe/PlayerPicker";
import { Scoreboard } from "../components/tictactoe/Scoreboard";
import { getWinner, isDraw, nextPlayer } from "../components/tictactoe/gameUtils";
import { gsap } from "gsap";

export default function Index() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [current, setCurrent] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [draw, setDraw] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(true);

  const [xWins, setXWins] = useState(() => Number(localStorage.getItem("score_x") || 0));
  const [oWins, setOWins] = useState(() => Number(localStorage.getItem("score_o") || 0));
  const [draws, setDraws] = useState(() => Number(localStorage.getItem("score_d") || 0));

  const containerRef = useRef(null);

  const statusText = useMemo(() => {
    if (winner) return `Player ${winner} wins!`;
    if (draw) return "It’s a draw!";
    return `Player ${current}’s turn`;
  }, [winner, draw, current]);

  useEffect(() => {
    localStorage.setItem("score_x", String(xWins));
  }, [xWins]);

  useEffect(() => {
    localStorage.setItem("score_o", String(oWins));
  }, [oWins]);

  useEffect(() => {
    localStorage.setItem("score_d", String(draws));
  }, [draws]);

  const playTone = useCallback((freq, time = 0.08) => {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      o.connect(g);
      g.connect(actx.destination);
      g.gain.setValueAtTime(0.001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.08, actx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + time);
      o.start();
      o.stop(actx.currentTime + time + 0.02);
    } catch {}
  }, []);

  const handlePick = (p) => {
    setCurrent(p);
    setPickerOpen(false);
  };

  const handleCellClick = (index) => {
    if (winner || draw || board[index]) return;
    setBoard((prev) => {
      const next = [...prev];
      next[index] = current;
      return next;
    });
    playTone(current === "X" ? 540 : 420);
    setCurrent((c) => nextPlayer(c));
  };

  useEffect(() => {
    const { winner: w, line } = getWinner(board);
    if (w) {
      setWinner(w);
      setWinningLine(line);
      try {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 1.01,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          });
        }
      } catch (e) {
        // ignore animation errors
      }
      if (w === "X") setXWins((s) => s + 1);
      else setOWins((s) => s + 1);
      playTone(800, 0.2);
      return;
    }
    if (!w && isDraw(board)) {
      setDraw(true);
      setDraws((s) => s + 1);
      playTone(300, 0.2);
    }
  }, [board, playTone]);

  const restart = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setDraw(false);
    setPickerOpen(true);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-gradient-to-br from-primary to-accent"></div>
            <span className="font-bold tracking-tight">Tic Tac Pro</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main ref={containerRef} className="container mx-auto grid place-items-center py-10 sm:py-14">
        <div className="w-full max-w-xl flex flex-col items-center gap-6">
          <Status text={statusText} />
          <Board
            board={board}
            onCellClick={handleCellClick}
            winningLine={winningLine}
            disabled={!!winner || draw}
          />
          <div className="w-full grid gap-4">
            <Scoreboard xWins={xWins} oWins={oWins} draws={draws} />
            <div className="flex justify-center">
              <RestartButton show={!!winner || draw} onClick={restart} />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          Built with React, Tailwind and GSAP & Developed by Vinit Kumar Soni
        </div>
      </footer>

      <PlayerPicker open={pickerOpen && board.every((c) => c === null)} onPick={handlePick} />
    </div>
  );
}
