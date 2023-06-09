import {armaAccionesCabecera} from "../botonesAcciones/botonesAccionCabecera.js";
import {armaAccionesDetalle} from "../botonesAcciones/botonesAccionDetalle.js";
import { eventosAccionesCabecera } from "./handlersAccionCabecera.js";
import { eventosAccionesDetalle } from "./handlersAccionDetalle.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js"


// =================================================================================================
// Para la cabecera
// =================================================================================================

function changeCabeceraCampo(tr, campo, nuevoValor, enumObj, color) {
    const [, filaCaso] = tr.id.split("-");
    const cabecera = gl.casos.table[filaCaso].cabecera;
    const elemento = tr.querySelector(`.c-cab-${campo}`);

    const valorAnterior = cabecera[campo];
    cabecera.changeCampos({ [campo]: nuevoValor });
    elemento.classList.replace( gl.statusColorClass(color, valorAnterior),
                                gl.statusColorClass(color, nuevoValor));
    elemento.textContent = enumObj[nuevoValor].n;    

//TODO: Ojo con cambios de cabecera que generan cambios en todos sus items 
//     (ej si paso de retiro a destruccion los items deben cambiar tambien.
//     Por otro lado si ya setee algun articulo en retiro o destruccion no deberia poder cambiar la cabecera)       
}

export function changeCabEstado(tr, nuevoEstado) {
changeCabeceraCampo(tr, "estado", nuevoEstado, gl.ENUM_ESTADO_CAB, "Cabecera");
}

export function changeDatos(tr, nuevoDato) {
changeCabeceraCampo(tr, "datos", nuevoDato, gl.ENUM_DATOS, "Datos");
}

export function  changeRetiro(tr){
const  [,filaCaso]  = tr.id.split("-");
const cabecera = gl.casos.table[filaCaso].cabecera;
const elemento = tr.querySelector(".c-cab-retiro");

const nuevoEstado = !cabecera.retiro;
cabecera.changeCampos({retiro: nuevoEstado});  
elemento.innerHTML = (nuevoEstado) ? Icon.VAN : Icon.TRASH; 
}

export function changeCabActions(tr){
    // TODO:antes de sacar y poner seria bueno validar si no son las misas
    const  [,filaCaso]  = tr.id.split("-");
    const newActions = document.createElement("div");
    newActions.className = "actions";
    newActions.innerHTML = armaAccionesCabecera(filaCaso, gl.casos.table[filaCaso]);
    const divAcciones = tr.querySelector(".actions");
    const tdAcciones = divAcciones.closest("td");
    divAcciones.remove();
    tdAcciones.appendChild(newActions);

    eventosAccionesCabecera(tr);
}  

export function setAccionesDetalle(trCabecera, filaCaso){
    const caso = gl.casos.table[filaCaso]
    const detTrs = trCabecera.nextElementSibling.querySelector("tbody").querySelectorAll("tr");
    detTrs.forEach((x) => changeDetActions(x, caso))  
}

// =================================================================================================
// Para los detalles
// =================================================================================================
export function  changeDetEstado(tr, nuevoEstado){
    const  [,filaCaso,filaProducto]  = tr.id.split("-");
    const itemCaso = gl.casos.table[filaCaso].productos[filaProducto];
    const estadoProducto = tr.querySelector(".c-det-estado");

    estadoProducto.classList.replace(   gl.statusColorClass("Detalle", itemCaso.estado),
                                        gl.statusColorClass("Detalle", nuevoEstado) );
    itemCaso.changeCampos({estado: nuevoEstado});
    estadoProducto.textContent = gl.ENUM_ESTADO_DET[nuevoEstado].n;
}

export function changeDetActions(tr, caso){
    const  [,filaCaso,filaProducto]  = tr.id.split("-");
    const newActions = document.createElement("div");
    newActions.className = "actions";
    newActions.innerHTML = armaAccionesDetalle(filaProducto, caso);

    const divAcciones = tr.querySelector(".actions");
    const tdAcciones = divAcciones.closest("td");
    divAcciones.remove();
    tdAcciones.appendChild(newActions);

    eventosAccionesDetalle(tr, filaCaso);
}    

export function setAccionesCabecera(trDetalle, filaCaso){
    const trCabecera = document.getElementById(`rwc-${filaCaso}`);
    changeCabActions(trCabecera);
}

export function checkEstadoCabecera(trDetalle, filaCaso){
    const caso = gl.casos.table[filaCaso];
    const trCabecera = document.getElementById(`rwc-${filaCaso}`);
    // === Caso Cabecera = Recibido y no quedan productos en revisión
    if (caso.cabecera.estado === 4){   //4= Recibido
        const todosProcesados = !caso.productos.some((x) => x.estado === 4);  // 4=En revision  
        if (todosProcesados){                                                 // ==> de alguna manera va a cambiar el estado de cabecera
            const todosRevisados = caso.productos.every((x) => x.estado === 5);  //5=Revisado
            if (todosRevisados){
                changeCabEstado(trCabecera, 6) // => 6: Revisado
                return true;
            }else{    // ==> estan todos en rechazado o no recibidos 
                changeCabEstado(trCabecera, 8) // => 6: Revisado
                return true;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}

// TODO:  ojo!! cuando la cabecera esta en proces y se van rechazando productos hasta que estan todos rechazados => 
//         Esta Habilitando la tecla avisar, que podria ser avisar que esta todo rechazad, pero ahora dice al Avisar que se van a enviar las cosas... 
//         deberia al avisar en este contexto cambiar En proceso a rechazado