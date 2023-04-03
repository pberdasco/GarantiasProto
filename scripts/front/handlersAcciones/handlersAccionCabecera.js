import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";

export function eventosAccionesCabecera(tr){
    const buttons = tr.querySelectorAll('.verBtn, .dtsOkBtn, .dtsFaltanteBtn, .tglRetiroBtn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            procesaAccionCabecera(button); 
        });
    });
};

function procesaAccionCabecera(button){
    const tr = button.closest("tr"); // desde la posicion del boton, tomo la fila que lo contiene
    const  [,filaCaso]  = tr.id.split("-");
    const cabecera = gl.casos.table[filaCaso].cabecera;

    switch (button.className){
        case "verBtn": 
            displayMessage(`<div>Ver el caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.LUPA}`);
            break;
        case "dtsOkBtn":
            displayMessage(`<div>Cambiar a Datos OK el caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.DATA_OK}`);
            break;
        case "dtsFaltanteBtn":
            displayMessage(`<div>Cambiar a Datos Faltantes el caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.DATA_FALTA}`);
            break;
        case "tglRetiroBtn":
            displayMessage(`<div>Toogle entre retirar y destruir en el caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.VAN}/${Icon.TRASH}`);
            break;
        default:
            break;
    }
};

