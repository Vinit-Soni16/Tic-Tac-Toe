export function Scoreboard({ xWins, oWins, draws }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded-lg border bg-secondary px-3 py-2">
        <p className="font-semibold">X</p>
        <p className="text-lg">{xWins}</p>
      </div>
      <div className="rounded-lg border bg-secondary px-3 py-2">
        <p className="font-semibold">O</p>
        <p className="text-lg">{oWins}</p>
      </div>
      <div className="rounded-lg border bg-secondary px-3 py-2">
        <p className="font-semibold">Draws</p>
        <p className="text-lg">{draws}</p>
      </div>
    </div>
  );
}
