

// export function FIFOPlus(referencias, marcos) {
//     let memoria = new Array(marcos).fill(null); // Inicializa la memoria con marcos vacíos
//     let contador = new Array(marcos).fill(0); // Solo puede haber un '1' a la vez
//     let puntero = 0; // Índice para el marco FIFO+
//     let pasos = []; // Inicializa un array para almacenar los pasos
  
//     for (let pagina of referencias) {
//       let fallo = false; // Inicializa la variable de fallo como falsa
//       let pos = memoria.indexOf(pagina); // Verifica si la página ya está en memoria
  
//       if (pos !== -1) { // La página ya existe en memoria
//         contador = contador.map((_, idx) => idx === pos ? 1 : 0); // Solo esa página tiene la vida extra
//       } else {
//         fallo = true; // Marca que hubo un fallo de página al no estar la página en memoria
  
//         while (true) { // Busca un marco a reemplazar
//           if (contador[puntero] === 0) { // Si el contador es 0, se reemplaza la página
//             memoria[puntero] = pagina; // Reemplaza la página en el marco FIFO+
//             contador = contador.map((_, idx) => idx === puntero ? 0 : 0); // Se entra sin vida extra, es decir, se reinicia el contador de la página que entra
//             puntero = (puntero + 1) % marcos; // Avanza al siguiente marco circularmente
//             break;
//           } else {
//             contador[puntero] = 0; 
//             puntero = (puntero + 1) % marcos; // Avanza al siguiente marco circularmente
//           }
//         }
//       }
      
//       // Se realiza un push al array pasos, que contiene la página actual, el estado de la memoria y si hubo un fallo o no
//       pasos.push({
//         pagina,
//         memoria: [...memoria],
//         fallo
//       });
//     }
  
//     return pasos;
//   }
  



// export function FIFOPlus(referencias, marcos) {
//   let memoria = new Array(marcos).fill(null); // Inicializa la memoria con marcos vacíos
//   let contador = new Array(marcos).fill(0); // Contadores para las páginas
//   let ordenLlegada = new Array(marcos).fill(-1); // Para trackear antigüedad
//   let pasos = []; // Almacena los pasos del algoritmo
//   let tiempo = 0; // Tiempo para rastrear antigüedad

//   for (let pagina of referencias) {
//     tiempo++;
//     let fallo = false;
//     let pos = memoria.indexOf(pagina); // Verifica si la página ya está en memoria

//     if (pos !== -1) {
//       // Página ya en memoria → darle vida
//       contador[pos] = 1; // Marca la página como "viva"
//     } else {
//       // Fallo de página
//       fallo = true;

//       // Buscar páginas sin vida (contador = 0)
//       let candidatos = [];
//       for (let i = 0; i < marcos; i++) {
//         if (contador[i] === 0) {
//           candidatos.push({ index: i, tiempo: ordenLlegada[i] });
//         }
//       }

//       if (candidatos.length > 0) {
//         // Reemplazar el más antiguo sin vida
//         candidatos.sort((a, b) => a.tiempo - b.tiempo); // Ordenar por antigüedad
//         const idx = candidatos[0].index;
//         memoria[idx] = pagina;
//         contador[idx] = 1; // Nueva página entra con vida
//         ordenLlegada[idx] = tiempo; // Actualiza el tiempo de llegada
//       } else {
//         // Si todas las páginas tienen vida, quitar vidas y reemplazar la más antigua
//         for (let i = 0; i < marcos; i++) {
//           contador[i] = 0; // Quitar vida a todas las páginas
//         }

//         // Buscar la página más antigua
//         let masAntiguo = 0;
//         for (let i = 1; i < marcos; i++) {
//           if (ordenLlegada[i] < ordenLlegada[masAntiguo]) {
//             masAntiguo = i;
//           }
//         }

//         memoria[masAntiguo] = pagina;
//         contador[masAntiguo] = 1; // Nueva página entra con vida
//         ordenLlegada[masAntiguo] = tiempo; // Actualiza el tiempo de llegada
//       }
//     }

//     // Registrar el estado actual de la memoria
//     pasos.push({
//       pagina,
//       memoria: [...memoria], // Copia el estado actual de la memoria
//       fallo, // Indica si hubo un fallo o no
//     });
//   }

//   return pasos; // Devuelve los pasos calculados
// }


// //console.log(FIFOPlus([7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos
// //console.log(FIFOPlus([3, 2, 1, 5, 4, 1, 7, 2, 1, 3, 4, 0], 3));
// console.log(FIFOPlus([1,2,3,4,1,2,5,1,2,3,4,5], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos


// export function FIFOPlus(referencias, marcos) {
//   let memoria = new Array(marcos).fill(null);
//   let contador = new Array(marcos).fill(0); // 1 = vida, 0 = sin vida
//   let ordenLlegada = new Array(marcos).fill(-1);
//   let tiempo = 0;
//   let pasos = [];

