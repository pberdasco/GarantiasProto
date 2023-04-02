import { ENUM_DATOS, ENUM_ESTADO_CAB, clientes } from "../global/global.js";
import { todayFormated} from "../global/dateAndPadd.js";


export class cabeceraCaso{
    caso;
    fechaAlta;
    fechaInicio = "";                  //cuando datosOK 
    fechaFin;
    datos;                        //Orden en ENUM_DATOS
    estado;                       //Orden en ENUM_ESTADO_CAB
    cliente; 
    retiro = false;               // en el alta si algun item serviceable => default = true; si todos los items no serviceables => default = false // boton para cambiar 
    opcionRetiro = 0;             // 0=OCA, 1=Sucursal, 2=Visuar
    direccion;                    // Default la del cliente (cargada por Call Center)  
    historia = [];                // {usuario: , fecha: , campo: , valorViejo: valorNuevo:}

    constructor(caso, fAlta, ffin,datos, estado, cliente){
        this.caso = caso;
        this.fechaAlta = fAlta;
        this.fechaFin = ffin;
        this.datos = datos;
        this.estado = estado;
        this.cliente = cliente;
    }

    getJoinedData(){
        const cliente = clientes.getClienteByCodigo(this.cliente);

        return {datosDescr: ENUM_DATOS[this.datos],
                estadoDescr: ENUM_ESTADO_CAB[this.estado],
                clienteDescr: this.cliente + "-" + cliente.mail + cliente.empresa
        }
    }

    changeCampos(campos){
        // campos = {fechaFin: , datos:, estado:}
        if (campos.fechaFin){
            this.addHito({caso: this.caso, usuario: "nn", fecha: todayFormated(), campo: "fechaFin", valorViejo: this.fechaFin, valorNuevo: campos.fechaFin})
            this.fechaFin = campos.fechaFin; 
        } 
        if (campos.datos){
            this.addHito({caso: this.caso, usuario: "nn", fecha: todayFormated(), campo: "datos", valorViejo: this.datos, valorNuevo: campos.datos});
            this.datos = campos.dato;
            if (this.datos === 0) this.fechaInicio = todayFormated(); // poner datos=OK es lo que setea la fecha de inicio 
        } 
        if (campos.estado){
            this.addHito({caso: this.caso, usuario: "nn", fecha: todayFormated(), campo: "estado", valorViejo: this.estado, valorNuevo: campos.estado});
            this.estado = campos.estado;
        }  
    }

    addHito(hito){
        // hito = {caso: , usuario: , fecha: , campo: "ej. fechaFin", valorViejo: , valorNuevo: }
        this.historia.push(hito);
    }
}