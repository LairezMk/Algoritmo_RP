import "./App.css" // Importa el archivo CSS para estilos
import { useState } from 'react';
import FIFO from './algoritmos/fifo';
import LRU from './algoritmos/lru';
import FIFOPlus from './algoritmos/fifo+';
import Optimo from './algoritmos/optimo';
import PanelInputs from './components/PanelInputs';
import VistaAlgoritmo from "./components/VistaAlgoritmo";


function App() {
  const [algoritmoActivo, setAlgoritmoActivo] = useState("FIFO");
  const [referencias, setReferencias] = useState([]);
  const [marcos, setMarcos] = useState(3);
  const [color, setColor] = useState("#aabbcc");
  const [pasos, setPasos] = useState([]);

  const ejecutarAlgoritmo = () => {
    if (!referencias.length || marcos <= 0) return;

    let resultado = [];
    switch (algoritmoActivo) {
      case "FIFO":
        resultado = FIFO(referencias, marcos);
        break;
      case "LRU":
        resultado = LRU(referencias, marcos);
        break;
      case "FIFOPlus":
        resultado = FIFOPlus(referencias, marcos);
        break;
      case "Optimo":
        resultado = Optimo(referencias, marcos);
        break;
      default:
        alert("Algoritmo no válido");
        return;
    }
    setPasos(resultado);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex">
      {/* Sidebar izquierdo */}
      <div className="w-80 p-6">
        <PanelInputs
          referencias={referencias}
          setReferencias={setReferencias}
          marcos={marcos}
          setMarcos={setMarcos}
          color={color}
          setColor={setColor}
          onGenerar={ejecutarAlgoritmo}
        />
      </div>

      {/* Contenido derecho */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Tabs Manuales */}
        <div className="flex gap-4">
          {["FIFO", "LRU", "FIFOPlus", "Optimo"].map((alg) => (
            <button
              key={alg}
              onClick={() => setAlgoritmoActivo(alg)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                algoritmoActivo === alg
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-800"
              }`}
            >
              {alg}
            </button>
          ))}
        </div>

        {/* Vista del algoritmo seleccionado */}
        <div className="flex-1 overflow-auto">
          <VistaAlgoritmo algoritmoActivo={algoritmoActivo} resultados={{ [algoritmoActivo]: pasos }} color={color} />
        </div>
      </div>
    </div>
  );
}

export default App;