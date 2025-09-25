
"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

// ✅ Schema corregido para que coincida con BatchStore
export const loteSchema = z.object({
  id: z.string(),
  loteName: z.string(),   // antes era "range"
  available: z.number(),
});

// ✅ Tipo inferido desde Zod
export type Lote = z.infer<typeof loteSchema>;

// ✅ Columnas que mostrarás en la tabla
export const columns: ColumnDef<Lote>[] = [
  {
    accessorKey: "loteName", // antes "range"
    header: "Rango de sacos",
  },
  {
    accessorKey: "available",
    header: "Disponibles",
  },
];

