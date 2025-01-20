import React from "react";

function Header() {
  return (
    <header className="mb-4">
      <h1 className="text-2xl font-bold">Recepción de Equipos</h1>
      <div className="mt-2">
        <label className="block text-sm font-medium">Fecha:</label>
        <input type="date" className="border px-2 py-1 rounded" />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium">Código de Recepción:</label>
        <input type="text" value="Autogenerado" disabled className="border px-2 py-1 rounded bg-gray-100" />
      </div>
    </header>
  );
}

export default Header;
