import type { Celda } from "../store/CellStore";

export function generarCeldas(filas: number, columnas: number): Celda[] {
  const celdas: Celda[] = [];
  let idCounter = 1;

  for (let f = 1; f <= filas; f++) {
    for (let c = 1; c <= columnas; c++) {
      celdas.push({
        id: `celda-${idCounter++}`,
        fila: f,
        columna: c,
        estado: "disponible",
      });
    }
  }
  return celdas;
}

// Marcar celdas ocupadas según la data externa
export function marcarOcupadas(
  celdas: Celda[],
  ocupadas: { fila: number; columna: number }[]
): Celda[] {
  return celdas.map((celda) => {
    const estaOcupada = ocupadas.some(
      (o) => o.fila === celda.fila && o.columna === celda.columna
    );
    return {
      ...celda,
      estado: estaOcupada ? "ocupado" : celda.estado,
    };
  });
}
