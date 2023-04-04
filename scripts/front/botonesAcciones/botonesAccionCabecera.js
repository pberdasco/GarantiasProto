import * as Icon from "../../global/icons.js";

export function armaAccionesCabecera(index, caso){

    if (caso.productos.some((x) => x.estado === 0)) console.log(`Caso ${index} tiene al menos un item en estado 0`);
    else console.log(`Caso ${index} tiene todos los items procesados`);

    let resultado = correspondsToogleretiro(caso);
    resultado += accionesDesdeDatosRevision(caso);
    return resultado;
    

    function accionesDesdeDatosRevision(caso){
        let res = "";
        if (caso.cabecera.datos === 1 || caso.cabecera.datos === 2){   // desde revision o faltantes a datos ok
            res += `<button type="button" class="dtsOkBtn">${Icon.DATA_OK}</button>`;
        }
        if (caso.cabecera.datos === 1){
            res += `<button type="button" class="dtsFaltanteBtn">${Icon.DATA_FALTA}</button>`;
        }
        return res;
    }

    function correspondsToogleretiro(caso){
        // si hay no hay productos que no sean (No procesadps o Rechazadps) y al menos 1 sea No procesado 
        if (canChangeRetiro(caso.productos)){
            let toogleRetiro = Icon.VAN;
            if (caso.cabecera.retiro) toogleRetiro = Icon.TRASH; 
            return  `<button type="button" class="tglRetiroBtn">${toogleRetiro}</button>`;
        }
        return "";

        function canChangeRetiro(table) {  // 0=NoProcesado, 1=Rechazado
            let hasNoProcesado = false;
            let hasOtherThanNPorRechazado = false;
            for (let i = 0; i < table.length; i++) {
              if (table[i].estado === 0) {
                hasNoProcesado = true;
              } else if (table[i].estado !== 1) {
                hasOtherThanNPorRechazado = true;
              }
            };
            return hasNoProcesado && !hasOtherThanNPorRechazado;
          }      
    }
};
