import { useState } from 'react'
//import './App.css'
import FrameDisplay from './components/FrameDisplay'
import SolicitarDatos from './components/inputs'
import "./App.css" // Importa el archivo CSS para estilos

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



// function App() {
//   const [modoOscuro, setModoOscuro] = useState(false);

//   const alternarModo = () => setModoOscuro(!modoOscuro);

//   // Aplicar clase al <body> directamente para afectar todo
//   useEffect(() => {
//     document.body.className = modoOscuro ? "dark" : "";
//   }, [modoOscuro]);

//   return (
//     <div className="contenido">
//       <h1>{modoOscuro ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}</h1>
//       <button onClick={alternarModo}>
//         Cambiar a {modoOscuro ? "modo claro" : "modo oscuro"}
//       </button>
//     </div>
//   );
// }

// export default App;