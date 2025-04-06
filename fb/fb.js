// variables de la ventana de juego
let tablero;
let tableroWidth = 360  // dimensiones del tablero
let tableroHeight = 640; // dimensiones del tablero
let dibujo;

// variables de la meiga
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

// variables de las tuberias
let tuberiasArray= []
let tuberiaWidth = 64 
let tuberiaHeight = 512
let tuberiaX = tableroWidth
let tuberiaY = 0

let tuberiaArribaImg
let tuberiaAbajoImg

// fisicas


window.onload = function() { 
    tablero = document.getElementById("tablero")
    tablero.width = tableroWidth
    tablero.height = tableroHeight
    dibujo = tablero.getContext("2d")

   tuberiaArribaImg = new Image()
   tuberiaArribaImg.src = "../assets/imagenes/FB/toppipe.png"

    tuberiaAbajoImg = new Image()
    tuberiaAbajoImg.src = "../assets/imagenes/FB/bottonpipe.png"

    meigaImg = new Image()
    meigaImg.src = "../assets/imagenes/FB/RanaFlappy.png"
    meigaImg.onload = function(){
        dibujo.drawImage(meigaImg ,meiga.x, meiga.y, meiga.width, meiga.height)
    }
    requestAnimationFrame(update)
    setInterval(ponTuberia, 1500) // cada 1,5 segundos
}

function update(){
    requestAnimationFrame(update)
    dibujo.clearRect(0,0, tablero.width, tablero.height)

    dibujo.drawImage(meigaImg ,meiga.x, meiga.y, meiga.width, meiga.height) //meiga

    for (let i = 0; i< tuberiasArray.length; i++){
        let tuberia = tuberiasArray[i]
        dibujo.drawImage(tuberia.x,tuberia.y, tuberia.width, tuberia.height  )
    }
}

function ponTuberia(){
    let tuberiaArriba = {
        img : tuberiaArribaImg,
        x : tuberiaX,
        y : tuberiaY,
        width : tuberiaWidth,
        height : tuberiaHeight,
        superado : false
    }
    tuberiasArray.push(tuberiaArriba)

}