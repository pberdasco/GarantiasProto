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
    const  [,filaCaso]  = tr.id.split("-");
    const newActions = document.createElement("div");
    newActions.className = "actions";
    newActions.innerHTML = armaAccionesCabecera(filaCaso, gl.casos.table[filaCaso]);
    const divAcciones = tr.querySelector(".actions");
    const tdAcciones = divAcciones.closest("td");
    divAcciones.remove();
    tdAcciones.appendChild(newActions);

    eventosAccionesCabecera(tr);

    //Al cambiar los estados de la cabecera puede ser necesario cambiar las acciones admitidas por los detalles
    // setAccionesDetalle(tr, filaCaso);
}  

export function setAccionesDetalle(trCabecera, filaCaso){
    //console.log("Habra que procesar los items del caso: ");
    gl.casos.table[filaCaso].productos.forEach((x) => console.log(x.tipo, x.producto, x.estado));
    //console.log("que estan en las siguientes tr");
    const detTrs = trCabecera.nextElementSibling.querySelector("tbody").querySelectorAll("tr");


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

    //Al cambiar los estados del detalle puede ser necesario cambiar las acciones admitidas por la cabecera
    // setAccionesCabecera(tr, filaCaso);
}    

export function setAccionesCabecera(trDetalle, filaCaso){
    //TODO:
    const trCabecera = document.getElementById(`rwc-${filaCaso}`);
    changeCabActions(trCabecera);
}