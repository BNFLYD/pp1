const selector = (button, display) => {
    switch (button.innerHTML) {
    
        case `C`:
            limpiar(display);
            break;
                
        case `←`:
            borrar(display);
            break;
    
        case `=`:
            calcular(display);
            break;

        default:
            actualizar(display, button);
            break;
    }
}
const calcular = (display) =>{
    for (let pos = 0; pos < display.innerHTML.length; pos++) {
        aux = display.innerHTML[pos];
        switch (aux) {
        
            case  `×`:
            calc += `*`;
            break;
        
            case `÷`:
            calc += `/`;
            break;
        
            default:
            calc += aux;
            break;
        }
    }
    aux = eval(calc);
    calc = [];
    calc += aux;
    display.innerHTML = [];
    display.innerHTML += calc;
    calc = [];
}
const actualizar = (display, button) =>{
    display.innerHTML += button.innerHTML;
}
const limpiar = (display) =>{
    display.innerHTML = [];
}
const borrar = (display) =>{
    let mod = (display.innerHTML.length-1);
    aux = display.innerHTML.slice(0, mod);
    display.innerHTML = aux;
}

let calc = [];
let aux = [];

window.addEventListener(`load`, ()=> {
    const display = document.querySelector(`.pantalla`);
    // const display = document.getElementsByClassName(`display`);
    const keypad = document.getElementsByClassName(`boton`);
    const karr = Array.from(keypad);
    karr.forEach( (button) =>{
        button.addEventListener(`click`, () => {
            selector(button, display);
        })
    })  
});