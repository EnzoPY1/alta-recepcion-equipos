import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecepcionPaquetes from "./pages/RecepcionPaquetes";
import CargarDispositivo from "./pages/CargarDispositivo";
import AltaCliente from "./pages/AltaCliente";
import Clientes from "./pages/Clientes";

function App() {
  const [clientes, setClientes] = useState({});
  const [dispositivos, setDispositivos] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/recepcion-paquetes"
          element={
            <RecepcionPaquetes
              dispositivos={dispositivos}
              setDispositivos={setDispositivos}
            />
          }
        />
        <Route
          path="/cargar"
          element={
            <CargarDispositivo
              dispositivos={dispositivos}
              setDispositivos={setDispositivos}
              clientes={clientes}
              setClientes={setClientes}
            />
          }
        />
        <Route
          path="/alta-cliente"
          element={
            <AltaCliente clientes={clientes} setClientes={setClientes} />
          }
        />
        <Route
          path="/clientes"
          element={<Clientes clientes={clientes} setClientes={setClientes} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
