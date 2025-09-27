"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePatioStore } from "../store/PatioStore";
import { useCellStore, type EstadoCelda } from "../store/CellStore";
import { useLoteStore } from "../store/LoteStore";
import Grid from "../components/Grid";
import { marcarOcupadas } from "../lib/cellUtils";

export default function AsignBagPage() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState("");
  const [selectedPatioId, setSelectedPatioId] = useState("");
  const [selectedZonaId, setSelectedZonaId] = useState("");

  // Stores
  const { lotes } = useLoteStore();
  const { patios } = usePatioStore();
  const { celdas, setZonaCeldas, actualizarCeldas } = useCellStore();

  // Data actual
  const lote = useMemo(() => lotes.find((item) => item.id === id), [lotes, id]);

  const patioActual = useMemo(
    () => patios.find((p) => p.id === selectedPatioId),
    [patios, selectedPatioId]
  );

  const zonaActual = useMemo(
    () => patioActual?.zonas.find((z) => z.id === selectedZonaId),
    [patioActual, selectedZonaId]
  );

  // Calculamos celdas disponibles
  const disponibles = useMemo(
    () => celdas.filter((c) => c.estado === "disponible").length,
    [celdas]
  );

  // Calculamos sacos no asignados del lote
  const sacosNoAsignados = useMemo(() => {
    if (!lote) return 0;
    const { sacos } = lote;
    const sacosNoAsiganados = sacos.filter(
      ({ estado }) => estado !== "asigned"
    );
    const counSacosNoAsignados = sacosNoAsiganados.length;
    return counSacosNoAsignados;
  }, [lote]);

  // Max = menor entre disponibles y sacos no asignados
  const maxCantidad = Math.min(disponibles, sacosNoAsignados);

  // Side effects
  useEffect(() => {
    if (zonaActual) {
      // Paso 1: cargar celdas de la zona
      setZonaCeldas(zonaActual);

      // Paso 2: marcar ocupadas
      useCellStore.setState((state) => ({
        celdas: marcarOcupadas(state.celdas, [
          { fila: 1, columna: 1 },
          { fila: 2, columna: 2 },
        ]),
      }));
    }
  }, [zonaActual, setZonaCeldas]);

  // Handlers
  const handleClear = () => {
    setCantidad("");
    setSelectedPatioId("");
    setSelectedZonaId("");
  };

  const handleCancel = () => {
    console.log("Cancelar asignación");
  };

  console.log(lote);
  console.log("Zona Actual");

  console.log(zonaActual?.celdas); //"ocupado" | "disponible" | "asignado"

  const handleAssign = () => {
    if (lote) {
      const cantidadSacos = Number(cantidad);
      const sacostotales = lote.sacos;
      const sacosDisponibles = sacostotales.filter(({ estado }) => {
        return estado === "no_asigned";
      });

      const sacosParaAsignar = sacosDisponibles.slice(0, cantidadSacos);

      const nuevasCeldas = celdas.map((celda, index) => {
        
        if (celda.estado === "disponible" && sacosParaAsignar.length > 0) {
          
          const primerSaco = {...sacosParaAsignar[0]};
          sacosParaAsignar.shift();

          return {
            ...celda,
            saco: primerSaco,
            estado: "asignado" as EstadoCelda,
            posicion: index + 1,
          };
        }
        return { ...celda };
      });

      console.log(nuevasCeldas);
      actualizarCeldas(nuevasCeldas);

      

      // console.log(sacostotales);

      // useCellStore.setState((state: any) => {
      //   let count = 0;
      //   const nuevasCeldas = state.celdas.map((celda: Celda) => {
      //     if (celda.estado === "disponible" && count < cantidadSacos) {
      //       count++;
      //       return { ...celda, estado: "asignado" };
      //     }
      //     return celda;
      //   });
      //   console.log("celdas asignadas");
      //   console.log(celdas);
      //   console.log(lote);
      //   return { celdas: nuevasCeldas };
      // });
    }
  };

  // const handleSave () => {
  //   lote
  //   const cantidadSacos = Number(cantidad);

  //   useCellStore.setState((state: any) => {
  //     let count = 0;
  //     const nuevasCeldas = state.celdas.map((celda: Celda) => {
  //       if (celda.estado === "disponible" && count < cantidadSacos) {
  //         count++;
  //         return { ...celda, estado: "ocupado", saco: sacos };
  //       }
  //       return celda;
  //     });
  //     console.log("celdas asignadas");
  //     console.log(celdas);
  //     return { celdas: nuevasCeldas };
  //   });
  // };

  // UI
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Lote:{" "}
          <span className="text-blue-600">
            {lote?.nombre || "Lote no encontrado"}
          </span>
        </h3>

        <span className="text-gray-600">
          Sacos asignados:{" "}
          {lote
            ? `${lote.sacos.filter((s) => s.estado === "asigned").length}/${
                lote.sacos.length
              }`
            : "0/0"}
        </span>
      </div>

      {/* Filtros y controles */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        {/* Selector Patio */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona un Patio
          </label>
          <select
            value={selectedPatioId}
            onChange={(e) => {
              setSelectedPatioId(e.target.value);
              setSelectedZonaId(""); // reset zona al cambiar patio
            }}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Elige un patio</option>
            {patios.map((patio) => (
              <option key={patio.id} value={patio.id}>
                {patio.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selector Zona */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona una Zona
          </label>
          <select
            value={selectedZonaId}
            onChange={(e) => setSelectedZonaId(e.target.value)}
            disabled={!selectedPatioId}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Elige una zona</option>
            {patioActual?.zonas.map((zona) => (
              <option key={zona.id} value={zona.id}>
                {zona.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cantidad para asignar
          </label>
          <input
            type="number"
            min={1}
            max={maxCantidad}
            value={cantidad}
            disabled={!selectedPatioId || !selectedZonaId}
            // onChange={(e) => setCantidad(e.target.value)}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1 && val <= maxCantidad) {
                setCantidad(String(val));
              }
            }}
            placeholder="Ej: 5"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="text-sm text-gray-600 mt-2">
            Celdas Disponibles: {disponibles} | Sacos no asignados:{" "}
            {sacosNoAsignados} |{" "}
            <span className="text-red-600">
              Cantidad máx permitido: {maxCantidad}
            </span>
          </p>
        </div>

        {/* Botones acciones rápidas */}
        <div className="flex gap-2">
          <button
            onClick={handleAssign}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Asignar
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 border rounded-lg p-4 bg-white shadow">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Distribución de sacos
        </h4>
        {zonaActual && <Grid columnas={zonaActual.columnas} celdas={celdas} />}
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-6 pt-4">
        <button
          // onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Guardar
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
