export {TIPOS, Productos};


const PROD = [
    {codigo: "SL-EBSP101B", nombre: "In ear SL-EBSP101B", tipo: 0, serviceable: false},
    {codigo: "SL-EBSP203B", nombre: "In ear SL-EBSP203B", tipo: 0, serviceable: false},
    {codigo: "SL-HSWG902GRAY", nombre: "On ear gamer SL-HSWG902GRAY", tipo: 0, serviceable: false},
    {codigo: "SL-HSWLP169B", nombre: "On ear SL-HSWLP169B", tipo: 0, serviceable: false},
    {codigo: "SL-HF100", nombre: "100W SL-HF100", tipo: 1, serviceable: true},
    {codigo: "SL-HF360", nombre: "360W SL-HF360", tipo: 1, serviceable: true},
    {codigo: "SL-VC16BAG", nombre: "Con bolsa 1600W SL-VC16BAG", tipo: 2, serviceable: true},
    {codigo: "SL-VC18BAG", nombre: "Con bolsa 1800W SL-VC18BAG", tipo: 2, serviceable: true},
    {codigo: "SL-VSRG120B", nombre: "Inalambrica 2 en 1 SL-VSRG120B", tipo: 2, serviceable: true},
    {codigo: "SL-RVC240", nombre: "Robot barredora SL-RVC240", tipo: 2, serviceable: true},
    {codigo: "SL-TO0040PN", nombre: "40 litros SL-TO0040PN", tipo: 3, serviceable: true},
    {codigo: "SL-TOR050PN", nombre: "50 litros SL-TOR050PN", tipo: 3, serviceable: true},
    {codigo: "SL-TOR060PN", nombre: "60 litros SL-TOR060PN", tipo: 3, serviceable: true},
    {codigo: "SL-HM1035PN", nombre: "De mano SL-HM1035PN", tipo: 4, serviceable: false},
    {codigo: "SL-HM5035PN", nombre: "Pedestal SL-HM5035PN", tipo: 4, serviceable: true},
    {codigo: "SL-HMR5035XPN", nombre: "Pedestal Bowl Inox SL-HMR5035XPN", tipo: 4, serviceable: true}
];

const TIPOS = [{codigo: 0, nombre: "Audifono"},
             {codigo: 1, nombre: "Minicomponente"},
             {codigo: 2, nombre: "Aspiradora"},
             {codigo: 3, nombre: "Cafetera"},
             {codigo: 4, nombre: "Batidora"},
            ];


class Producto{
    tipo;
    codigo;
    nombre;
    serviceable;

    constructor (tipo, codigo, nombre, serviceable){
        this.tipo = tipo;
        this.codigo = codigo;
        this.nombre = nombre;
        this.serviceable = serviceable;
    }
}

class Productos{
    table = []

    constructor() {
        
        PROD.forEach((x) => this.table.push(new Producto(x.tipo, x.codigo, x.nombre,x.serviceable)))
    }

    getByCodigo(codigo){
        let producto = this.table.find((x) => x.codigo === codigo);
        // let tipo = TIPOS.find((x) => x.codigo  === producto.tipo);
        // return {tipo , producto};
        return producto;
    };

    getByTipo(codigoTipo){
        return this.table.filter((x) => x.tipo === codigoTipo)
    }
}



