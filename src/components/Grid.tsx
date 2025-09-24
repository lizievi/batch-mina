// Grilla.jsx
interface GridProps {
  rows: number;
  columns: number;
}

export default function Grid({ rows, columns }: GridProps) {
  return (
    <div
      className="grid gap-2 border p-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * columns }).map((_, i) => (
        <div
          key={i}
          className="h-16 flex items-center justify-center border rounded bg-gray-100"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
