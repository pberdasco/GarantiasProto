export const CLASE_INSUMO = ["Repuesto", "Accesorio", "Mano de Obra"]
const REPUESTOS = [{id: "RP0001", nombre: "RP0001 - Motor 1hp"}, {id: "RP0002", nombre: "RP0002 - Cadena"}, {id: "RP0003", nombre: "RP0003 - Juego tuercas"},
                   {id: "RP0004", nombre: "RP0004 - Llave encendido"}, {id: "AC0001", nombre: "AC0001 - Jarra"}, {id: "MO0001", nombre: "MO0001 - Tecnico Sr"}];

llenaRepuestosOptions();

export function getClaseInsumoId(text){
    return CLASE_INSUMO.indexOf(text);
}

export function pklToRepuesto(textPkl){
    const [id, nombre] = textPkl.split(" - ");
    return {id, nombre};
}

export function RepuestoToPkl(id){
    const index = REPUESTOS.findIndex((x) => x.id === id);
    return REPUESTOS[index]?.nombre
}

function llenaRepuestosOptions(){
    const opt = document.getElementById("insumos");
    REPUESTOS.forEach((x) => {
        const el =document.createElement("option");
        el.value = x.nombre;
        opt.appendChild(el);
    })
}

