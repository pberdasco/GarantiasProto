import Messages from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";
import getFalla from "../modalesInput/falla.js";
import getOT from "../modalesInput/ordenTrabajo.js";
import {changeDetEstado, changeDetActions, setAccionesCabecera, checkEstadoCabecera} from "./changeValuesAndActions.js";

export function eventosAccionesDetalle(tr){
    const buttons = tr.querySelectorAll('.verBtn, .rechazarBtn, .retirarBtn, .destruirBtn, .revisionBtn, .revisionYRechazoBtn, .noRecibidoBtn, .repararBtn, .dineroBtn, .nuevoBtn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            procesaAccionDetalle(button); 
        });
    });
}

function procesaAccionDetalle(button){
    const tr = button.closest("tr"); // desde la posicion del boton, tomo la fila que lo contiene
    const  [,filaCaso,filaProducto]  = tr.id.split("-");
    const caso = gl.casos.table[filaCaso];
    

    switch (button.className){
        case "verBtn": {
            Messages.displayProducto(caso, filaProducto);
            break;}
        case "rechazarBtn": {
            changeDetEstado(tr, 1);  // rechazado
            changeDetActions(tr, caso);
            setAccionesCabecera(tr, filaCaso);

            const itemCaso = gl.casos.table[filaCaso].productos[filaProducto];
            const newHistoria = itemCaso.historia[itemCaso.historia.length - 1];
            Messages.displayGeneric(`Se rechazó el producto ${itemCaso.producto}<br>
                            Codigo de estado modificado (${gl.ENUM_ESTADO_DET[newHistoria.valorViejo].n} => ${gl.ENUM_ESTADO_DET[newHistoria.valorNuevo].n})`, `Boton ${Icon.CRUZ}`);
            break;}
        case "retirarBtn": {
            changeDetEstado(tr, 3);   // retiro pendiente
            changeDetActions(tr, caso);
            //checkEstadoCabecera(tr, filaCaso);   //TODO: Revisar si se puede sacar porque no esta haciendo nada
            setAccionesCabecera(tr, filaCaso);
            break;}
        case "destruirBtn": {
            changeDetEstado(tr, 2);   // destruccion pendiente
            changeDetActions(tr, caso);
            //checkEstadoCabecera(tr, filaCaso);    //TODO: Revisar si se puede sacar porque no esta haciendo nada
            setAccionesCabecera(tr, filaCaso);
            break;}
        case "revisionBtn":{
            getFalla(caso, filaProducto);
            //TODO: se podria agregar un "si no salio cancelado de la carga de falla"
            changeDetEstado(tr, 5);   // revisado
            changeDetActions(tr, caso);
            const changed = checkEstadoCabecera(tr, filaCaso); // si estan toddos revisados o noRecibidos => cambia el estado de la cabecera
            if (changed) setAccionesCabecera(tr, filaCaso);
            break;}
        case "revisionYRechazoBtn":{
            getFalla(caso, filaProducto);  // Aqui en falla hay que poner que no era una falla atribuible a garantia (motivo rechazo)
            changeDetEstado(tr, 6);   // revisado
            changeDetActions(tr, caso);
            const changed = checkEstadoCabecera(tr, filaCaso); // si estan toddos revisados o noRecibidos => cambia el estado de la cabecera
            if (changed) setAccionesCabecera(tr, filaCaso);
            break;} 
        case "noRecibidoBtn":{
            changeDetEstado(tr, 6);   // revisado
            changeDetActions(tr, caso);
            const changed = checkEstadoCabecera(tr, filaCaso); // si estan toddos revisados o noRecibidos => cambia el estado de la cabecera
            if (changed) setAccionesCabecera(tr, filaCaso);
            break;}
        case "repararBtn":{
            getOT(caso, filaProducto);
            //Messages.displayGeneric(`El producto ${filaProducto} del caso ${filaCaso} será reparado`, `Boton ${Icon.HERRAMIENTAS}`);
            break;}
        case  "dineroBtn":{
            Messages.displayGeneric(`Se va a solicitar la devolución del dinero por el producto ${filaProducto} del caso ${filaCaso}`, `Boton ${Icon.DINERO}`);
            break;}
        case "nuevoBtn":{
            Messages.displayGeneric(`Se le enviará un producto NUEVO para reemplazar el producto ${filaProducto} del caso ${filaCaso}`, `Boton ${Icon.MAS}`);
            break;}
        default:{
            Messages.displayGeneric(`El valor de tipo ${button.className}no corresponde con ninguno de los esperados`);
            break;}
    }

}
