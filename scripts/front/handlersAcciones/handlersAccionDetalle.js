import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";
import {armaAccionesDetalle} from "../botonesAcciones/botonesAccionDetalle.js";


export function eventosAccionesDetalle(tr){
    const buttons = tr.querySelectorAll('.verBtn, .rechazarBtn, .retirarBtn, .repararBtn, .dineroBtn, .nuevoBtn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            procesaAccionDetalle(button); 
        });
    });
}


function procesaAccionDetalle(button){
    const tr = button.closest("tr"); // desde la posicion del boton, tomo la fila que lo contiene
    const  [,filaCaso,filaProducto]  = tr.id.split("-");
    const cabecera = gl.casos.table[filaCaso].cabecera;
    

    switch (button.className){
        case "verBtn": 
            const campos = mapTrToCampos(tr);
            let html = `<div>Ver el caso ${filaCaso} para el producto número ${filaProducto}<br></div>` +  campos.html;
            displayMessage(html, `Boton ${Icon.LUPA}`);
            break;
        case "rechazarBtn":
            const newEstado = 1;
            changeEstado(tr, newEstado);
            changeActions(tr, newEstado, cabecera);

            const itemCaso = gl.casos.table[filaCaso].productos[filaProducto];
            const newHistoria = itemCaso.historia[itemCaso.historia.length - 1];
            displayMessage(`Se rechazó el producto ${itemCaso.producto}<br>
                            Codigo de estado modificado (${gl.ENUM_ESTADO_DET[newHistoria.valorViejo].n} => ${gl.ENUM_ESTADO_DET[newHistoria.valorNuevo].n})`, `Rechazo`);
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

    estadoProducto.classList.remove(gl.statusColorClass("Detalle", itemCaso.estado));
    itemCaso.changeCampos({estado: nuevoEstado});
    
    estadoProducto.textContent = gl.ENUM_ESTADO_DET[nuevoEstado].n;
    estadoProducto.classList.add(gl.statusColorClass("Detalle", nuevoEstado));
}

function changeActions(tr, newEstado, cabecera){
    const newActions = document.createElement("div");
    newActions.className = "actions";
    newActions.innerHTML = armaAccionesDetalle(newEstado, cabecera);

    const divAcciones = tr.querySelector(".actions");
    const tdAcciones = divAcciones.closest("td");
    divAcciones.remove();
    tdAcciones.appendChild(newActions);

    eventosAccionesDetalle(tr);
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