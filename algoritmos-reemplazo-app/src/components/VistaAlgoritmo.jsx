import React from 'react';
import FrameDisplay from './FrameDisplay';

const explicaciones = {
  FIFO: "El algoritmo FIFO (First-In, First-Out) reemplaza la página que lleva más tiempo en memoria, sin considerar si fue usada recientemente.",
  LRU: "LRU (Least Recently Used) reemplaza la página que no ha sido usada en el mayor tiempo, asumiendo que es menos probable que se necesite pronto.",
  FIFOPlus: "FIFO+ es una mejora del FIFO tradicional. Añade una 'vida extra' temporal a una página recién ingresada, evitando que sea reemplazada inmediatamente.",
  Optimo: "El algoritmo Óptimo reemplaza la página que no será utilizada por el mayor tiempo posible en el futuro. Es ideal pero requiere conocer el futuro."
};

const VistaAlgoritmo = ({ algoritmoActivo, resultados, color }) => {
  const pasos = resultados?.[algoritmoActivo] || [];
  const descripcion = explicaciones[algoritmoActivo] || "Algoritmo no reconocido.";

  return (
    <div className="flex-1 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Algoritmo {algoritmoActivo}
      </h2>

      {pasos.length > 0 ? (
        <FrameDisplay pasos={pasos} color={color} />
      ) : (
        <p className="text-center text-gray-500 mb-4">
          Aún no se han generado pasos para este algoritmo.
        </p>
      )}

      {/* Explicación del algoritmo */}
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 max-w-xl mx-auto mt-6 text-left text-sm text-gray-700 animate-float">
        <h3 className="font-semibold mb-2">¿Cómo funciona {algoritmoActivo}?</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

export default VistaAlgoritmo;
