import { loadLine } from "./grillaPrincipal.js";
import { TIPOS } from "../back/producto.js";
import { todayFormated, dateFormated } from "../global/dateAndPadd.js";
import * as gl from "../global/global.js";
let listaCategorias = armaOptionsCategoria();

let usuario;

// ************  Agregar Caso *****************
export function setAgregar(u){
    usuario = u;
    const btnAgregar = document.getElementById("agregar");
    btnAgregar.addEventListener("click", mostrarAlta);
}

function mostrarAlta(e){
    document.getElementById("alta").classList.remove("altaOculta");

    // habilitar los botones de alta con sus handlers
    document.getElementById("altaCancelar").addEventListener("click", finAltaCaso);
    document.getElementById("altaGrabar").addEventListener("click", grabarCaso);
    document.getElementById("excel").addEventListener("click", finAltaCaso);
    document.getElementById("altaAgregarFila").addEventListener("click", agregarFila);

    defaultsCabecera();
    agregarFila();
}

function finAltaCaso(e){
    document.getElementById("altaCancelar").removeEventListener("click", finAltaCaso);
    document.getElementById("altaGrabar").removeEventListener("click", grabarCaso);
    document.getElementById("excel").removeEventListener("click", finAltaCaso);
    document.getElementById("altaAgregarFila").removeEventListener("click", agregarFila);

    const filas = document.getElementsByClassName("fila-nuevoProducto");
    for (let i=filas.length-1; i >=0; i--) filas[i].remove();

    document.getElementById("alta").classList.add("altaOculta");
}

function grabarCaso(e){
    
    let nuevosItems = []

    let tabla = document.getElementsByClassName("fila-nuevoProducto");
    for (let i=0; i < tabla.length; i++){
        nuevosItems.push({factura: tabla[i].children[0].children[0].value,
                          sku: tabla[i].children[1].children[0].value,
                          color: tabla[i].children[2].children[0].value,
                          serie: tabla[i].children[3].children[0].value,
                          control: tabla[i].children[4].children[0].value})
    }

    //TODO: usar algo tipo
    // let cab = new cabeceraCaso("", "23-01-20", "", 0, 0,"R0002");
    // let det = [new ProductoCaso("", "SL-RVC240", 3, "Verde", "AK3459", "FC 0002-88483332", "23-01-15", 1),
    //             new ProductoCaso("", "SL-TOR060PN", 4, "Negro", "AF3959", "FC 0002-88483332", "23-01-15", 1)];
    // gl.casos.addCaso(cab, det);
    casos.detalleDatos.push(nuevosItems);
    casos.cabeceraDatos.push({fecha: document.getElementById("fecha").value, items: nuevosItems.length, estado: "Iniciado"});

    loadLine(casos.cabeceraDatos.length - 1);

    finAltaCaso(e);
}

function defaultsCabecera(){
    document.getElementById("cliente").value = usuario.mail;
    const fecha = todayFormated();
    document.getElementById("fecha").value = fecha;
    document.getElementById("rango").value = "9 a 18 horas";
    document.getElementById("calle").value = usuario.direccion.calle;
    document.getElementById("numero").value = usuario.direccion.numero;
    document.getElementById("provincia").value = usuario.direccion.provincia;
    document.getElementById("localidad").value = usuario.direccion.localidad;
    document.getElementById("codPost").value = usuario.direccion.codPostal;
}

function agregarFila(e) {
	let tabla = document.getElementById("grilla-alta-productos");
    let fila = tabla.insertRow(-1);
	fila.className = "fila-nuevoProducto";

    const campos = [];
    for (let i = 0; i < 8; i++){
        campos.push(fila.insertCell(i));
        campos[i].className = "celda-nuevoProducto"; 
    }
	campos[0].innerHTML = '<select name="categoria" class="inputGrilla"> '+listaCategorias;
    campos[1].innerHTML = '<select name="producto" class="inputGrilla">';
    campos[1].onfocus= armaOptionsProducto;
    console.dir(campos[1]);
	campos[2].innerHTML = '<input type="text" name="color" class="inputGrilla">';
	campos[3].innerHTML = '<input type="text" name="falla" class="inputGrilla">';
	campos[4].innerHTML = '<input type="text" name="serie" class="inputGrilla">';
    campos[5].innerHTML = '<input type="text" name="factura" class="inputGrilla">';
    campos[6].innerHTML = '<input type="text" name="ffactura" class="inputGrilla">';
    campos[7].innerHTML = '<input type="text" name="tipo" class="inputGrilla">';
}


function armaOptionsCategoria(){
    let opt = "";
    for (let i= 0; i < TIPOS.length; i++){
        opt += `<option value="${TIPOS[i].codigo}"> ${TIPOS[i].nombre} </option>`
    }
    return opt;
}

function armaOptionsProducto(e){
    console.log(e);    
}