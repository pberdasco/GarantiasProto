
import {Productos} from "../back/producto.js";
import {Clientes} from "../back/clientes.js";
import {Casos}  from "../back/casos.js";

export const productos = new Productos();
export const clientes = new Clientes();
export const casos = new Casos();
casos.loadCasosFake();

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
                                {i: 7, n:"Completado", c:3}
                            ];
export const ENUM_ESTADO_DET = [{i: 0, n:"No procesado", c:0},
                            {i: 1, n:"Rechazado", c:4},
                            {i: 2, n:"Destrucción pendiente", c:2},
                            {i: 3, n:"Retiro pendiente", c:2},
                            {i: 4, n:"En revisión", c:1},
                            {i: 5, n:"Destruido", c:1},
                            {i: 6, n:"Devolucion $", c:3},
                            {i: 7, n:"Cambio", c:3},
                            {i: 8, n:"Reparación", c:1},
                            {i: 9, n:"Accesorio", c:3},
                            {i: 10, n:"OT abierta", c:1},
                            {i: 11, n:"OT completa", c:3},
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

