import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

import HomePage from "./page/HomePage";
import AsignBagPage from "./page/AsignBagPage";

export default function App() {
  return (
    <Router>
      <header>
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Link className="luis" to="/">
            Home
          </Link>
          <Link to="/asignar/4">Asignar</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/asignar/:id" element={<AsignBagPage />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <footer>Footer</footer>
    </Router>
  );
}
