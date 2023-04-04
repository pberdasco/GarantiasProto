import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";
import {armaAccionesCabecera} from "../botonesAcciones/botonesAccionCabecera.js";

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
            changeActions(tr);
            const fInicio = tr.querySelector(".c-cab-fInicio"); // muestra la fecha de inicio que es cambiada al poner estado 0
            fInicio.textContent = cabecera.fechaInicio;
            break;}
        case "dtsFaltanteBtn": {
            changeDatos(tr, 2);
            changeActions(tr);
            break;}
        case "tglRetiroBtn":{
            changeRetiro(tr);
            changeActions(tr);
            break;}
        default:
            break;
    }
};

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

function changeEstado(tr, nuevoEstado) {
    changeCabeceraCampo(tr, "estado", nuevoEstado, gl.ENUM_ESTADO_CAB, "Cabecera");
}
  
function changeDatos(tr, nuevoDato) {
    changeCabeceraCampo(tr, "datos", nuevoDato, gl.ENUM_DATOS, "Datos");
}
   
function  changeRetiro(tr){
    const  [,filaCaso]  = tr.id.split("-");
    const cabecera = gl.casos.table[filaCaso].cabecera;
    const elemento = tr.querySelector(".c-cab-retiro");

    const nuevoEstado = !cabecera.retiro;
    cabecera.changeCampos({retiro: nuevoEstado});  
    elemento.innerHTML = (nuevoEstado) ? Icon.VAN : Icon.TRASH; 
}

function changeActions(tr){
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

