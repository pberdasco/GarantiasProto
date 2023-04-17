import * as gl from  "../../global/global.js";


export default function getFalla(caso, filaProducto){
    const fallaModal = document.querySelector(".ingresaFalla");
    const guardarButton = document.getElementById("ingresaFallaGuardar");
    const cancelarButton = document.getElementById("ingresaFallaCancelar");
    const fallaCliente = document.getElementById("fallaCliente") 
    const fallaStd = document.getElementById("fallaStd");
    const aclaraFalla = document.getElementById("aclaraFalla");
    const fallasStd = document.getElementById("fallasStd");

    fallaCliente.value = caso.productos[filaProducto].fallaCliente;
    
    fallaModal.addEventListener("keydown", handleKeyDown);
    guardarButton.addEventListener("click", guardarFallaModal);
    cancelarButton.addEventListener("click", cancelarFallaModal);

    fillOptions();

    let status = ""
    fallaModal.showModal()
    return status;

    function guardarFallaModal(){
        caso.productos[filaProducto].codigoFallaService = gl.FALLAS.find((x) => x.descr === fallaStd.value)?.i; 
        caso.productos[filaProducto].descripcionFallaService = aclaraFalla.value;
        closeFallaModal("G");
    }

    function cancelarFallaModal(){
        closeFallaModal("-")
    }

    function handleKeyDown(e){
        if (e.key === "Escape") {
            cancelarFallaModal(); // Si se presiona la tecla Esc, llamar a closeOT
        }
    }

    function closeFallaModal(s){
        fallaStd.value  = "";
        aclaraFalla.value = "";

        fallaModal.removeEventListener("keydown", handleKeyDown);
        guardarButton.removeEventListener("click", guardarFallaModal);
        cancelarButton.removeEventListener("click", cancelarFallaModal);

        fallaModal.close();
        status = s;
    }


    function fillOptions(){
        //limpio las opciones que se hayan cargado la ultima vez pues pueden haber sido para otro tipo de productos
        while (fallasStd.firstChild) {
            fallasStd.removeChild(fallasStd.firstChild);
        }
        //selecciono las fallas standar para el tipo de producto actual y las pongo como opciones
        const fallasProducto = gl.TIPO_FALLAS.filter((x) => x.tipo === caso.productos[filaProducto].tipo)
        fallasProducto.forEach((x) => {
            const el = document.createElement("option");
            el.value = gl.getFallaDescription(x.falla);
            fallasStd.appendChild(el);
        })
    }
} 

