import { cabeceraCaso } from "./cabeceraCaso.js";
import { Caso } from "./caso.js";
import { CABECERAS, DETALLES } from "./datosFake.js";
import { ProductoCaso } from "./productoCaso.js";
import { todayFormated, padCeros } from "../global/dateAndPadd.js";
import { clientes , productos} from "../global/global.js";


export  class Casos{
    table = [];
    static ultCasoCF = 0;
    static ultCasoR = 0;

    loadCasosFake(){
        CABECERAS.forEach((x) => {
            const cabecera = Casos.convertFakeToCabecera(x)
            const detalles = [];
            let cabeceraRetiro = false;
            DETALLES.forEach((x) => {    
                        if (x.caso === cabecera.caso){
                            if(productoServiceable(x.producto))
                                cabeceraRetiro = true;
                            detalles.push(Casos.convertFakeToDetalle(x));
                        }
                            
                    });
            cabecera.retiro = cabeceraRetiro;
            this.addCaso(cabecera, detalles);
            Casos.ultCasoCF = 3;
            Casos.ultCasoR = 3;

            function productoServiceable(codigo){
                const producto = productos.getByCodigo(codigo);
                return producto.serviceable;
            }
        });
    }

    getCasoByCodigo(codigo){
        console.log("buscando codigo: ", codigo)
        return this.table.find((x) => x.cabecera.caso === codigo);
    };

    getCasoByID(id){
        return this.table[id];
    }


    addCaso(cabecera, detalles){
        if (!cabecera.caso) completeCaso(cabecera, detalles);

        this.table.push(new Caso(cabecera, detalles))

        function completeCaso(cabecera, detalles){
            const caso = getNextCaso(cabecera)
            cabecera.caso = caso;
            detalles.forEach((x) => x.caso = caso)
        }

        function getNextCaso(cabecera){
            if (cabecera.cliente.startsWith("C")){
                return `C${padCeros(++Casos.ultCasoCF, 6)}`;
            }else{
                return `R${padCeros(++Casos.ultCasoR, 6)}`;
            }
        }

    };

    changeCampoCabeceraByCodigo(codigo, campos){
        const caso = this.getCasoByCodigo(codigo);
        if (caso) {
            caso.cabecera.changeCampos(campos);
            return true;
        }
        return false;
    }

    changeCampoDetalleByCodigoAndId(codigoCaso,IdFila, campos){
        const caso = this.getCasoByCodigo(codigoCaso);
        if (caso) {
            caso.productos[IdFila].changeCampos(campos);
            return true;
        }
        return false;
    }

    static convertFakeToCabecera(x){
        const cabecera = new cabeceraCaso(x.caso, x.fecha, "", x.datos, x.estado, x.cliCod);
        cabecera.fechaInicio = x.fInicio;
        const cliente = clientes.getClienteByCodigo(x.cliCod);
        cabecera.direccion = cliente.direccion;
        cabecera.opcionRetiro = cliente.entregaDefault;
        return cabecera;
    }

    static convertFakeToDetalle(x){
        const detalle = new ProductoCaso(x.caso, x.producto, x.tipo, x.color, x.serie, x.factura, "", x.control);
        return detalle;
    }
}

