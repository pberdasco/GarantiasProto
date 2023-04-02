export function displayMessage(HTMLtext, titulo){
    const mensajes = document.querySelector('.mensajes');
    const modalOk = document.getElementById("mensajeOk");
    const tituloMensaje = document.getElementById('tituloMensaje');
    const infoMensaje = document.getElementById('textoMensaje');
    modalOk.addEventListener("click", function closeModal(e) {closeModalMensaje(mensajes, modalOk, closeModal)});
    tituloMensaje.innerHTML = titulo ?? "Mensaje";
    infoMensaje.innerHTML = HTMLtext;
    mensajes.showModal(); 
}

function closeModalMensaje(mensajes, modalOk, closeModal){
    modalOk.removeEventListener('click', closeModal);
    mensajes.close();
}