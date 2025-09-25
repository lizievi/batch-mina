
// type Celda = { id: string; fila: number; columna: number; estado: "ocupado" | "disponible" | "asignado" };

// interface GridProps2 {
//   columnas: number;
//   celdas: Celda[];
//   onCellClick?: (celdaId: string) => void;
// }

// export default function Grid({ columnas, celdas, onCellClick }: GridProps2) {
//   return (
//     <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}>
//       {celdas.map((celda) => (
//         <button
//           key={celda.id}
//           onClick={() => onCellClick?.(celda.id)}
//           className={`h-16 flex items-center justify-center border rounded ${
//             celda.estado === "ocupado" ? "bg-red-300" :
//             celda.estado === "asignado" ? "bg-yellow-300" : "bg-green-200"
//           }`}
//           aria-label={`Celda ${celda.fila} por ${celda.columna}, estado ${celda.estado}`}
//         >
//           {celda.fila}x{celda.columna}
//         </button>
//       ))}
//     </div>
//   );
// }

// components/Grid.tsx
import type { Celda } from "../store/CellStore";

interface GridProps {
  columnas: number;
  celdas: Celda[];
  onCellClick?: (celdaId: string) => void;
}

export default function Grid({ columnas, celdas, onCellClick }: GridProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}
    >
      {celdas.map((celda) => (
        <button
          key={celda.id}
          onClick={() => onCellClick?.(celda.id)}
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

