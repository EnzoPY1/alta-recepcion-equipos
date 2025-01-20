import React from "react";

function ClienteForm() {
  return (
    <section className="mb-4">
      <h2 className="text-xl font-semibold">Datos del Cliente</h2>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <input type="text" placeholder="Nombre del Cliente" className="border px-2 py-1 rounded" required />
        <select className="border px-2 py-1 rounded" required>
          <option value="">Tipo de Documento</option>
          <option value="CI">CI</option>
          <option value="RUC">RUC</option>
          <option value="DNI">DNI</option>
        </select>
        <input type="text" placeholder="Número de Documento" className="border px-2 py-1 rounded" required />
        <input type="tel" placeholder="Teléfono" className="border px-2 py-1 rounded" required />
        <input type="email" placeholder="Correo Electrónico (Opcional)" className="border px-2 py-1 rounded" />
      </div>
    </section>
  );
}

export default ClienteForm;
