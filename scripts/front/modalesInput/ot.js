import * as gl from  "../../global/global.js";
import { todayFormated } from "../../global/dateAndPadd.js";
import { TIPOS } from "../../back/producto.js";
import { OrdenTrabajo } from "../../back/ordenTrabajo.js";
import {CLASE_INSUMO, getClaseInsumoId, pklToRepuesto, RepuestoToPkl} from "../../global/repuestos.js";

export default async function getOTasync(caso, filaProducto){
    return new Promise((resolve, reject) => {
        const ot = document.querySelector(".ingresaOT");

        const otNumero = document.getElementById("otNro");
        const otTecnico = document.getElementById("otTecnico");
        const otProducto = document.getElementById("otProducto");
        const otFallaCliente = document.getElementById("fallaClienteOT");
        const otFallaStd = document.getElementById("fallaStdOT");
        const otAclaraFalla = document.getElementById("aclaraFallaOT");

        const otMasInsumoButton = document.getElementById("otMasInsumo");
        const otCancelarButton = document.getElementById("otCancelar");
        const otAbiertaButton = document.getElementById("otAbierta");
        const otCerradaButton = document.getElementById("otCerrada");

        otMasInsumoButton.addEventListener("click", agregarFila);
        otCancelarButton.addEventListener("click", cancelOT);
        otAbiertaButton.addEventListener("click", closeOTAbierta);
        otCerradaButton.addEventListener("click", closeOTCerrada);
        ot.addEventListener("keydown", handleKeyDown);

        let orden = gl.ots.getByCasoProducto(caso, filaProducto);
        asignaDefaults();


        if((orden?.estado === 2)){     // Si esta cerrada no deja ni abrir ni cerrar
            otAbiertaButton.disabled = true;
            otCerradaButton.disabled = true;
            otMasInsumoButton.disabled = true;
        }else{
            otAbiertaButton.disabled = false;
            otCerradaButton.disabled = false;
            otMasInsumoButton.disabled = false;
        }

        //fillOptions();

        ot.showModal()
        
        // ===================================  Event Handlers =========================

        function cancelOT(){
            closeOT("-");
        }

        function handleKeyDown(e){
            if (e.key === "Escape") {
                cancelOT(); 
            }
        }

        function closeOTAbierta(){
            insertOrUpdate(1);
            closeOT("A")
        }

        function closeOTCerrada(){
            insertOrUpdate(2);
            closeOT("C");
        }

        function insertOrUpdate(estado){
            if (orden){
                orden.estado = estado;
                orden.tecnico = otTecnico.value;
                orden.insumos = tbodyAInsumos();
                gl.ots.updateOT(orden);
            }else{
                orden = new OrdenTrabajo(caso.cabecera.caso, filaProducto, todayFormated(), otTecnico.value, tbodyAInsumos());
                orden.estado = estado;
                gl.ots.insertOT(orden);
            } 
        }

        function closeOT(status){
            otMasInsumoButton.removeEventListener("click", agregarFila);
            otAbiertaButton.removeEventListener('click', closeOTAbierta);
            otCerradaButton.removeEventListener('click', closeOTCerrada);
            ot.removeEventListener("keydown", handleKeyDown);
            otCancelarButton.removeEventListener('click', cancelOT);
            borrarCampos();
            ot.close();
            resolve(status);
        }

        function borrarCampos(){
            const filas = document.getElementById("otInsumos-body").querySelectorAll('tr');
            for (let i=filas.length-1; i >=0; i--) filas[i].remove();
        }

        function tbodyAInsumos(){
            const filas = document.getElementById("otInsumos-body").querySelectorAll('tr');
            const insumos =[];
            filas.forEach((fila) => {
                    const clase = getClaseInsumoId(fila.querySelector('[name="categoria"]').value);
                    const productoParsed = pklToRepuesto(fila.querySelector('[name="codigo"]').value)
                    const productoID = productoParsed.id;
                    const observaciones = fila.querySelector('[name="observaciones"]').value;
                    insumos.push({clase, productoID, observaciones});
                });
            return insumos;
        }

        

        function asignaDefaults(){
            const detCaso = caso.productos[filaProducto];
            const prod = gl.productos.getByCodigo(detCaso.producto)
            otProducto.value = `${TIPOS[prod.tipo].nombre} - ${prod.nombre}`;
            otFallaCliente.value = detCaso.fallaCliente;
            otFallaStd.value = gl.FALLAS[detCaso.codigoFallaService]?.descr || detCaso.codigoFallaService;
            otAclaraFalla.value = detCaso.descripcionFallaService;

            if (orden){     
                otTecnico.value = orden.tecnico;
                otNumero.value = `${orden.id} - ${(orden.estado === 1) ? "Abierta": "Cerrada"}`;
                orden.insumos.forEach((x) => {
                    const campos = agregarFila();
                    campos[0].querySelector('[name="categoria"]').value = CLASE_INSUMO[x.clase];
                    campos[1].querySelector('[name="codigo"]').value = RepuestoToPkl(x.productoID);
                    campos[2].querySelector('[name="observaciones"]').value = x.observaciones;
                });
                // Cargar todo lo de la OTAbierta
            }else{
                otNumero.value = "N/D";
                otTecnico.value = gl.usuario.mail;
            }            
        }

        function agregarFila(){
            let tbody = document.getElementById("otInsumos-body");
            let fila = tbody.insertRow(-1);
            //fila.className = "fila-nuevoProducto";

            const campos = [];
            for (let i = 0; i < 3; i++){
                campos.push(fila.insertCell(i));
                campos[i].className = "celda-nuevoProducto"; 
            }
            campos[0].innerHTML = '<input type="text" list="claseInsumos" name="categoria" class="inputGrilla" autocomplete="off">';
            campos[1].innerHTML = '<input type="text" list="insumos" name="codigo" class="inputGrilla" autocomplete="off">';
            //TODO ver si '<select name="producto" class="inputGrilla">'; es mejor que list / datalist
            //campos[1].onfocus= armaOptionsProducto;
            campos[2].innerHTML = '<input type="text" name="observaciones" class="inputGrilla" autocomplete="off">';
            return campos;
        }
    });

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
