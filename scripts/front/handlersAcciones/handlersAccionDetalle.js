import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";


export function eventosAccionesDetalle(){
    const buttons = document.querySelectorAll('.verBtn, .rechazarBtn, .retirarBtn, .repararBtn, .dineroBtn, .nuevoBtn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            procesaAccionDetalle(button); 
        });
    });
}

function procesaAccionDetalle(b){
    const tr = b.closest("tr"); // desde la posicion del boton, tomo la fila que lo contiene
    const  [,filaCaso,filaProducto]  = tr.id.split("-");
    // const itemCaso = gl.casos.table[filaCaso].productos[filaProducto];
    const campos = mapTrToCampos(tr);
    //const estadoProducto = tr.querySelector(".c-det-estado");

    switch (b.className){
        case "verBtn": 
            let html = `<div>Ver el caso ${filaCaso} para el producto número ${filaProducto}<br></div>` +  campos.html;
            displayMessage(html, `Boton ${Icon.LUPA}`);
            break;
        case "rechazarBtn":
            changeEstado(tr, 1);
            const newActions="";
            changeActions(newActions);
            // TODO: Cambiar los botones (borrando directamente el TD y agregando uno nuevo. Esto se lleva los liteners? o alcanza con  borrar el boton en cuestion)
            // TODO: setear los eventListeners
            break;
        case "retirarBtn":
            displayMessage(`Estaremos enviando a OCA para retirar el producto ${filaProducto}  del caso ${filaCaso}`, `Boton ${Icon.CAMION}`);
            break;
        case "repararBtn":
            displayMessage(`El producto ${filaProducto} del caso ${filaCaso} será reparado`, `Boton ${Icon.HERRAMIENTAS}`);
            break;
        case  "dineroBtn":
            displayMessage(`Se va a solicitar la devolución del dinero por el producto ${filaProducto} del caso ${filaCaso}`, `Boton ${Icon.DINERO}`);
            break;
        case "nuevoBtn":
            displayMessage(`Se le enviará un producto NUEVO para reemplazar el producto ${filaProducto} del caso ${filaCaso}`, `Boton ${Icon.MAS}`);
            break;
        default:
            displayMessage(`El valor de tipo ${tipo}no corresponde con ninguno de los esperados`);
            break;
    }

}

function  changeEstado(tr, nuevoEstado){
    const  [,filaCaso,filaProducto]  = tr.id.split("-");
    const itemCaso = gl.casos.table[filaCaso].productos[filaProducto];
    const estadoProducto = tr.querySelector(".c-det-estado");
    itemCaso.changeCampos({estado: nuevoEstado});
    const newHistoria = itemCaso.historia[itemCaso.historia.length - 1];
    estadoProducto.textContent = gl.ENUM_ESTADO_DET[nuevoEstado].n;
    estadoProducto.classList.remove(gl.statusColorClass("Detalle", newHistoria.valorViejo));
    estadoProducto.classList.add(gl.statusColorClass("Detalle", nuevoEstado));
    displayMessage(`Se rechazó el producto ${itemCaso.producto}<br>
    Codigo de estado modificado (${gl.ENUM_ESTADO_DET[newHistoria.valorViejo].n} => ${gl.ENUM_ESTADO_DET[newHistoria.valorNuevo].n})`, `CambioEstado`);
}

function changeActions(newActions){
    return "";
}

function mapTrToCampos(tr){
    const campos = [];
    tr.querySelectorAll("td").forEach(td => {campos.push(td.textContent)});
    
    return {
        producto: campos[0],
        color: campos[1],
        factura: campos[2],
        serie: campos[3],
        estado: campos[4],
        html: `<div>Producto ${campos[0]}</div>
               <div>Color ${campos[1]}</div>
               <div>N Facura ${campos[2]}</div>
               <div>N Serie ${campos[3]}}</div>
               <div>Estado ${campos[4]}</div>`
    }
}