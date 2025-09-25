import { DataTable } from "./DataTable";
import { columns, loteSchema } from "../app/payments/columns";
import { useBatchStore } from "../store/BatchStore";

export function HomePage() {
  const lotes = useBatchStore((state) => state.lotes);

  const dataBatch = loteSchema.array().safeParse(lotes);

  if (!dataBatch.success) {
    console.error("Error en validación:", dataBatch.error.format());
    return <div>Error en los datos</div>;
  }

  return (
    <div className="p-20">
      <DataTable columns={columns} data={dataBatch.data} />
    </div>
  );
}

export default HomePage;
