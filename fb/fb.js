/*
pendientes
funcion que reinicie el juego cuando gameOver
arreglar hitboxes
*/

// variables de la ventana de juego
let tablero;
let tableroWidth = 1080;
let tableroHeight = 640;
let dibujo;

// variables de la meiga
let meigaWidth = 94;
let meigaHeight = 84;
let meigaX = tableroWidth / 6;
let meigaY = tableroHeight / 2;
let meigaImg;

let meiga = {
    x: meigaX,
    y: meigaY,
    width: meigaWidth,
    height: meigaHeight,
};

// variables de las tuberías
let tuberiasArray = [];
let tuberiaWidth = 64;
let tuberiaHeight = 510;
let tuberiaX = tableroWidth;
let tuberiaY = 0;

let tuberiaArribaImg;
let tuberiaAbajoImg;

// físicas
let velocidadX = -15;
let velocidadY = 0;
let gravedad = 0.4;

let gameOver = false;
let puntuacion = 0;

let jugadorActual = 1;
let puntuacionJugador1 = 0;
let puntuacionJugador2 = 0;

// sonidos
let volarSonido = new Audio("../assets/audio/FB/sfx_wing.wav");
let hitSonido = new Audio("../assets/audio/FB/sfx_hit.wav");
let fondoSonido = new Audio("../assets/audio/FB/Bg_BABA_YAGA.mp3");
fondoSonido.loop = true;

window.onload = function () {
    tablero = document.getElementById("tablero");
    tablero.width = tableroWidth;
    tablero.height = tableroHeight;
    dibujo = tablero.getContext("2d");

    tuberiaArribaImg = new Image();
    tuberiaArribaImg.src = "../assets/imagenes/FB/toppipe.png";

    tuberiaAbajoImg = new Image();
    tuberiaAbajoImg.src = "../assets/imagenes/FB/bottompipe.png";

    meigaImg = new Image();
    meigaImg.src = "../assets/imagenes/FB/Rana_sinBordeNegro.svg";
    meigaImg.onload = function () {
        dibujo.drawImage(meigaImg, meiga.x, meiga.y, meiga.width, meiga.height);
    };

    document.addEventListener("keydown", ranaVoladora);
    document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
    iniciarTurnoJugador();
};

function iniciarTurnoJugador() {
    gameOver = false;
    puntuacion = 0;
    meiga.y = meigaY;
    velocidadY = 0;
    tuberiasArray = [];
    fondoSonido.currentTime = 0;
    fondoSonido.play();
    requestAnimationFrame(update);
    setInterval(ponTuberia, 800);
}

function update() {
    if (gameOver) return;
    requestAnimationFrame(update);

    dibujo.clearRect(0, 0, tablero.width, tablero.height);

    velocidadY += gravedad;
    meiga.y = Math.max(meiga.y + velocidadY, 0);
    dibujo.drawImage(meigaImg, meiga.x, meiga.y, meiga.width, meiga.height);

    if (meiga.y > tablero.height) {
        finalizarTurno();
        return;
    }

    for (let i = 0; i < tuberiasArray.length; i++) {
        let tuberia = tuberiasArray[i];
        tuberia.x += velocidadX;
        dibujo.drawImage(tuberia.img, tuberia.x, tuberia.y, tuberia.width, tuberia.height);

        if (!tuberia.superado && meiga.x > tuberia.x + tuberia.width) {
            puntuacion += 0.5;
            tuberia.superado = true;
        }

        if (detectarColision(meiga, tuberia)) {
            hitSonido.play();
            finalizarTurno();
            return;
        }
    }

    dibujo.fillStyle = "white";
    dibujo.font = "45px sans-serif";
    dibujo.fillText("Puntos: " + puntuacion, 10, 50);
}

function ponTuberia() {
    if (gameOver) return;

    let alturaTuberias = tuberiaY - tuberiaHeight / 4 - Math.random() * (tuberiaHeight / 2);
    let espacioAbierto = tableroHeight / 3.5;

    let tuberiaArriba = {
        img: tuberiaArribaImg,
        x: tuberiaX,
        y: alturaTuberias,
        width: tuberiaWidth,
        height: tuberiaHeight,
        superado: false,
    };
    tuberiasArray.push(tuberiaArriba);

    let tuberiaAbajo = {
        img: tuberiaAbajoImg,
        x: tuberiaX,
        y: alturaTuberias + tuberiaHeight + espacioAbierto,
        width: tuberiaWidth,
        height: tuberiaHeight,
    };
    tuberiasArray.push(tuberiaAbajo);
}

function ranaVoladora(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW") {
        if (!gameOver) {
            if (fondoSonido.paused) {
                fondoSonido.play();
            }
            volarSonido.play();
            velocidadY = -6;
        }
    }
}

function detectarColision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function finalizarTurno() {
    gameOver = true;
    fondoSonido.pause();

    if (jugadorActual === 1) {
        puntuacionJugador1 = puntuacion;
        dibujo.fillStyle = "yellow";
        dibujo.font = "45px sans-serif";
        dibujo.fillText("Turno del Jugador 1 finalizado", 250, tableroHeight / 2);
        setTimeout(() => {
            jugadorActual = 2;
            reiniciarJuego();
        }, 3000);
    } else {
        puntuacionJugador2 = puntuacion;
        mostrarGanador();
    }
}

function reiniciarJuego() {
    meiga.x = meigaX;
    meiga.y = meigaY;
    velocidadY = 0;
    tuberiasArray = [];
    puntuacion = 0;
    gameOver = false;
    fondoSonido.currentTime = 0;
    fondoSonido.play();

    dibujo.clearRect(0, 0, tablero.width, tablero.height);
    iniciarTurnoJugador();
    document.getElementById("reiniciar").style.display = "none";
}

function mostrarGanador() {
    dibujo.clearRect(0, 0, tablero.width, tablero.height);
    dibujo.fillStyle = "white";
    dibujo.font = "45px sans-serif";
    dibujo.fillText("P1: " + puntuacionJugador1, 100, 100);
    dibujo.fillText("P2: " + puntuacionJugador2, 100, 160);

    let mensajeGanador = "";
    if (puntuacionJugador1 > puntuacionJugador2) {
        mensajeGanador = "¡Gana el Jugador 1!";
    } else if (puntuacionJugador2 > puntuacionJugador1) {
        mensajeGanador = "¡Gana el Jugador 2!";
    } else {
        mensajeGanador = "¡Empate!";
    }

    dibujo.fillStyle = "lime";
    dibujo.font = "60px sans-serif";
    dibujo.fillText(mensajeGanador, 300, 300);

    document.getElementById("reiniciar").style.display = "block";
}
