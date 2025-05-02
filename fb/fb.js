/*
pendientes
funcion que reinicie el juego cuando gameOver
arrelgar hitboxesuna
*/

// variables de la ventana de juego
let tablero;
let tableroWidth = 1080  // dimensiones del tablero 720 o 360
let tableroHeight = 640; // dimensiones del tablero
let dibujo;
 
// variables de la meiga
let meigaWidth = 94
let meigaHeight = 84;
let meigaX = tableroWidth /6//8
let meigaY = tableroHeight/2 //2
let meigaImg

let meiga = {
    x : meigaX,
    y : meigaY,
    width : meigaWidth,
    height : meigaHeight,
}

// variables de las tuberias
let tuberiasArray= []
let tuberiaWidth = 64 //64 
let tuberiaHeight = 510 //512
let tuberiaX = tableroWidth
let tuberiaY = 0

let tuberiaArribaImg
let tuberiaAbajoImg

// fisicas
let velocidadX = -15
let velocidadY = 0 // meiga velociadad de vuelo
let gravedad = 0.4

let gameOver = false
let puntuacion = 0

window.onload = function() { 
    tablero = document.getElementById("tablero")
    tablero.width = tableroWidth
    tablero.height = tableroHeight
    dibujo = tablero.getContext("2d")

   tuberiaArribaImg = new Image()
   tuberiaArribaImg.src = "../assets/imagenes/FB/toppipe.png "

    tuberiaAbajoImg = new Image()
    tuberiaAbajoImg.src = "../assets/imagenes/FB/bottompipe.png"

    meigaImg = new Image()
    meigaImg.src = "../assets/imagenes/FB/Rana_sinBordeNegro.svg"
    meigaImg.onload = function(){
        dibujo.drawImage(meigaImg ,meiga.x, meiga.y, meiga.width, meiga.height)
    }
    requestAnimationFrame(update)
    setInterval(ponTuberia, 800) // cada 1,5 segundos
    document.addEventListener("keydown", ranaVoladora)
}



function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return 
    }
    dibujo.clearRect(0, 0, tablero.width, tablero.height);
  
    velocidadY += gravedad
   // meiga.y += velocidadY
    meiga.y = Math.max(meiga.y + velocidadY, 0  );
    dibujo.drawImage(meigaImg, meiga.x, meiga.y, meiga.width, meiga.height); // meiga

    if (meiga.y > tablero.height){
        gameOver = true
    }

    // tuberia avanza izquierda
    for (let i = 0; i < tuberiasArray.length; i++) {
        let tuberia = tuberiasArray[i];
        tuberia.x += velocidadX; 
        dibujo.drawImage(tuberia.img, tuberia.x, tuberia.y, tuberia.width, tuberia.height);

        if (!tuberia.superado && meiga.x > tuberia.x + tuberia.width){
            puntuacion += 0.5
            tuberia.superado = true
        }

        if (detectarColision(meiga, tuberia)) {
            gameOver = true
        }
    }
    // PUntuacion
    dibujo.fillStyle = "white"
    dibujo.font = "45px sans-serif"
    dibujo.fillText (puntuacion,5,45)

    if(gameOver) {
        dibujo.fillText("GAME OVER", 5 , 90);
    }

}

function ponTuberia(){

    let alturaTuberias = tuberiaY - tuberiaHeight/4 - Math.random()*(tuberiaHeight/2)
    let espacioAbierto = tableroHeight/3.5 //4.5 original

    // tuberias de arriba
    let tuberiaArriba = {
        img : tuberiaArribaImg,
        x : tuberiaX,
        y : alturaTuberias,
        width : tuberiaWidth,
        height : tuberiaHeight,
        superado : false
    }
    tuberiasArray.push(tuberiaArriba)

    // Tubería de abajo
    let tuberiaAbajo = {
        img: tuberiaAbajoImg,
        x: tuberiaX,
        y: alturaTuberias + tuberiaHeight + espacioAbierto,
        width: tuberiaWidth,
        height: tuberiaHeight,
        
    }
    tuberiasArray.push(tuberiaAbajo)
}

function reiniciarJuego() {
    // Reiniciar variables del juego
    meiga.x = meigaX;
    meiga.y = meigaY;
    velocidadY = 0;
    tuberiasArray = [];
    puntuacion = 0;
    gameOver = false;
}

function ranaVoladora(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW") {
        if (gameOver) {
            reiniciarJuego(); // Reinicia el juego si está en estado gameOver
        } else {
            velocidadY = -6; // Movimiento normal
        }
    }
}

function detectarColision (a,b){
    return  a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
    a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}