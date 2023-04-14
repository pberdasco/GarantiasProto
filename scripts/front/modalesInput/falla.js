import * as gl from  "../../global/global.js";


export default function getFalla(caso, filaProducto){
    const fallaModal = document.querySelector(".ingresaFalla");
    const guardarButton = document.getElementById("ingresaFallaGuardar")
    const options = document.getElementById("fallasStd");
    const fallaCliente = document.getElementById("fallaCliente") 
    fallaCliente.value = caso.productos[filaProducto].fallaCliente;
    guardarButton.addEventListener("click", closeFallaModal);
    fillOptions();

    fallaModal.showModal()

    function closeFallaModal(){
        let fallaStd = document.getElementById("fallaStd").value;
        let aclaraFalla = document.getElementById("aclaraFalla").value;
        caso.productos[filaProducto].codigoFallaService = gl.FALLAS.find((x) => x.descr === fallaStd).i; 
        caso.productos[filaProducto].descripcionFallaService = aclaraFalla;
        fallaStd  = "";
        aclaraFalla = "";
        guardarButton.removeEventListener('click', closeFallaModal);
        fallaModal.close();
    }

    function fillOptions(){
        //limpio las opciones que se hayan cargado la ultima vez pues pueden haber sido para otro tipo de productos
        while (options.firstChild) {
            options.removeChild(options.firstChild);
        }
        //selecciono las fallas standar para el tipo de producto actual y las pongo como opciones
        const fallasProducto = gl.TIPO_FALLAS.filter((x) => x.tipo === caso.productos[filaProducto].tipo)
        fallasProducto.forEach((x) => {
            const el = document.createElement("option");
            el.value = gl.getFallaDescription(x.falla);
            options.appendChild(el);
        })
    }
} 

