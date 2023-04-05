import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";
import {changeCabEstado, changeDatos, changeRetiro, changeCabActions, setAccionesDetalle, changeDetEstado} from "./changeValuesAndActions.js";

export function eventosAccionesCabecera(tr){
    const buttons = tr.querySelectorAll('.verCabBtn, .dtsOkBtn, .dtsFaltanteBtn, .tglRetiroBtn, .startBtn, .avisoSolicDestrBtn, .avisoRetiroBtn, .recibidoBtn, .destruidoBtn');
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
        case "verCabBtn": 
            displayMessage(`<div>Ver el caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.LUPA}`);
            break;
        case "dtsOkBtn": {
            changeDatos(tr, 0);
            changeCabActions(tr);
            setAccionesDetalle(tr, filaCaso); // si al cambiar un estado en la cabecera, tambien cambio acciones en sus detalles
            const fInicio = tr.querySelector(".c-cab-fInicio"); // muestra la fecha de inicio que es cambiada al poner estado 0
            fInicio.textContent = cabecera.fechaInicio;
            break;
        }
        case "dtsFaltanteBtn": {
            changeDatos(tr, 2);
            changeCabActions(tr);
            setAccionesDetalle(tr, filaCaso); // si al cambiar un estado en la cabecera, tambien cambio acciones en sus detalles
            break;
        }
        case "tglRetiroBtn":{
            changeRetiro(tr);
            changeCabActions(tr);
            setAccionesDetalle(tr, filaCaso); // si al cambiar un estado en la cabecera, tambien cambio acciones en sus detalles
            break;
        }
        case "startBtn":{
            estandarChange(1, tr, filaCaso);
            break;
        }
        case "avisoSolicDestrBtn":{
            estandarChange(3, tr, filaCaso);
            displayMessage(`<div>Mandarle al cliente un aviso indicando que debe destruir los productos del caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.AVISO}`);
            break;
        }
        case "avisoRetiroBtn":{
            estandarChange(2, tr, filaCaso);
            displayMessage(`<div>Generar etiqueta OCA.<br>Generar Solicitud de Retiro.<br>Mandarle al cliente un aviso indicando que estamos mandando a retirar productos del caso (${filaCaso}) - ${cabecera.caso}<br></div>`, `Boton ${Icon.AVISO}`);
            break;
        }
        case "destruidoBtn":{
            estandarChange(5, tr, filaCaso);
            changeEstadoDetalles(5, tr, filaCaso);
            setAccionesDetalle(tr, filaCaso);
            break;
        }
        case "recibidoBtn":{
            estandarChange(4, tr, filaCaso);
            changeEstadoDetalles(4, tr, filaCaso);
            setAccionesDetalle(tr, filaCaso);
            break;
        }
        
        default:
            break;
    }

    function changeEstadoDetalles(estado, trCabecera, filaCaso){
    //debugger;
        const caso = gl.casos.table[filaCaso]
        const detTrs = trCabecera.nextElementSibling.querySelector("tbody").querySelectorAll("tr");
        for (let i = 0; i < caso.productos.length; i++){
            if (caso.productos[i].estado != 1)        // si estaba rechazado, queda rechazado
                changeDetEstado(detTrs[i], estado);
        }
    }

    function estandarChange(estado, tr, filaCaso){
        changeCabEstado(tr, estado);    
        changeCabActions(tr);
        setAccionesDetalle(tr, filaCaso);
    }
};


