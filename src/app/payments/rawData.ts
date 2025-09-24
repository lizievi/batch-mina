import { v4 as uuid } from "uuid";
import { paymentSchema } from "./columns";

export const rawData = [
  { id: uuid(), range: "1001-1010", available: 6 },
  { id: uuid(), range: "1011-1020", available: 5 },
  { id: uuid(), range: "1021-1030", available: 8 },
];

const result = paymentSchema.array().safeParse(rawData);

export const payments = result.success ? result.data : [];
