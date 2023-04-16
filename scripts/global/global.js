import {Productos} from "../back/producto.js";
import {Clientes} from "../back/clientes.js";
import {Casos}  from "../back/casos.js";

export const productos = new Productos();
export const clientes = new Clientes();
export const casos = new Casos();

export let usuario;
export function setUsuario(u){
    usuario = u;
}

casos.loadCasosFake();

export const TIPO_FALLAS = [{tipo: 0, falla: 0}, {tipo: 0, falla: 1}, {tipo: 0, falla: 2}, {tipo: 0, falla: 99},
                            {tipo: 1, falla: 0}, {tipo: 1, falla: 1}, {tipo: 1, falla: 3}, {tipo: 1, falla: 99},
                            {tipo: 2, falla: 1}, {tipo: 2, falla: 3}, {tipo: 2, falla: 99},
                            {tipo: 3, falla: 0}, {tipo: 3, falla: 99},
                            {tipo: 4, falla: 0}, {tipo: 4, falla: 1}, {tipo: 4, falla: 3}, {tipo: 4, falla: 4}, {tipo: 4, falla: 5}, {tipo: 4, falla: 99}]

export const FALLAS = [{i: 0, descr: "Motor clavado"}, {i:1, descr: "Cable cortado"}, {i:2, descr:"Bolsa rota"},
                       {i:3, descr:"Rotor partido"}, {i:4, descr: "Corto circuito"}, {i:5, descr: "Corto circuito"}, {i:99, descr:"Otros",tipo: 3}]

export function getFallaDescription(falla){
    return FALLAS.find((x) => x.i === falla)?.descr;
} 

export const ENUM_COLOR_CLASS = ["colorRevision", "colorEnProceso", "colorEnCliente", "colorAprobado", "colorRechazado"]; 
export const ENUM_DATOS = [ {i: 0, n:"Ok", c:3},
                            {i: 1, n:"Revisión",c:0},
                            {i: 2, n:"Faltantes", c:4},
                            ];
export const ENUM_ESTADO_CAB = [{i: 0, n:"Inicial", c:0},
                                {i: 1, n:"En proceso", c:1},
                                {i: 2, n:"Retiro solicitado", c:2},
                                {i: 3, n:"Destruccion solicitada", c:2},
                                {i: 4, n:"Recibido", c:1},
                                {i: 5, n:"Destruido", c:1},
                                {i: 6, n:"Revisado", c:1},
                                {i: 7, n:"Completado", c:3},
                                {i: 8, n:"Cancelado", c:4}
                            ];
export const ENUM_ESTADO_DET = [{i: 0, n:"No procesado", c:0},
                            {i: 1, n:"Rechazado", c:4},
                            {i: 2, n:"Destrucción pendiente", c:2},
                            {i: 3, n:"Retiro pendiente", c:2},
                            {i: 4, n:"En revisión", c:1},
                            {i: 5, n:"Revisado", c:1},
                            {i: 6, n:"No recibido", c:2},  
                            {i: 7, n:"Destruido", c:1},
                            {i: 8, n:"Devolucion $", c:3},
                            {i: 9, n:"Cambio", c:3},
                            {i: 10, n:"Reparación", c:1},
                            {i: 11, n:"Accesorio", c:3},
                            {i: 12, n:"OT abierta", c:1},
                            {i: 13, n:"OT completa", c:3},
                        ];
export const OPCION_RETIRO = [  {i: 0, n: "Retira OCA"},
                                {i: 1, n: "OCA Sucursal"},
                                {i: 2, n: "En Visuar"}]

export function statusColorClass(zona, estado){
    if (zona === "Cabecera")
        return ENUM_COLOR_CLASS[ENUM_ESTADO_CAB[estado]?.c];
        
    if (zona === "Datos")
        return ENUM_COLOR_CLASS[ENUM_DATOS[estado]?.c];
    
    if (zona === "Detalle")
        return ENUM_COLOR_CLASS[ENUM_ESTADO_DET[estado]?.c];
}

export const PROVINCIAS = ["Ciudad Autónoma de Buenos Aires", "Buenos Aires", "Catamarca", "Chaco", "Chubut",
                           "Córdoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La rioja",
                           "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis",
                           "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del fuego", "Tucuman"];

