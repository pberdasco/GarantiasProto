import { Clientes } from "../back/clientes.js";

const c = new Clientes();


// parametros esperados:   ?usuario=p.berdasco@gmail.com&codigo=-1661388079
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const usuario = params.get("usuario");
const hashCode= params.get("codigo");
const datosCliente = c.lista.find((x) => x.mail === usuario);


if (datosCliente && parseInt(hashCode) === datosCliente.hash){
    console.log(datosCliente);
    if(datosCliente.tipo === "E") location.assign(`./visuar-int.html#${datosCliente.codigo}`);
    else location.assign(`./visuar.html#${datosCliente.codigo}`);
}else {
    document.getElementsByTagName("h1")[0].style.display = "block";
    document.getElementsByTagName("p")[0].style.display = "block";
}

