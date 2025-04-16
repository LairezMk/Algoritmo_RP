//Copia para probar el algoritmo 

// //Algoritmo FIFO para el reemplazo de páginas
// export function FIFO(referencias, marcos){
//     let memoria = new Array(marcos).fill(null); // Inicializa la memoria con marcos vacíos
//     let fallos = 0; // Contador de fallos de página
//     let indice = 0; // Índice para el marco FIFO

//     for (let i = 0; i < referencias.length; i++) {
//         let pagina = referencias[i]; // Página actual a procesar

//         // Verifica si la página ya está en memoria
//         if (!memoria.includes(pagina)) {
//             // Si no está, se produce un fallo de página
//             fallos++;
//             memoria[indice] = pagina; // Reemplaza la página en el marco FIFO
//             indice = (indice + 1) % marcos; // Avanza al siguiente marco circularmente
//         }
//     }

//     console.log(`Número total de fallos de página: ${fallos}`); // Muestra el número total de fallos de página
//     //return fallos; // Devuelve el número total de fallos de página
// }

//  // Ejemplo de uso del algoritmo 
// console.log(FIFO([7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos

export default function FIFO(referencias, marcos) {
    let memoria = new Array(marcos).fill(null); // Inicializa la memoria con marcos vacíos
    let indice = 0; // Índice para el marco FIFO
    let pasos = []; // Inicializa un array para almacenar los pasos
  
    for (let pagina of referencias) {
      let fallo = false; // Inicializa la variable de fallo como falsa
        
      // Verifica si la página ya está en memoria 
      if (!memoria.includes(pagina)) {
        memoria[indice] = pagina; 
        indice = (indice + 1) % marcos; // Avanza al siguiente marco circularmente ej: 0,1,2,0,1,2,...
        fallo = true; // Marca que hubo un fallo de página al no estar la página en memoria
      }

      //Se realiza un push al array pasos, que contiene la página actual, el estado de la memoria y si hubo un fallo o no
      //Se utiliza el operador spread (...) para crear una copia del array memoria y evitar referencias al mismo array
      pasos.push({
        pagina,
        memoria: [...memoria],
        fallo
      });
    }
  
    return pasos; // Devuelve el array pasos que contiene el estado de la memoria en cada paso
  }
  

console.log(FIFO([3,2,1,5,4,1,7,2,1,3,4,0], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos