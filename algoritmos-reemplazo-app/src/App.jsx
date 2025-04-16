import { useState } from 'react'
//import './App.css'
import FrameDisplay from './components/FrameDisplay'
import SolicitarDatos from './components/inputs'
import "./App.css" // Importa el archivo CSS para estilos

import FIFO from './algoritmos/fifo'
import LRU from './algoritmos/lru'
import FIFOPlus from './algoritmos/fifo+'
import Optimo from './algoritmos/optimo'

function App(){
    const [pasos, setPasos]= useState([]) // Estado para almacenar los pasos del algoritmo
    const [color, setColor]= useState('#007bff') // Estado para almacenar el color del borde de la tabla

    const handleSimulacion= ({algoritmo, referencias, marcos, color}) =>{

        let resultado=[] // Estado para almacenar el resultado de la simulación
        switch (algoritmo){

            case 'FIFO':
                resultado = FIFO(referencias, marcos);
                break;
            case 'LRU':
                resultado = LRU(referencias, marcos);
                break;
            case 'FIFOPlus':
                resultado = FIFOPlus(referencias, marcos);
                break;
            case 'Optimo':
                resultado= Optimo(referencias, marcos);
                break;
            default:
                alert('Algoritmo no válido');
                return;
        }

        setPasos(resultado); // Actualiza el estado de pasos con el resultado de la simulación
        setColor(color); // Actualiza el estado de color con el color seleccionado
   };


    return(
        <div className="min-h-screen bg-gray-50 p-4">
            <SolicitarDatos onSimular={handleSimulacion}/>
            {pasos.length > 0 && (
                <div className='mt-6'>
                    <FrameDisplay pasos={pasos} color={color} />
                </div>
                )}
        </div>
    );

};

export default App;




// function App() {
//   const ejemploPasos = [
//     { pagina: 7, memoria: [7, null, null], fallo: true },
//     { pagina: 0, memoria: [7, 0, null], fallo: true },
//     { pagina: 1, memoria: [7, 0, 1], fallo: true },
//     { pagina: 2, memoria: [2, 0, 1], fallo: true },
//     { pagina: 0, memoria: [2, 0, 1], fallo: false },
//     { pagina: 3, memoria: [2, 3, 1], fallo: true },
//     { pagina: 0, memoria: [0, 3, 1], fallo: true },
//     { pagina: 4, memoria: [0, 4, 1], fallo: true },
//   ]

//   const colorpersonalizado = '#3498db'

//   return(

//     <div className="min-h-screen bg-gray-50 p-6">
//     <h1 className="text-2xl font-bold text-center mb-4">Prueba de FrameDisplay</h1>
//     <FrameDisplay pasos={ejemploPasos} color={colorpersonalizado} delay={1000} />
//     </div>

//   );
  
// }

// export default App;

//Realizar la prueba del componente PruebaColor
// import React from 'react';
// import PruebaColor from './components/pruebacolor';

// const App = () => {
//   return (
//     <div>
//       <h1>Aplicación de Selección de Color</h1>
//       <PruebaColor /> 
//     </div>
//   );
// };

// export default App;


