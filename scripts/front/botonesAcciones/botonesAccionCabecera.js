import * as Icon from "../../global/icons.js";

export function armaAccionesCabecera(index, caso){

    // if (caso.productos.some((x) => x.estado === 0)) console.log(`Caso ${index} tiene al menos un item en estado 0`);
    // else console.log(`Caso ${index} tiene todos los items procesados`);

    let resultado = `<button type="button" class="verCabBtn">${Icon.LUPA}</button>`;
    resultado += correspondsToogleretiro(caso);
    resultado += accionesDesdeDatosRevision(caso);
    resultado += accionesCabecera(caso);
    return resultado;
    

    function accionesDesdeDatosRevision(caso){
        let res = "";
        if (caso.cabecera.estado === 0){   // solo se puede cambiar datos si estado=inicial
            if (caso.cabecera.datos === 1 || caso.cabecera.datos === 2){   // desde revision o faltantes a datos ok
                res += `<button type="button" class="dtsOkBtn">${Icon.DATA_OK}</button>`;
            }
            if (caso.cabecera.datos === 1){
                res += `<button type="button" class="dtsFaltanteBtn">${Icon.DATA_FALTA}</button>`;
            }
        }
        return res;
    }

    function correspondsToogleretiro(caso){
         
        //if (canChangeRetiro(caso)){    // con la nueva definicion parece que alcanza con que este en estado cabecera Inicial
        if (caso.cabecera.estado === 0){
            let toogleRetiro = Icon.VAN;
            if (caso.cabecera.retiro) toogleRetiro = Icon.TRASH; 
            return  `<button type="button" class="tglRetiroBtn">${toogleRetiro}</button>`;
        }
        return "";

        // Si (estadoCab === inicial) y (todos los productos estan en No procesado o Rechazado) y (hay al menos un No procesado)
        // function canChangeRetiro(caso) {                          
        //     let hasNoProcesado = false;                           
        //     let hasOtherThanNPorRechazado = false;
        //     for (let i = 0; i < caso.productos.length; i++) {
        //       if (caso.productos[i].estado === 0) {                //0=NoProcesado
        //         hasNoProcesado = true;
        //       } else if (caso.productos[i].estado !== 1) {         // 1=Rechazado
        //         hasOtherThanNPorRechazado = true;
        //       }
        //     };
        //     return (caso.cabecera.estado === 0) && hasNoProcesado && !hasOtherThanNPorRechazado;
        //   }      
    }

    function accionesCabecera(caso){
        if (caso.cabecera.estado === 0 && caso.cabecera.datos === 0){
            return `<button type="button" class="startBtn">${Icon.START}</button>`;
        }

        //const caso = gl.casos.table[filaCaso];
        if (caso.cabecera.estado === 1){   //1= En proceso
            const todosProcesados = !caso.productos.some((x) => x.estado === 0);
            if (todosProcesados && caso.cabecera.retiro)
                return `<button type="button" class="avisoRetiroBtn">${Icon.AVISO}</button>`;
            if (todosProcesados && !caso.cabecera.retiro)
                return `<button type="button" class="avisoSolicDestrBtn">${Icon.AVISO}</button>`;
        }   

        if (caso.cabecera.estado === 2)
            return `<button type="button" class="recibidoBtn">${Icon.RECIBIDO}</button>`;

        if (caso.cabecera.estado === 3)
            return `<button type="button" class="destruidoBtn">${Icon.DESTRUIDO}</button>`;

        return "";
    }
};
