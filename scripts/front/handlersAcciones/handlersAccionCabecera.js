import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";
import {changeCabEstado, changeDatos, changeRetiro, changeCabActions, setAccionesDetalle} from "./changeValuesAndActions.js";

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
        case "dtsOkBtn": {
            changeDatos(tr, 0);
            changeCabActions(tr);
            setAccionesDetalle(tr, filaCaso); // si al cambiar un estado en la cabecera, tambien cambio acciones en sus detalles
            const fInicio = tr.querySelector(".c-cab-fInicio"); // muestra la fecha de inicio que es cambiada al poner estado 0
            fInicio.textContent = cabecera.fechaInicio;
            //TODO: al pasar a OK voy a tener efectos sobre las acciones posibles de los detalles
            //      implementar el modelo para gestionar esto asi como cambios en los detalles que modifiquen la cabecera

            break;}
        case "dtsFaltanteBtn": {
            changeDatos(tr, 2);
            changeCabActions(tr);
            setAccionesDetalle(tr, filaCaso); // si al cambiar un estado en la cabecera, tambien cambio acciones en sus detalles
            break;}
        case "tglRetiroBtn":{
            changeRetiro(tr);
            changeCabActions(tr);
            setAccionesDetalle(tr, filaCaso); // si al cambiar un estado en la cabecera, tambien cambio acciones en sus detalles
            break;}
        default:
            break;
    }
};


