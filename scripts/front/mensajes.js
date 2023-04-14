import * as gl from "../global/global.js";
import * as Icon from "../global/icons.js";
import { TIPOS } from  "../back/producto.js";

export default class Messages{
    static displayGeneric(HTMLtext, titulo){
        const mensajes = document.querySelector('.mensajes');
        const modalOk = document.getElementById("mensajeOk");
        const tituloMensaje = document.getElementById('tituloMensaje');
        const infoMensaje = document.getElementById('textoMensaje');
        modalOk.addEventListener("click", closeModalMensaje);
        tituloMensaje.innerHTML = titulo ?? "Mensaje";
        infoMensaje.innerHTML = HTMLtext;
        mensajes.showModal(); 

        function closeModalMensaje(event){
            modalOk.removeEventListener('click', closeModalMensaje);
            mensajes.close();
        }
    }

    static displayProducto(caso, itemId){
        const cab = caso.cabecera;
        const det = caso.productos[itemId];

        let html = `<div> ${htmlCabeceraBase(cab)} ${htmlDetalle(det)} ${htmlOTs()} ${htmlHistoria(det, "Producto")} </div> `;
        Messages.displayGeneric(html, `${Icon.LUPA} Detalle Producto`);
    }

    static displayCaso(caso){
        const cab = caso.cabecera;
        const dets = caso.productos;

        let html = `<div> ${htmlCabecera(cab)} ${htmlDetalles(dets)} ${htmlHistoria(cab, "Caso")} </div> `;
        Messages.displayGeneric(html, `${Icon.LUPA} Detalle del Caso`);
    }

}

function htmlCabecera(cab){
    const cliente = gl.clientes.getClienteByCodigo(cab.cliente);
    const dir = cab.direccion;
    let html =  htmlCabeceraBase(cab);
    html +=
    `<div class="messageBodyFlex">
        <div>Cliente: <strong>${cliente.dni} - ${cliente.apellido}, ${cliente.nombre}</strong></div>
        <div>Empresa: <strong>${cliente.empresa  || "Particular"}</strong></div>
    </div>
    <div class="messageBodyFlex">
        <div>Domicilio: <strong>${dir.calle} ${dir.numero} - ${gl.PROVINCIAS[dir.provincia]} (${dir.codPostal}) ${dir.localidad}</strong></div>
        <div>Retiro <strong>${(cab.retiro)?"Si":"No"}</strong></div>
        <div>Opción Retiro/Envio: <strong>${gl.OPCION_RETIRO[cab.opcionRetiro].n}</strong></div>
    </div>`;
    return html;
}

function htmlCabeceraBase(cab){
    const cliente = gl.clientes.getClienteByCodigo(cab.cliente);
    const html =
    `<h3>Caso: ${cab.caso}</h3>
        <div class="messageBodyFlex">   
            <div>Fecha Alta: <strong>${cab.fechaAlta}</strong></div>
            <div>Fecha Inicio: <strong>${cab.fechaInicio}</strong></div>
            <div>Datos: <strong>${gl.ENUM_DATOS[cab.datos]?.n}</strong></div>
            <div>Estado: <strong>${gl.ENUM_ESTADO_CAB[cab.estado]?.n}</strong></div>
            <div>Usuario: <strong>${cliente.mail}</strong></div>
        </div>`;
    return html;
}


//TODO: aca usar EFS
function htmlDetalles(dets){
    let html =  `<h3>Producto</h3>`;
    dets.forEach((x) => {
        html +=
        `<div class="messageBodyFlex">
            <div>Producto: <strong>${TIPOS[x.tipo].nombre}-${x.producto}</strong></div>
            <div>Color: <strong>${x.color}</strong></div> 
            <div>Serie: <strong>${x.serie}</strong></div>
            <div>Estado: <strong>${gl.ENUM_ESTADO_DET[x.estado].n}</strong></div>
            <div>F.Factura: <strong>${x.fechaFactura}</strong></div>
            <div>Falla indicada: <strong>${x.fallaCliente}</strong></div>
        </div>`;
    });
    return html;
}

function htmlDetalle(det){
    const html =
    `<h3>Producto: ${TIPOS[det.tipo].nombre}-${det.producto}</h3>
    <div class="messageBodyFlex">
        <div>Color: <strong>${det.color}</strong></div>
        <div>Serie: <strong>${det.serie}</strong></div> 
        <div>Estado: <strong>${gl.ENUM_ESTADO_DET[det.estado].n}</strong></div>
        <div>Factura: <strong>${det.nroFactura}-${det.fechaFactura}</strong></div>
    </div>
    <div class="messageBodyFlex">
        <div>Falla indicada: <strong>${det.fallaCliente}</strong></div>
        <div>Falla ST: <strong>${det.codigoFallaService || "No relevada"}-${gl.getFallaDescription(det.codigoFallaService)||""}</strong></div>
        <div>Aclaracion: <strong>${det.descripcionFallaService || "No relevada"}</strong></div>
    </div>`;
    return html;
}

function htmlHistoria(origen, descripcionOrigen){
    let html =  `<h3>Historia ${descripcionOrigen}</h3>`;
    origen.historia.forEach((x) => {
        const v = getDescripcion(x, (descripcionOrigen === "Caso"));
        html +=  
        `<div class="messageBodyFlex">
            <div>Fecha: <strong>${x.fecha}</strong></div>
            <div>Campo: <strong>${x.campo}</strong></div> 
            <div>Anterior: <strong>${v.v}</strong></div>
            <div>Nuevo: <strong>${v.n}</strong></div>
        </div>`;
    });
    return html;
}

function htmlOTs(det){
    //if (!det.ordenTrabajoId) return "";
    let html =   `<h4>Orden de trabajo</h3>`;
    html +=  `<div class="messageBodyFlex">`;
    html +=      `<div>Numero: NNNN</div> <div>Fecha Creación: xx/xx/xx</div><div>Estado: Abierta</div>`;
    html +=  `</div>`;
    html +=  `<div><table>`;
    html +=      `<tr><td>Tipo Insumo</td><td>Insumo</td></tr>`
    html +=      `<tr><td>Repuesto</td><td>Valvula especial nro 17</td></tr>`
    html +=  `</table></div>`;
    return html
}

function getDescripcion(hist, esCaso){
    if (hist.campo === "datos"){
        return {v: gl.ENUM_DATOS[hist.valorViejo].n, n: gl.ENUM_DATOS[hist.valorNuevo].n}
    };
    if (hist.campo === "estado" && esCaso){
        return {v: gl.ENUM_ESTADO_CAB[hist.valorViejo].n, n: gl.ENUM_ESTADO_CAB[hist.valorNuevo].n}
    };
    if (hist.campo === "estado" && !esCaso){
        return {v: gl.ENUM_ESTADO_DET[hist.valorViejo].n, n: gl.ENUM_ESTADO_DET[hist.valorNuevo].n}
    };
    if (hist.campo === "retiro"){
        return {v: (hist.valorViejo)?"Si":"No", n: (hist.valorNuevo)?"Si":"No"}
    };
}

