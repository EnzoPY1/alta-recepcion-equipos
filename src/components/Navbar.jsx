import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">
          <Link to="/">Sistema de Gestión</Link>
        </h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <Link to="/recepcion-paquetes" className="hover:underline">
            Recepción de Paquetes
          </Link>
          <Link to="/clientes" className="hover:underline">
            Clientes
          </Link>
          <Link to="/dispositivos" className="hover:underline">
            Dispositivos
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
