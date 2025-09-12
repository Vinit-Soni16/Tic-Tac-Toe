import { Cell } from "./Cell";

export function Board({ board, onCellClick, winningLine, disabled }) {
  return (
    <div
      role="grid"
      aria-label="Tic Tac Toe board"
      className="grid grid-cols-3 gap-3 w-[min(92vw,540px)]"
    >
      {board.map((value, i) => (
        <div key={i} role="row" className="contents">
          <Cell
            index={i}
            value={value}
            onClick={() => onCellClick(i)}
            disabled={disabled}
            isWinning={!!winningLine?.includes(i)}
          />
        </div>
      ))}
    </div>
  );
}
