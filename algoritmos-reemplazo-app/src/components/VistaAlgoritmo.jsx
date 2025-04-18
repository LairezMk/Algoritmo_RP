import React from 'react';
import FrameDisplay from './FrameDisplay';

const explicaciones = {
  FIFO: "El algoritmo FIFO (First-In, First-Out) reemplaza la página que lleva más tiempo en memoria, sin considerar si fue usada recientemente.",
  LRU: "LRU (Least Recently Used) reemplaza la página que no ha sido usada en el mayor tiempo, asumiendo que es menos probable que se necesite pronto.",
  FIFOPlus: "FIFO+ es una mejora del FIFO tradicional. Añade una 'vida extra' temporal a una página recién ingresada, evitando que sea reemplazada inmediatamente.",
  Optimo: "El algoritmo Óptimo reemplaza la página que no será utilizada por el mayor tiempo posible en el futuro. Es ideal pero requiere conocer el futuro.",
  SecondChance: "Second Chance mejora FIFO al revisar si la página más antigua fue usada recientemente. Si fue usada, se le da otra oportunidad y se mueve al final de la cola.",
  Clock: "Clock es una versión eficiente de Second Chance. Usa un puntero circular para buscar páginas con bit 0 y reemplazarlas, dando oportunidad a las que fueron usadas recientemente.",
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
      <div className="bg-gradient-to-br from-[#3b1ee3] via-[#1a0919] to-[#20142b] border border-purple-600 shadow-lg rounded-2xl p-6 max-w-xl mx-auto mt-6 text-left text-sm text-white">
        <h3 className="font-extrabold mb-4 text-center text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-800 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
          ¿Cómo funciona {algoritmoActivo}?
        </h3>
          <p className="leading-relaxed tracking-wide">
            {descripcion}
              </p>
      </div>

      {/*Slide para manejar la velocidad de la animación de las tablas, entre menos más lenta, y entre más inmediata*/}
      <div className="flex justify-center mt-4">
        <label className="text-white font-bold mr-2">Velocidad de animación:</label>
        <input
          type="range"
          min="0"
          max="2000"
          step="100"
          defaultValue="1000"
          className="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        </div>

    </div>
  );
};

export default VistaAlgoritmo;
