"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePatioStore } from "../store/PatioStore";
import { useCellStore, type EstadoCelda } from "../store/CellStore";
import { useLoteStore } from "../store/LoteStore";
import { useNavigate } from "react-router-dom";

import Grid from "../components/Grid";

export default function AsignBagPage() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState("");
  const [selectedPatioId, setSelectedPatioId] = useState("");
  const [selectedZonaId, setSelectedZonaId] = useState("");

  const { lotes, updateSacosByIdLote } = useLoteStore();
  const { patios } = usePatioStore();
  const { celdas, setZonaCeldas, actualizarCeldas } = useCellStore();

  const navigate = useNavigate();

  const lote = useMemo(() => lotes.find((item) => item.id === id), [lotes, id]);

  const patioActual = useMemo(
    () => patios.find((p) => p.id === selectedPatioId),
    [patios, selectedPatioId]
  );

  const zonaActual = useMemo(
    () => patioActual?.zonas.find((z) => z.id === selectedZonaId),
    [patioActual, selectedZonaId]
  );

  const celdasDisponibles = celdas.filter(
    (c) => c.estado === "disponible"
  ).length;

  const cantidadSacosDisponibles =
    lote?.sacos.filter((s) => s.estado === "no_asigned").length || 0;

  const maxCantidad = Math.min(celdasDisponibles, cantidadSacosDisponibles);

  const handleClear = () => {
    setCantidad("");
    if (lote) {
      const { sacos } = lote;
      const celdasRestauradas = celdas.map((celda) => {
        if (celda.estado === "asignado") {
          return { ...celda, estado: "disponible" as EstadoCelda, saco: null };
        }
        return celda;
      });

      const celdasAsignadas = celdas.filter(
        (celda) => celda.estado === "asignado"
      );

      const sacosAsignados = celdasAsignadas.map((celda) => celda.saco);

      const sacosActualizados = sacos.map((sacoStore) => {
        const sacoObtenidoParaActualizar = sacosAsignados.find((saco) => {
          return saco?.id === sacoStore.id;
        });
        if (sacoObtenidoParaActualizar) {
          return { ...sacoObtenidoParaActualizar, estado: "no_asigned" };
        }
        return sacoStore;
      });

      actualizarCeldas(celdasRestauradas);
      updateSacosByIdLote(lote.id, sacosActualizados);
    }
  };

  const useHandleAssign = () => {
    if (lote) {
      const cantidadSacos = Number(cantidad);
      const { sacos } = lote;
      console.log("cantidad", cantidad);
      const sacosNoAsignados = sacos.filter(({ estado }) => {
        return estado === "no_asigned";
      });
      const sacosParaAsignar = sacosNoAsignados.slice(0, cantidadSacos);

      const celdasAsignadas = celdas.map((celda) => {
        if (celda.estado !== "disponible") {
          return celda;
        }

        const primerSaco = sacosParaAsignar.shift();
        if (primerSaco) {
          return {
            ...celda,
            estado: "asignado" as EstadoCelda,
            saco: { ...primerSaco, estado: "asignado" },
          };
        }
        return celda;
      });

      const celdasConSacos = celdasAsignadas.filter(
        ({ saco }) => saco?.estado == "asignado"
      );

      const sacosAsignados = celdasConSacos.map((celda) => celda.saco);

      const sacosActualizados = sacos.map((sacoStore) => {
        const sacoObtenidoParaActualizar = sacosAsignados.find((saco) => {
          return saco?.id === sacoStore.id;
        });
        return sacoObtenidoParaActualizar || sacoStore;
      });
      actualizarCeldas(celdasAsignadas);
      updateSacosByIdLote(lote.id, sacosActualizados);
      setCantidad("");
    }
  };

  const handleCancel = () => {
    handleClear();
    navigate(`/`);
  };

  const handleSave = () => {
    if (lote) {
      const celdasAGuardar = celdas.map((celda) => {
        if (celda.estado === "asignado") {
          return { ...celda, estado: "ocupado" as EstadoCelda };
        }
        return celda;
      });

      actualizarCeldas(celdasAGuardar);
    }
  };

  useEffect(() => {
    if (zonaActual) {
      setZonaCeldas(zonaActual);
    }
  }, [zonaActual, setZonaCeldas]);

  useEffect(() => {
    if (!lote) {
      navigate(`/`);
    }
  }, [lote, navigate]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 my-10">
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

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona un Patio
          </label>
          <select
            value={selectedPatioId}
            onChange={(e) => {
              setSelectedPatioId(e.target.value);
              setSelectedZonaId("");
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
            Celdas Disponibles: {celdasDisponibles} <br />
            Sacos no asignados: {cantidadSacosDisponibles} <br />
            <span className="text-red-600">
              Cantidad máx permitido: {maxCantidad}
            </span>
          </p>
        </div>

        {/* Botones acciones rápidas */}
        <div className="flex gap-2">
          <button
            onClick={useHandleAssign}
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

      <div className="mt-6 border rounded-lg p-4 bg-white shadow">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Distribución de sacos
        </h4>
        {zonaActual && <Grid columnas={zonaActual.columnas} celdas={celdas} />}
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <button
          onClick={handleSave}
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
