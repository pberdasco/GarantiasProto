import {OrdenTrabajo, InsumosOT, CLASE_INSUMO} from "./ordenTrabajo.js";
import * as gl from "../global/global.js";

export class OrdenesTrabajo{
    table = []

    getByCasoProducto(caso, filaProducto){
        const ot = this.table.find((x) => caso.cabecera.caso === x.casoID && filaProducto === x.productoID);
        return ot;
    }

    insertOT(ot){
        this.table.push(ot);
        this.table[this.table.length - 1].id = this.table.length - 1;
    }

    insertFields(casoID, productoID, fechaAlta, tecnico, insumos){
        this.table.push(new OrdenTrabajo(casoID, productoID, fechaAlta, tecnico, insumos));
        table[this.table.length - 1].id = this.table.length - 1;  
    }

    updateOT(ot){
        let otToUpdate = this.table[ot.id];
        otToUpdate = ot; // este proceso en la base deberia modificar los campos de la cabecera
                          // y luego ver por cada fila de insumo, si existe modificarla, si no existe agrearla y si esta en la base y en ot no, eliminarla
    }

}