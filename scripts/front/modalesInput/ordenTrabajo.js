import * as gl from  "../../global/global.js";
import { todayFormated } from "../../global/dateAndPadd.js";
import { TIPOS } from "../../back/producto.js";


export default function getOT(caso, filaProducto){
    const ot = document.querySelector(".ingresaOT");
    const otCancelarButton = document.getElementById("otCancelar");
    const otAbiertaButton = document.getElementById("otAbierta");
    const otCerradaButton = document.getElementById("otCerrada");
    const detCaso = caso.productos[filaProducto];
    // const options = document.getElementById("fallasStd");
    asignaDefaults();

    otCancelarButton.addEventListener("click", closeOT);
    if((detCaso.estado != 13)){     // Si esta cerrada no deja ni abrir ni cerrar
        otAbiertaButton.addEventListener("click", closeOTAbierta);
        otCerradaButton.addEventListener("click", closeOTCerrada);
    }
    //fillOptions();

    ot.showModal()

    function closeOT(){
        otCancelarButton.removeEventListener('click', closeOT);
        ot.close();
    }

    function closeOTAbierta(){
        // tomar campos y grabar / regrabar la OT
        // blanquear campos
        otAbiertaButton.removeEventListener('click', closeOTAbierta);
        ot.close();
    }

    function closeOTCerrada(){
            // tomar campos y grabar / regrabar la OT
        // blanquear campos
        otCerradaButton.removeEventListener('click', closeOTCerrada);
        ot.close();
    }


    function asignaDefaults(){
        if (detCaso.estado === 12){     //12=OTAbierta
            // Cargar todo lo de la OTAbierta
        }      
        const otNumero = document.getElementById("otNro");
        const otTecnico = document.getElementById("otTecnico");
        const otProducto = document.getElementById("otProducto");
        
        
        const prod = gl.productos.getByCodigo(detCaso.producto)
        otProducto.value = `${TIPOS[prod.tipo].nombre} - ${prod.nombre}`;
        otTecnico.value = gl.usuario.mail;
    }


    // function fillOptions(){
    //     //limpio las opciones que se hayan cargado la ultima vez pues pueden haber sido para otro tipo de productos
    //     while (options.firstChild) {
    //         options.removeChild(options.firstChild);
    //     }
    //     //selecciono las fallas standar para el tipo de producto actual y las pongo como opciones
    //     const fallasProducto = gl.TIPO_FALLAS.filter((x) => x.tipo === caso.productos[filaProducto].tipo)
    //     fallasProducto.forEach((x) => {
    //         const el = document.createElement("option");
    //         el.value = gl.getFallaDescription(x.falla);
    //         options.appendChild(el);
    //     })
    // }
} 
