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
  const [delay, setDelay] = React.useState(1000); // Estado para la velocidad de la animación

  return (
    <div className="flex-1 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Algoritmo {algoritmoActivo}
      </h2>

      {pasos.length > 0 ? (
        <FrameDisplay pasos={pasos} color={color} delay={delay}/>
      ) : (
        <p className="text-center text-gray-500 mb-4 text-lg font-extrabold">
          Aún no se han generado pasos para este algoritmo.
        </p>
      )}

      {/* Contenedor flex para el slider y la explicación */}
      <div className="flex flex-row justify-start items-start gap-26 mt-6 max-w-4xl mx- justify-between">
        {/* Slider moderno */}
        <div className="flex flex-col items-center bg-gradient-to-br from-[#2d1a7e] via-[#1a0919] to-[#20142b] border border-purple-700 shadow-lg rounded-2xl p-6 min-w-[270px]">
          <label className="text-white font-bold mb-4 text-base">Velocidad de animación</label>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="w-56 h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-800 rounded-lg appearance-none cursor-pointer transition-all duration-200 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-pink-400
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-200
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-pink-400
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-white
              "
          />
          <span className="mt-2 text-xs text-gray-300">{delay} ms</span>
        </div>

        {/* Explicación del algoritmo */}
        <div className="bg-gradient-to-br from-[#3b1ee3] via-[#1a0919] to-[#20142b] border border-purple-600 shadow-lg rounded-2xl p-6 max-w-xl text-left text-sm text-white">
          <h3 className="font-extrabold mb-4 text-center text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-800 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            ¿Cómo funciona {algoritmoActivo}?
          </h3>
          <p className="leading-relaxed tracking-wide">
            {descripcion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VistaAlgoritmo;
