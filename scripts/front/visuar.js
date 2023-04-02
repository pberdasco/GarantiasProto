//import { Clientes } from "../back/clientes.js";
import * as gl from "../global/global.js";
import { loadTable} from "./grillaPrincipal.js";
import { setAgregar } from "./altaCaso.js";

const usuarioHash = location.hash.slice(1);
if (usuarioHash != ""){
    let usuario = getCliente(usuarioHash);
    loadTable(usuario);
    if (usuario.tipo != "E") setAgregar(usuario);   
}else{
    login();
}


function login(){
    console.log(("Debe loguerse para usar el sistema"));
}


function getCliente(codigo){
    let cliente = gl.clientes.getClienteByCodigo(codigo);  
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.textContent = cliente.nombre+" "+cliente.apellido;
    return cliente;
}
