//import {eventosAccionesCabecera, eventosAccionesDetalle, statusColorClass} from "./estadosYeventosGrilla.js"; 
import { armaAccionesCabecera } from "./botonesAcciones/botonesAccionCabecera.js";
import { armaAccionesDetalle } from "./botonesAcciones/botonesAccionDetalle.js";
import {eventosAccionesCabecera} from "./handlersAcciones/handlersAccionCabecera.js";
import {eventosAccionesDetalle} from "./handlersAcciones/handlersAccionDetalle.js";

import { TIPOS } from "../back/producto.js";
import * as gl from "../global/global.js";

const INFO = `<i class="fa-solid fa-info"></i>`;
const VAN = `<i class="fa-solid fa-truck-fast"></i>`;
const TRASH = `<i class="fa-regular fa-trash-can"></i>`;
let usuario;
let usuarioInterno;

export function loadTable(u){
    usuario = u;
    usuarioInterno = usuario.tipo === "E";
    for (let i = 0; i < gl.casos.table.length; i++){       
        loadLine(i);
    }
}

export function loadLine(i){
    var tableBody = document.getElementById("main-body");
    if  (gl.casos.table[i].cabecera.cliente === usuario.codigo || usuarioInterno){   
        tableBody.appendChild(getLineaCabecera(i));
        tableBody.appendChild(getTablaDetalle(i));
    }

}

function getLineaCabecera(index){
    const cabecera = gl.casos.table[index].cabecera;
    const lineaCabecera = document.createElement("tr");
    lineaCabecera.classList.add("cabecera");
    lineaCabecera.setAttribute('id',`rwc-${index}`);
    let datos = cabecera.datos;
    let estado = cabecera.estado;
    const retiro = (cabecera.retiro) ? VAN : TRASH;
    const cliente = gl.clientes.getClienteByCodigo(cabecera.cliente);
    const textoCliente  = `${cliente.codigo} - ${cliente.mail} - ${cliente.empresa || cliente.nombre + " " +cliente.apellido}`; 
    lineaCabecera.innerHTML =  `<td> <button type="button" class="showDetail">${INFO}</button> </td>
                                <td>${cabecera.caso}</td>
                                <td>${cabecera.fechaAlta}</td> 
                                <td>${gl.casos.table[index].productos.length}</td>
                                <td class="c-cab-datos ${gl.statusColorClass("Datos", datos)}">${gl.ENUM_DATOS[datos].n}</td> 
                                <td class="c-cab-fInicio">${cabecera.fechaInicio}</td>     
                                <td class="c-cab-estado ${gl.statusColorClass("Cabecera", estado)}">${gl.ENUM_ESTADO_CAB[estado].n}</td>
                                <td class="c-cab-retiro">${retiro}</td>
                                <td>${textoCliente}</td>`;
    if (usuarioInterno){
        lineaCabecera.innerHTML += `<td> <div class="actions">${armaAccionesCabecera(index, gl.casos.table[index])}</div></td>`
        eventosAccionesCabecera(lineaCabecera);
    }
    //TODO: esto de aca abajo lo podria meter en eventosAccionesCabecera(lineaCabecera), no? ==> OJO porque lo otro va solo si usuario interno, sino no ...pero en algun momento hay que separar el codigo de usuario interno...
    const  showDetail = lineaCabecera.querySelector(".showDetail");
    showDetail.addEventListener("click", () => {
                                            const detalle = lineaCabecera.nextElementSibling;
                                            detalle.style.display = detalle.style.display === "none" ? "table-row" : "none";
                                    });
    
    return lineaCabecera;
}

function getTablaDetalle(index) {
    const tablaDetalle = document.createElement("tr");
    tablaDetalle.classList.add("detalle");
  
    const table = document.createElement("table");
    table.classList.add("detail-table");
  
    const thead = document.createElement("thead");
    thead.innerHTML = ` <tr>
                        <th data-column="1">Producto</th>
                        <th data-column="2">Color</th>
                        <th data-column="3">Factura</th>
                        <th data-column="4">Serie</th>
                        <th data-column="5">Estado</th>
                        ${(usuarioInterno)? `<th data-column="6">Acciones Producto</th>`: ``  }
                        </tr>`;
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
    const rows = getLineasDetalle(index);
    rows.forEach((row) => tbody.appendChild(row));
    table.appendChild(tbody);
  
    const td = document.createElement("td");
    td.setAttribute("colspan", "10");
    td.appendChild(table);
  
    tablaDetalle.appendChild(td);
  
    return tablaDetalle;
  }
  

function getLineasDetalle(index){
    const detalle = gl.casos.table[index].productos;
    const tableRows = [];
  
    for (let j = 0; j < detalle.length; j++){
        const producto = gl.productos.getByCodigo(detalle[j].producto);
        let textoProducto = `${TIPOS[detalle[j].tipo].nombre}: ${producto?.nombre} (${(producto?.serviceable ? "S" : "NS")})`;
        let estado = detalle[j].estado;
    
        const tr = document.createElement("tr");
        tr.setAttribute("id", `rwd-${index}-${j}`);  
        tr.innerHTML = `<td data-column="1">${textoProducto}</td>`;
        tr.innerHTML += `<td data-column="2">${detalle[j].color}</td>`;
        tr.innerHTML += `<td data-column="3">${detalle[j].nroFactura}</td>`;
        tr.innerHTML += `<td data-column="4">${detalle[j].serie}</td>`;
        tr.innerHTML += `<td data-column="5" class="c-det-estado ${gl.statusColorClass("Detalle", estado)}">${gl.ENUM_ESTADO_DET[estado].n}</td>`;
        if (usuarioInterno){
            tr.innerHTML += `<td data-column="6"><div class="actions">${armaAccionesDetalle(estado, gl.casos.table[index].cabecera)}</div></td>`;
            eventosAccionesDetalle(tr);
        }

        tableRows.push(tr);
    }
  
    return tableRows;
  }






