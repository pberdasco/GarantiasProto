import { cliente } from "./cliente.js";

//TODO: Arreglar esta clase que fue copiada directa del otro proyecto

export class  Clientes{
    lista = [];

    constructor(){
        this.lista.push(new cliente("Pablo", "Berdasco", "p.berdasco@gmail.com", "E", "I0001", "", "18.444.222", 0, "", "", "", "", "", "" ));
        this.lista.push(new cliente("Mariano","Cardozo","macardozo@visuar.com","E", "I0002", "", "19.000.000",0, "", "", "", "", "", ""));
        this.lista.push(new cliente("Juan", "Gonzalez","jg@hotmail.com","C","C0001", "", "25.888.345",0, "5544-8484", "Olazabal", "1244", "CABA", "CABA", "1431" ));
        this.lista.push(new cliente("Pedro", "Frave", "pedro.frave@fravega.com", "R", "R0001", "Fravega","16.777.000",2 , "7777-2299", "Valentín Gómez",  "2813", "CABA", "CABA", "1191"));
        this.lista.push(new cliente("Ignacio", "Perez", "perezig@fravega.com", "R", "R0001","Fravega","33.456.456", 2, "7777-2299", "Valentín Gómez",  "2813", "CABA", "CABA", "1191" ));
        this.lista.push(new cliente("Juan", "Martinez","martinezj@outlook.com","C","C0002", "", "40.009.111",3, "Quinquela Martín", "895", "CABA", "CABA", "1112" ));
        this.lista.push(new cliente("Pedro", "Benitez","pedrito@outlook.com","R","R0002", "", "44.022.133",0, "Av Belgrano", "777", "Buenos Aires", "Lomas de Zamora", "1612" ));
    }

    getClienteByCodigo(codigo){
        return this.lista.find((x) => x.codigo === codigo);
    }
}