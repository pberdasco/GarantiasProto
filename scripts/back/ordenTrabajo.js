import { todayFormated } from "../global/dateAndPadd.js";

export class OrdenTrabajo{
    id;
    casoID;
    productoID;
    fechaAlta;
    fechaCierre;
    tecnico;
    estado;  //1:abierta  2:cerrada
    insumos = [];
    historia = [];

    constructor(casoID, productoID, fechaAlta, tecnico, insumos){
        this.casoID = casoID;
        this.productoID = productoID;
        if (fechaAlta) 
            this.fechaAlta = fechaAlta;
        else
            this.fechaAlta = todayFormated();
        this.tecnico = tecnico;
        this.estado = 1; //1= abierta
        if (Array.isArray(insumos))
            this.insumos = insumos;
    }

    addInsumo(clase, rep_acc_moID, observaciones){
        this.insumos.push(new InsumosOT(clase, rep_acc_moID, observaciones));
    }

    // agregar al menos un campo tabulado (ej. categoria), un campo texto y un campo numerico.
    // addHistoria, ver si hace falta.
}

export const CLASE_INSUMO = [{i: 0, nombre: "Repuesto"}, {i:1, nombre: "Accesorio"}, {i:2, nombre: "Mano Obra"}];

export class InsumosOT{
    id;
    clase;
    productoID;
    observaciones;

    constructor(clase, rep_acc_moID, observaciones){
        this.clase = clase;
        this.rep_acc_moID = rep_acc_moID;
        this.observaciones = observaciones;
    }
}




