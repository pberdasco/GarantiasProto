import {TIPOS} from "./producto.js";
import {productos, ENUM_ESTADO_DET} from "../global/global.js";
import { todayFormated } from "../global/dateAndPadd.js";

export class ProductoCaso{
    caso;
    producto;
    tipo;
    color;
    serie;
    nroFactura;
    fechaFactura;
    estado;
    historia = [];  // {usuario: , fecha: , estadoViejo: , estadoNuevo:}

    constructor(caso, producto, tipo, color, serie, nroFactura, fechaFactura, estado){
        this.caso = caso;
        this.producto = producto;
        this.tipo = tipo;
        this.color = color;
        this.serie = serie;
        this.nroFactura = nroFactura;
        this.fechaFactura = fechaFactura;
        this.estado = estado
    }

    getJoinedData(){
        return {tipoNombre: TIPOS.find((x) => x.tipo === this.tipo)?.nombre,
                productoNombre: productos.getByCodigo(this.producto)?.nombre,
                estadoDescr: ENUM_ESTADO_DET[this.estado],
        }
    }

    changeCampos(campos){
        // campos = { estado:}
        // if (campos.datos){
        //     this.addHito({caso: this.caso, usuario: "nn", fecha: todayFormated(), campo: "datos", valorViejo: this.nroFactura, valorNuevo: campos.nroFactura});
        //     this.datos = campos.dato;
        // } 
        if (campos.estado){
            this.addHito({caso: this.caso, usuario: "nn", fecha: todayFormated(), campo: "estado", valorViejo: this.estado, valorNuevo: campos.estado});
            this.estado = campos.estado;
        }  
    }

    addHito(hito){
        this.historia.push(hito);
    }
}