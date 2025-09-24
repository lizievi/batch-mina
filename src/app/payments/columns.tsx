"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";


export const paymentSchema = z.object({
  id: z.string(),
  range: z.string(),
  available: z.number(),
});

export type Payment = z.infer<typeof paymentSchema>;

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "range",
    header: "Range",
  },
  {
    accessorKey: "available",
    header: "Available",
  },
];
