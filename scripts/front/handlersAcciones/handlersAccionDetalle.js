import {displayMessage} from "../mensajes.js";
import * as gl from "../../global/global.js";
import * as Icon from "../../global/icons.js";
import {changeDetEstado, changeDetActions, setAccionesCabecera, checkEstadoCabecera} from "./changeValuesAndActions.js";

export function eventosAccionesDetalle(tr){
    const buttons = tr.querySelectorAll('.verBtn, .rechazarBtn, .retirarBtn, .destruirBtn, .repararBtn, .dineroBtn, .nuevoBtn');
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
        case "verBtn": 
            let html = `<div>Ver el caso ${filaCaso} para el producto número ${filaProducto}<br></div>` +  casoDisplayFormat(caso);
            displayMessage(html, `Boton ${Icon.LUPA}`);
            break;
        case "rechazarBtn":
            changeDetEstado(tr, 1);  // rechazado
            changeDetActions(tr, caso);
            setAccionesCabecera(tr, filaCaso);

            const itemCaso = gl.casos.table[filaCaso].productos[filaProducto];
            const newHistoria = itemCaso.historia[itemCaso.historia.length - 1];
            displayMessage(`Se rechazó el producto ${itemCaso.producto}<br>
                            Codigo de estado modificado (${gl.ENUM_ESTADO_DET[newHistoria.valorViejo].n} => ${gl.ENUM_ESTADO_DET[newHistoria.valorNuevo].n})`, `Boton ${Icon.CRUZ}`);
            break;
        case "retirarBtn":
            changeDetEstado(tr, 3);   // retiro pendiente
            changeDetActions(tr, caso);
            checkEstadoCabecera(tr, filaCaso);   //TODO: Revisar si se puede sacar porque no esta haciendo nada
            setAccionesCabecera(tr, filaCaso);
            break;
        case "destruirBtn":
            changeDetEstado(tr, 2);   // destruccion pendiente
            changeDetActions(tr, caso);
            checkEstadoCabecera(tr, filaCaso);    //TODO: Revisar si se puede sacar porque no esta haciendo nada
            setAccionesCabecera(tr, filaCaso);
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
            displayMessage(`El valor de tipo ${button.className}no corresponde con ninguno de los esperados`);
            break;
    }

}

function casoDisplayFormat(caso){
    let html =   `<div><h3>Cabecera</h3><div class="messageBodyFlex">`;
    html +=  `<div>Caso Nro: ${caso.cabecera.caso}</div> <div>Alta: ${caso.cabecera.fechaAlta}</div> <div>Inicio: ${caso.cabecera.fechaInicio}</div>`;
    html +=  `<div>Datos: ${caso.cabecera.datos}</div> <div>Estado: ${caso.cabecera.estado}</div> <div>Cliente: ${caso.cabecera.cliente}</div>`;
    html += `</div><h3>Productos</h3>`;
    caso.productos.forEach((x) => html += `<div class="messageBodyFlex"><div>Producto: ${x.producto}</div> <div>Color: ${x.color}</div> <div>Factura: ${x.factura}</div> <div>Estado: ${x.estado}</div></div>`);  
    html += `</div><h3>Historia</h3>`;
    caso.cabecera.historia.forEach((x) => html += `<div class="messageBodyFlex"><div>Fecha: ${x.fecha}</div> <div>Campo: ${x.campo}</div> <div>Anterior: ${x.valorViejo}</div> <div>Nuevo: ${x.valorNuevo}</div></div>`);
    html += "</div></div>"
    return html;
}