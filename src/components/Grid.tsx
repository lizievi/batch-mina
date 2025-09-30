import type { Celda } from "../store/CellStore";
interface GridProps {
  columnas: number;
  celdas: Celda[];
}

export default function Grid({ columnas, celdas }: GridProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}
    >
      {celdas.map((celda) => (
        <button
          key={celda.id}
          className={`h-16 flex items-center justify-center border rounded ${
            celda.estado === "ocupado"
              ? "bg-red-300"
              : celda.estado === "asignado"
              ? "bg-yellow-300"
              : "bg-green-200"
          }`}
        >
          {celda.fila}x{celda.columna}
        </button>
      ))}
    </div>
  );
}
