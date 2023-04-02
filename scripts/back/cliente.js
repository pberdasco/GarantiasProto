export class cliente{
    codigo;
    nombre;
    apellido;
    mail;
    tipo;
    empresa;
    hash;
    password;
    dni;
    entregaDefault;
    direccion;
    telefono;
    constructor (nombre, apellido, mail, tipo, codigo, empresa, dni, entregaDefault, telefono, calle, numero, provincia, localidad, codigoPostal){
        // Codigo lo deberia ir asignando autonumerico ??
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.tipo = tipo;
        this.empresa = empresa;
        this.hash = this.createHash();
        this.password = 1234;
        this.codigo = codigo;
        this.dni = dni;
        this.entregaDefault = entregaDefault;
        this.telefono = telefono;
        this.direccion = new direccion(calle, numero, provincia, localidad, codigoPostal);
    }

    createHash() {
        let origen = this.mail+this.tipo+this.nombre;     
        let hash = 0;
         
        if (origen.length == 0) return hash;
        for (let i = 0; i < origen.length; i++) {
            let  letra = origen.charCodeAt(i);
            hash = ((hash << 5) - hash) + letra;
            hash = hash & hash;
        }
        return hash;
    }   
}

class direccion{
    calle;
    numero;
    provincia;
    localidad;
    codPostal;
    constructor(calle, numero, provincia, localidad, cod){
        this.calle = calle;
        this.numero = numero;
        this.provincia = provincia;
        this.localidad  = localidad;
        this.codPostal = cod;
    }
}