//   for (let pagina of referencias) {
//     tiempo++;
//     let fallo = false;
//     let pos = memoria.indexOf(pagina);

//     //console.log(pos);

//     if (pos !== -1) {
//       // Página ya en memoria → darle vida y quitar a las demás
//       for (let i = 0; i < marcos; i++) contador[i] = 0;
//       contador[pos] = 1;
//     } else {
//       fallo = true;

//       // Intentar encontrar páginas sin vida para reemplazar
//       let indicesSinVida = [];
//       for (let i = 0; i < marcos; i++) {
//         if (memoria[i] === null) {
//           // Espacio libre → usar directamente
//           memoria[i] = pagina;
//           ordenLlegada[i] = tiempo;
//           for (let j = 0; j < marcos; j++) contador[j] = 0;
//           contador[i] = 1;
//           indicesSinVida = []; // Evita seguir procesando
//           break;
//         } else if (contador[i] === 0) {
//           indicesSinVida.push(i);
//         }
//       }

//       if (indicesSinVida.length > 0) { //si hay páginas sin vida para reemplazar
//         // Reemplazar la más antigua sin vida
//         // Hay páginas sin vida → reemplazar la más antigua
//         let masAntiguo = indicesSinVida[0];
//         for (let i of indicesSinVida) {
//           if (ordenLlegada[i] < ordenLlegada[masAntiguo]) {
//             masAntiguo = i;
//           }
//         }
//         memoria[masAntiguo] = pagina;
//         ordenLlegada[masAntiguo] = tiempo;
//         for (let j = 0; j < marcos; j++) contador[j] = 0;
//         contador[masAntiguo] = 1;
//       } else {
//         // Todas tienen vida → quitar vidas y repetir reemplazo
//         contador.fill(0);

//         // Ahora buscar la más antigua de todas
//         let masAntiguo = 0;
//         for (let i = 1; i < marcos; i++) {
//           if (ordenLlegada[i] < ordenLlegada[masAntiguo]) {
//             masAntiguo = i;
//           }
//         }

//         memoria[masAntiguo] = pagina;
//         ordenLlegada[masAntiguo] = tiempo;
//         contador[masAntiguo] = 1;
//       }
//       console.log(contador)
//     }



//     pasos.push({
//       pagina,
//       memoria: [...memoria], // Copia el estado actual de la memoria, pero el algoritmo sigue trabajando con la copia original
//       fallo
//     });
//   }

//   return pasos;
// }


export default function FIFOPlus (sequence, numPages) {
  //let sequenceArray = sequence.split(',').map(Number);
  let sequenceArray = sequence;
  let pageFaults = 0;
  let framesArray = new Array(numPages).fill("-");
  let framesArrayTime = new Array(numPages).fill(0);
  let secondChance = new Array(numPages).fill(false);
  let resultMatrix = [];

  for (let i = 0; i < sequenceArray.length; i++) { 
      let page = sequenceArray[i];
      if (!framesArray.includes(page)) { 
          pageFaults++;
          if (framesArray.includes("-")){
              for (let j = 0; j < framesArray.length; j++){
                  if (framesArray[j] == "-"){
                      framesArray[j] = page;
                      framesArrayTime[j] = 0;
                      break;
                  }
              }
          } else {
              let exit
              let indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime));
              for (let j = 0; j < framesArray.length; j++){ 
                  if (secondChance[indexTime] == false){
                      framesArray[indexTime] = page;
                      framesArrayTime[indexTime] = 0;
                      secondChance[indexTime] = false;
                      exit = true;
                      break;
                  } else {
                      secondChance[indexTime] = false;
                      let framesArrayTimeCopy = [...framesArrayTime]
                      indexTime = framesArrayTime.indexOf(framesArrayTimeCopy.sort((a, b) => a - b)[1]);
                      framesArray[indexTime] = page;
                      framesArrayTime[indexTime] = 0;
                      secondChance[indexTime] = false;
                      exit = true;
                  }
              }
              if (exit == undefined){
                  let indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime));
                  framesArray[indexTime] = page;
                  framesArrayTime[indexTime] = 0;
              }
          }
      } else {
          let indexTime = framesArray.indexOf(page);
          secondChance.fill(false);
          secondChance[indexTime] = true;
      }
      for (let j = 0; j < framesArrayTime.length; j++){
          if (framesArray[j] != "-"){
              framesArrayTime[j]++;
          }
      }
      //console.log("Frames: ", framesArray, "Time: ", framesArrayTime, "Second: ", secondChance)
      resultMatrix.push([...framesArray]);
  }
  return {
      pageFaults,
      resultMatrix
  };
}

console.log(FIFOPlus([7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos
console.log(FIFOPlus([3,2,1,5,4,1,7,2,1,3,4,0], 3));
console.log(FIFOPlus([1,2,3,4,1,2,5,1,2,3,4,5], 3));