export default function LRU(referencias, marcos) {
    let memoria = new Array(marcos).fill(null); // Inicializa la memoria con marcos vacíos
    let indices = new Array(marcos).fill(-1); // Inicializa los índices de las páginas en memoria con -1, indicando que están vacíos
    let pasos = []; // Inicializa un array para almacenar los pasos
  
    for (let i = 0; i < referencias.length; i++) {
      let pagina = referencias[i]; // Página actual a procesar
      let fallo = false; // Inicializa la variable de fallo como falsa
  
      if (!memoria.includes(pagina)) { // Verifica si la página ya está en memoria
        let indiceMenorUso = indices.indexOf(Math.min(...indices)); // Encuentra el índice del marco menos usado
        memoria[indiceMenorUso] = pagina; // Reemplaza la página en el marco LRU
        indices[indiceMenorUso] = i; // Actualiza el índice de uso para la nueva página
        fallo = true; // Marca que hubo un fallo de página al no estar la página en memoria
      } else {
        indices[memoria.indexOf(pagina)] = i; // Si está, actualiza el índice de uso de la página
      }
      
        // Se realiza un push al array pasos, que contiene la página actual, el estado de la memoria y si hubo un fallo o no
      pasos.push({
        pagina,
        memoria: [...memoria],
        fallo
      });
    }
  
    return pasos; // Devuelve el array pasos que contiene el estado de la memoria en cada paso
  }
  

  
console.log(LRU([3,2,1,5,4,1,7,2,1,3,4,0], 3)); 