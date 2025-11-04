import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AsignBagPage from "./page/AsignBagPage";
import { DataTable } from "./page/DataTable";

export default function App() {
  return (
    <Router>
      <header></header>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/asignar/:id" element={<AsignBagPage />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}
