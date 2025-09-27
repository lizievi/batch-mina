// import { useLoteStore } from "../store/LoteStore";
// import { useCellStore } from "../store/CellStore";



// export function handleAssign(
//   loteId: string,
//   cantidad: number,
//   patioSeleccionado: string | null,
//   zonaSeleccionada: string | null
// ) {
//   // const { lotes, actualizarEstadoSaco } = useLoteStore.getState();
//   // const { celdas, asignarSacosACeldas } = useCellStore.getState();
// const lotes = useLoteStore((state) => state.lotes);
// const { celdas, setZonaCeldas } = useCellStore();


//   // 1. Validaciones previas
//   if (!patioSeleccionado || !zonaSeleccionada) {
//     alert("Debes seleccionar un patio y una zona antes de asignar.");
//     return;
//   }

//   const lote = lotes.find((l) => l.id === loteId);
//   if (!lote) {
//     alert("No se encontró el lote seleccionado.");
//     return;
//   }

//   // 2. Sacos no asignados
//   const sacosNoAsignados = lote.sacos.filter(
//     (s) => s.estado === "no_asigned"
//   );

//   // 3. Celdas disponibles
//   const celdasDisponibles = celdas.filter((c) => c.estado === "disponible");

//   // 4. Validar cantidad máxima
//   const maxCantidad = Math.min(sacosNoAsignados.length, celdasDisponibles.length);
//   if (cantidad < 1 || cantidad > maxCantidad) {
//     alert(`Cantidad inválida. Máximo permitido: ${maxCantidad}, mínimo: 1.`);
//     return;
//   }

//   // 5. Asignar sacos a celdas
//   asignarSacosACeldas(lote.sacos, cantidad);

//   // 6. Cambiar estado de sacos en LoteStore
//   sacosNoAsignados.slice(0, cantidad).forEach((saco) => {
//     actualizarEstadoSaco(loteId, saco.id, "asigned");
//   });

//   alert(` Se asignaron ${cantidad} sacos correctamente.`);
// }

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// src/utils/handleAssign.ts
import { useCellStore } from "../store/CellStore";
import { useLoteStore } from "../store/LoteStore";

export function handleAssign(
  loteId: string | undefined | null,
  cantidadRequested: number,
  selectedPatioId: string | null | undefined,
  selectedZonaId: string | null | undefined
) {
  // Validaciones iniciales
  if (!loteId) {
    alert("No hay lote seleccionado.");
    return;
  }
  if (!selectedPatioId || !selectedZonaId) {
    alert("Selecciona primero el patio y la zona.");
    return;
  }
  const cantidad = Math.floor(Number(cantidadRequested) || 0);
  if (cantidad < 1) {
    alert("La cantidad debe ser al menos 1.");
    return;
  }

  const loteState = useLoteStore.getState();
  const cellState = useCellStore.getState();

  const lote = loteState.lotes.find((l) => l.id === loteId);
  if (!lote) {
    alert("Lote no encontrado.");
    return;
  }

  // Sacos no asignados
  const sacosNoAsignados = lote.sacos.filter((s) => s.estado === "no_asigned");
  if (sacosNoAsignados.length === 0) {
    alert("No hay sacos disponibles en el lote.");
    return;
  }

  // Celdas disponibles (ya deben estar cargadas con setZonaCeldas anteriormente)
  const celdasDisponibles = cellState.celdas.filter((c) => c.estado === "disponible");
  if (celdasDisponibles.length === 0) {
    alert("No hay celdas disponibles en la zona seleccionada.");
    return;
  }

  // Cantidad máxima real
  const maxCantidad = Math.min(sacosNoAsignados.length, celdasDisponibles.length);
  if (cantidad > maxCantidad) {
    alert(`La cantidad excede el máximo permitido (${maxCantidad}).`);
    return;
  }

  // Selecciono los primeros N sacos no asignados
  const sacosSeleccionados = sacosNoAsignados.slice(0, cantidad);

  // 1) Asigno sacos a celdas (CellStore modifica celdas.saco y celdas.estado)
  const asignadosEnCeldas = useCellStore.getState().asignarSacosACeldas(sacosSeleccionados);

  if (asignadosEnCeldas === 0) {
    alert("No se pudo asignar (sin celdas libres).");
    return;
  }

  // 2) Marco esos sacos como 'asigned' en LoteStore (sin mutar referencias del array original)
  const actualizarEstadoSaco = useLoteStore.getState().actualizarEstadoSaco;
  sacosSeleccionados.slice(0, asignadosEnCeldas).forEach((saco) => {
    actualizarEstadoSaco(loteId, saco.id, "asigned");
  });

  alert(`✅ Asignados ${asignadosEnCeldas} sacos al área seleccionada.`);
}

