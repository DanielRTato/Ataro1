let tablero;
let tableroWidth = 360  // dimensiones del tablero
let tableroHeight = 640; // dimensiones del tablero
let dibujo;

let meigaWidth = 84
let meigaHeight = 74;
let meigaX = tableroWidth/8
let meigaY = tableroHeight/2
let meigaImg

let meiga = {
    x : meigaX,
    y : meigaY,
    width : meigaWidth,
    height : meigaHeight,
}

window.onload = function() { 
    tablero = document.getElementById("tablero")
    tablero.width = tableroWidth
    tablero.height = tableroHeight
    dibujo = tablero.getContext("2d")

   

    meigaImg = new Image()
    meigaImg.src = "../assets/imagenes/FB/RanaFlappy.png"
    meigaImg.onload = function(){
        dibujo.drawImage(meigaImg ,meiga.x, meiga.y, meiga.width, meiga.height)
    }
    
}