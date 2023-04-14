import * as Icon from "../../global/icons.js"

export function armaAccionesDetalle(indexProducto, caso){

    const estado = caso.productos[indexProducto].estado;

    // si estadoCabecera = En proceso => se pueden pasar los productos a:
    //     Rechazado
    //     Si Retiro => (solicitar retiro) Retiro pendiente
    //     Si Destruc => (solicitar destruccion) Destruccion pendiente
    // si estado cabecera = recibido =>
    //     si estado = revision   =>
    //            (devolucion $) para devolver $
    //            (cambio)
    //            (reparar)
    // si estado cabecera = destruido =>
    //            (devolucion $)
    //            (cambio)
    //            (accesorio)
    //


    if (caso.cabecera.estado === 1){  // en proceso
        if ((estado === 0) && caso.cabecera.retiro)
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                    <button type="button" class="rechazarBtn">${Icon.CRUZ}</button>
                    <button type="button" class="retirarBtn">${Icon.CAMION}</button>`;
        if ((estado === 1) && caso.cabecera.retiro)
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                    <button type="button" class="retirarBtn">${Icon.CAMION}</button>`;    
        if ((estado === 0) && !caso.cabecera.retiro)
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                    <button type="button" class="rechazarBtn">${Icon.CRUZ}</button>
                    <button type="button" class="destruirBtn">${Icon.TRASH}</button>`;        
        if ((estado === 1) && !caso.cabecera.retiro)
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                    <button type="button" class="destruirBtn">${Icon.TRASH}</button>`;        
    }
    if (caso.cabecera.estado === 4 && estado === 4){   //cab:recibido y det:en revisión
        return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                <button type="button" class="revisionBtn">${Icon.REVISADO_OK}</button>
                <button type="button" class="revisionYRechazoBtn">${Icon.CRUZ}</button>
                <button type="button" class="noRecibidoBtn">${Icon.NO_RECIBIDO}</button>`;
    }
    if (caso.cabecera.estado === 4 && estado === 5){   //cab:recibido y det:revisado
        return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                <button type="button" class="dineroBtn">${Icon.DINERO}</button>
                <button type="button" class="nuevoBtn">${Icon.CAMBIO}</button>
                <button type="button" class="repararBtn">${Icon.HERRAMIENTAS}</button>`;
    }
    if (caso.cabecera.estado === 7){   //det: destruido
        return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                <button type="button" class="dineroBtn">${Icon.DINERO}</button>
                <button type="button" class="nuevoBtn">${Icon.CAMBIO}</button>
                <button type="button" class="accesorioBtn">${Icon.MAS}</button>`;

    }
    // cualquier otra condicion solo VER
    return `<button type="button" class="verBtn">${Icon.LUPA}</button>`;

};    