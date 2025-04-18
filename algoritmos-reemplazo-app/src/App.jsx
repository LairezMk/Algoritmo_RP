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
    setPasos(resultado);
  };
  
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#3b1ee3] via-[#1a0919] to-[#20142b] text-white flex font-sans items-stretch">
      {/* Sidebar izquierdo */}
      <div className="w-110 px-6 py-10 bg-[#1c2331] shadow-xl rounded-r-3xl flex flex-col gap-6 relative overflow-hidden z-10 max-h-[96.5vh] clip-curve transform -translate-x6 -translate-y6 mt-3">
        <div   className="text-3xl font-extrabold tracking-widest mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-800  drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                Page Replacement Algorithms
        </div>

        <img src={poto} alt="Bad Bunny" width="300" height="300" className=" mx-auto mb-4 py-1 shadow-lg" />

          

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

      {/* Contenido derecho */}
      <div className="flex-1 p-8 flex flex-col gap-6 relative-z-0">
        {/* Tabs de algoritmos */}
        <div className="flex gap-4 justify-center text-xl font-bold mb-4 text-white-300">
          {["FIFO", "LRU", "FIFOPlus", "Optimo", "SecondChance", "Clock"].map((alg) => (
            <button
              key={alg}
              onClick={() => {
                setAlgoritmoActivo(alg);
                setPasos([]);
              }}
              className={`px-5 py-2 rounded-xl text-3xl font-extrabold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
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
        <div className="flex-1 overflow-auto bg-[#1e2a3a] rounded-2xl p-6 shadow-inner">
          <VistaAlgoritmo
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
