export function padCeros(number, places){
    return String(number).padStart(places, "0");
};

export function todayFormated(){
    const date = new Date();
    return dateFormated(date);
}

export function dateFormated(date){
    return `${date.getFullYear()}-${padCeros(date.getMonth() + 1, 2)}-${padCeros(date.getDate(), 2)}`;
}
    
    