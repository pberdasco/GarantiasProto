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
    if (caso.cabecera.estado === 4 && estado === 4){   //recibido y en revision
        return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                <button type="button" class="dineroBtn">${Icon.DINERO}</button>
                <button type="button" class="nuevoBtn">${Icon.CAMBIO}</button>
                <button type="button" class="repararBtn">${Icon.HERRAMIENTAS}</button>`;
    }
    if (caso.cabecera.estado === 5){   //destruido
        return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                <button type="button" class="dineroBtn">${Icon.DINERO}</button>
                <button type="button" class="nuevoBtn">${Icon.CAMBIO}</button>
                <button type="button" class="accesorioBtn">${Icon.MAS}</button>`;

    }
    // cualquier otra condicion solo VER
    return `<button type="button" class="verBtn">${Icon.LUPA}</button>`;

};    