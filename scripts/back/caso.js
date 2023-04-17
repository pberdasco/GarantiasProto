import { ProductoCaso } from "./productoCaso.js";
import { cabeceraCaso } from "./cabeceraCaso.js";

export class Caso{
    cabecera;
    productos = [];

    constructor(cabecera, productos){
        //cabecera y cada elemento de productos debe venir con el caso en "" porque 
        //lo da de alta autonumerico Casos
        this.cabecera = cabecera;
        productos.forEach((x) => {
            this.productos.push(x)
        });
    }

    addProduct(producto){
        this.producto.id = this.productos.length;
        this.productos.push(producto);
        
    }

}