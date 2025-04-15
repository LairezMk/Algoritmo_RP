import { useState } from "react";
import {HexColorPicker} from 'react-colorful'; // Selector de color con la librería react-colorful

export default function SolicitarDatos({ onStart }) { //
  const [referencias, setReferencias] = useState(""); // Cadena de referencias de página, inicialmente vacía
  const [marcos, setMarcos] = useState(3); // Número de marcos por defecto es 3
  const [algoritmo, setAlgoritmo] = useState("FIFO"); // Algoritmo por defecto es FIFO
  const [color, setColor] = useState("#3498db"); // Color por defecto es azul

  const handleSubmit = (e) => { 
    e.preventDefault();
    const referenciasArray = referencias.split(",").map(num => parseInt(num.trim()));
    onStart({ referencias: referenciasArray, marcos, algoritmo, color });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <label>
        Referencias de página (ej: 7,0,1,2,...):
        <input
          type="text"
          value={referencias}
          onChange={(e) => setReferencias(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Número de marcos:
        <input
          type="number"
          value={marcos}
          onChange={(e) => setMarcos(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Algoritmo:
        <select
          value={algoritmo}
          onChange={(e) => setAlgoritmo(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
          <option value="FIFO+">FIFO+</option>
          <option value="OPTIMO">Óptimo</option>
        </select>
      </label>

      <label>
        Color de borde:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-12 rounded-full border-2"
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Iniciar Simulación
      </button>
    </form>
  );
}
