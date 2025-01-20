import React from "react";

function ActionButtons() {
  return (
    <div className="flex justify-end gap-4">
      <button className="bg-gray-500 text-white px-4 py-2 rounded">Limpiar</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Confirmar</button>
    </div>
  );
}

export default ActionButtons;
