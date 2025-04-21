import "./App.css";
import { useState, useEffect } from "react";
import FIFO from "./algoritmos/fifo";
import LRU from "./algoritmos/lru";
import FIFOPlus from "./algoritmos/fifo+";
import Optimo from "./algoritmos/optimo";
import SecondChance from "./algoritmos/secondChance";
import Clock from "./algoritmos/clock";
import PanelInputs from "./components/PanelInputs";
import VistaAlgoritmo from "./components/VistaAlgoritmo";
import poto from "./assets/poto.png";


function App() {
  const [algoritmoActivo, setAlgoritmoActivo] = useState("FIFO");
  const [referencias, setReferencias] = useState([]);
  const [marcos, setMarcos] = useState(3);
  const [color, setColor] = useState("#aabbcc");
  const [pasos, setPasos] = useState([]);
  const [ejecucionKey, setEjecucionKey] = useState(0); // Para forzar la re-renderización

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
      case "SecondChance":
        resultado = SecondChance(referencias, marcos);
        break;
      case "Clock":
        resultado = Clock(referencias, marcos);
        break;
      default:
        alert("Algoritmo no válido");
        return;
    }
    setPasos([...resultado]);
    setEjecucionKey(Date.now()); // Cambia la clave para forzar re-renderización
  };
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#3b1ee3] via-[#1a0919] to-[#20142b] text-white flex flex-col lg:flex-row font-sans">
      {/* Sidebar izquierdo */}
      <div className="w-full lg:w-[28rem] h-screen bg-[#1c1a2e] shadow-xl lg:rounded-r-3xl flex flex-col relative z-10 clip-curve">
        <div className="overflow-auto p-6 flex flex-col gap-6">
          <div className="text-2xl lg:text-3xl text-center font-extrabold tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-800 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            PAGE REPLACEMENT ALGORITHMS
          </div>
  
          <img src={poto} alt="Bad Bunny" className="mx-auto mb-4 w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] py-1 shadow-lg" />
  
          <PanelInputs
            referencias={referencias}
            setReferencias={setReferencias}
            marcos={marcos}
            setMarcos={setMarcos}
            color={color}
            setColor={setColor}
            onGenerar={ejecutarAlgoritmo}
            setPasos={setPasos}
          />
        </div>
      </div>
  
      {/* Contenido derecho */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col gap-4 overflow-auto max-w-full">
        {/* Tabs de algoritmos */}
        <div className="flex flex-wrap gap-3 justify-center text-xl lg:text-2xl font-extrabold mb-2">
          {["FIFO", "LRU", "FIFOPlus", "Optimo", "SecondChance", "Clock"].map((alg) => (
            <button
              key={alg}
              onClick={() => {
                setAlgoritmoActivo(alg);
                setPasos([]);
              }}
              className={`px-4 py-2 rounded-xl text-base lg:text-2xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                algoritmoActivo === alg
                  ? "bg-purple-600 text-white animate-float"
                  : "bg-[#2e3a59] text-gray-300 hover:bg-[#3d4a6a]"
              }`}
            >
              {alg}
            </button>
          ))}
        </div>
  
        {/* Vista del algoritmo seleccionado */}
        <div className="flex-1 overflow-auto bg-[#1c1a2e] rounded-2xl p-4 lg:p-6 shadow-inner max-w-full">
          <VistaAlgoritmo
            key={ejecucionKey}
            algoritmoActivo={algoritmoActivo}
            resultados={{ [algoritmoActivo]: pasos }}
            color={color}
          />
        </div>
      </div>
    </div>
  );  
}

export default App;
