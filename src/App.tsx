import { DataTable } from "./page/data-table";
import { columns, paymentSchema } from "./app/payments/columns";
import { rawData } from "./app/payments/rawData";
import EditPage from "./page/editPage";

const result = paymentSchema.array().safeParse(rawData);

function App() {
  if (!result.success) {
    return <div>Error en los datos</div>;
  }

  return (
    <>
      <div className="p-6">
        <DataTable columns={columns} data={result.data} />
      </div>
      <EditPage />
    </>
  );
}

export default App;
