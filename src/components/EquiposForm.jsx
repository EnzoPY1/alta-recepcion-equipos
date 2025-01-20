import React, { useState } from "react";

function EquiposForm() {
  const [equipos, setEquipos] = useState([]);

  const agregarEquipo = () => {
    setEquipos([...equipos, { id: equipos.length, dispositivo: "", marca: "", modelo: "", descripcion: "", accesorios: "", cantidad: 1 }]);
  };

  const eliminarEquipo = (id) => {
    setEquipos(equipos.filter((equipo) => equipo.id !== id));
  };

  return (
    <section className="mb-4">
      <h2 className="text-xl font-semibold">Datos de Equipos</h2>
      <button onClick={agregarEquipo} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Agregar Equipo
      </button>
      <div className="mt-4">
        {equipos.map((equipo, index) => (
          <div key={index} className="border p-4 rounded mb-2">
            <input type="text" placeholder="Dispositivo" className="border px-2 py-1 rounded w-full mb-2" />
            <input type="text" placeholder="Marca" className="border px-2 py-1 rounded w-full mb-2" />
            <input type="text" placeholder="Modelo" className="border px-2 py-1 rounded w-full mb-2" />
            <textarea placeholder="Descripción" className="border px-2 py-1 rounded w-full mb-2"></textarea>
            <textarea placeholder="Accesorios (Opcional)" className="border px-2 py-1 rounded w-full mb-2"></textarea>
            <input type="number" placeholder="Cantidad" className="border px-2 py-1 rounded w-full mb-2" required />
            <button onClick={() => eliminarEquipo(equipo.id)} className="bg-red-500 text-white px-4 py-2 rounded">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EquiposForm;
