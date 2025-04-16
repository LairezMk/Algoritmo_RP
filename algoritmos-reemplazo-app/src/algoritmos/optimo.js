

function Optimo(referencias, marcos){
    let memoria= new Array(marcos).fill(null); //Inicializa la memoria con marcos vacíos
    let pasos = []; // Inicializa un array para almacenar los pasos

    for (let i = 0; i < referencias.length; i++) {
        let pagina = referencias[i]; // Página actual a procesar
        let fallo = false; // Inicializa la variable de fallo como falsa

        // Verifica si la página ya está en memoria
        if (!memoria.includes(pagina)) {
            // Si no está, se produce un fallo de página
            //fallos++;
            let pos = memoria.indexOf(null); // Busca un marco vacío
            if (pos !== -1) {
                memoria[pos] = pagina; // Reemplaza la página en el marco vacío
            } else {
                // Si no hay marcos vacíos, se debe reemplazar la página más lejana en el futuro, es decir, la página que no se usará por más tiempo, si no aparece alguna de las páginas en memoria en el futuro, quiere decir que ni siquiera se va a usar en la cadena de páginas, por ende se reemplaza inmediatamente 
                
                let indicesFuturos = memoria.map(m => {
                    let idx = referencias.slice(i + 1).indexOf(m); // Encuentra el índice de la página en la cadena futura
                    return idx === -1 ? Infinity : idx; // Si no se encuentra, devuelve Infinity, es decir, que no se usará más como el 7 en el ejemplo
                });
                     // Encuentra los índices futuros de las páginas en memoria

                let maxIndex = Math.max(...indicesFuturos); // Encuentra el índice máximo
                let paginaReemplazar = memoria[indicesFuturos.indexOf(maxIndex)]; // Encuentra la página a reemplazar
                memoria[memoria.indexOf(paginaReemplazar)] = pagina; // Reemplaza la página en el marco

            }
            fallo = true; // Marca que hubo un fallo
        }

        pasos.push({
            pagina,
            memoria: [...memoria], // Copia el estado actual de la memoria
            fallo // Indica si hubo un fallo o no
        });
    }

    return pasos;

}

console.log(Optimo([3,2,1,5,4,1,7,2,1,3,4,0], 3));

export default Optimo;

