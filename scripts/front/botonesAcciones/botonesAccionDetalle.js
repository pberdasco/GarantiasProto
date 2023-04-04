import * as Icon from "../../global/icons.js"

export function armaAccionesDetalle(indexProducto, caso){

    const estado = caso.productos[indexProducto].estado;


    if (caso.cabecera.datos != 0) return `<button type="button" class="verBtn">${Icon.LUPA}</button>`; // hasta que no estan los datos OK no se puede hacer nada con los productos
    switch (estado){      
        case 0:   // No procesado
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                    <button type="button" class="rechazarBtn">${Icon.CRUZ}</button>
                    <button type="button" class="retirarBtn">${Icon.CAMION}</button>`;
        case 1:   // Rechazado
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>`;
        case 2:   // Espera destruccion
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>`;
        case 4:   // Retirar
        case 6:   // Para devolucion
        case 7:   // Para devolucion $
        case 8:   // Para reparacion
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>`;
        case 3:   // Destruido
        case 5:   // Recibido
        case 9:   // Para revision  (esto existe? debe ser el 0 creo)
            return `<button type="button" class="verBtn">${Icon.LUPA}</button>
                    <button type="button" class="rechazarBtn">${Icon.CRUZ}</button>
                    <button type="button" class="repararBtn">${Icon.HERRAMIENTAS}</button>
                    <button type="button" class="dineroBtn">${Icon.DINERO}</button>
                    <button type="button" class="nuevoBtn">${Icon.MAS}</button>`;        
    }
};    