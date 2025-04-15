//Prueba de la librería react-colorful
import {HexColorPicker} from 'react-colorful'; // Selector de color con la librería react-colorful
import React, { useState } from 'react';
const PruebaColor = () => {
    const [color, setColor] = useState("#aabbcc");

    return (
        <div>
            <h3>Selecciona un color:</h3>
            <HexColorPicker color={color} onChange={setColor} />
            <p>Color seleccionado: <span style={{ color }}>{color}</span></p>
        </div>
    );
};

export default PruebaColor;