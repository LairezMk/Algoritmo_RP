//Copia para el algoritmo FIFO+

// export function FIFOPlus(referencias, marcos) {
//     let memoria = new Array(marcos).fill(null);
//     let contador = new Array(marcos).fill(0); // Solo puede haber un '1' a la vez
//     let fallos = 0;
//     let puntero = 0;

//     for (let i = 0; i < referencias.length; i++) {
//         const pagina = referencias[i];

//         const pos = memoria.indexOf(pagina);
//         if (pos !== -1) {
//             // La página ya existe en memoria: darle la vida extra
//             contador = contador.map((_, idx) => idx === pos ? 1 : 0); // Solo esa página tiene la vida extra
//             continue;
//         }

//         // Fallo de página
//         fallos++;

//         // Buscar marco a reemplazar
//         while (true) {
//             if (contador[puntero] === 0) {
//                 memoria[puntero] = pagina;
//                 contador = contador.map((_, idx) => idx === puntero ? 0 : 0); // Se entra sin vida extra
//                 puntero = (puntero + 1) % marcos;
//                 break;
//             } else {
//                 // Tiene vida extra, se la quitamos
//                 contador[puntero] = 0;
//                 puntero = (puntero + 1) % marcos;
//             }
//         }
//     }

//     console.log("Memoria final:", memoria);
//     console.log("Contadores finales:", contador);
//     console.log("Número total de fallos de página:", fallos);
//     return fallos;
// }

// // Prueba
// FIFOPlus([7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0], 3);

export function FIFOPlus(referencias, marcos) {
    let memoria = new Array(marcos).fill(null); // Inicializa la memoria con marcos vacíos
    let contador = new Array(marcos).fill(0); // Solo puede haber un '1' a la vez
    let puntero = 0; // Índice para el marco FIFO+
    let pasos = []; // Inicializa un array para almacenar los pasos
  
    for (let pagina of referencias) {
      let fallo = false; // Inicializa la variable de fallo como falsa
      let pos = memoria.indexOf(pagina); // Verifica si la página ya está en memoria
  
      if (pos !== -1) { // La página ya existe en memoria
        contador = contador.map((_, idx) => idx === pos ? 1 : 0); // Solo esa página tiene la vida extra
      } else {
        fallo = true; // Marca que hubo un fallo de página al no estar la página en memoria
  
        while (true) { // Busca un marco a reemplazar
          if (contador[puntero] === 0) { // Si el contador es 0, se reemplaza la página
            memoria[puntero] = pagina; // Reemplaza la página en el marco FIFO+
            contador = contador.map((_, idx) => idx === puntero ? 0 : 0); // Se entra sin vida extra, es decir, se reinicia el contador de la página que entra
            puntero = (puntero + 1) % marcos; // Avanza al siguiente marco circularmente
            break;
          } else {
            contador[puntero] = 0; 
            puntero = (puntero + 1) % marcos; // Avanza al siguiente marco circularmente
          }
        }
      }
      
      // Se realiza un push al array pasos, que contiene la página actual, el estado de la memoria y si hubo un fallo o no
      pasos.push({
        pagina,
        memoria: [...memoria],
        fallo
      });
    }
  
    return pasos;
  }
  
  console.log(FIFOPlus([1,2,3,4,1,2,5,1,2,3,4,5], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos