//Variable apunta al id myCanvas
var canvas = document.getElementById("myCanvas");
//getContext es un metodo para utilizar el renderizado de canvas para poder dibujar el juego
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var dx = 2;
var y = canvas.height-80;
var dy = -2;
var ballRadius = 10;
var correctorX = 14;
var correctorY = 3;
var paletaHeight = 40;
var paletaWidth = 45;
var paletaX = (canvas.width-paletaWidth)/2;
var pressDerecha = false;
var pressIzquierda = false;
var contadorRebotes = 0;
var img1 = new Image();
img1.src = "img/balon.png";
var img2 = new Image();
img2.src = "img/boca_abierta.png";
var img3 = new Image();
img3.src = "img/molesto.png";

//Esta funcion crea un bola  
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    //ctx.fillStyle = "#0095DD";
    ctx.drawImage(img1, x-ballRadius-correctorX, y-ballRadius-correctorY, 45, 25);
    //ctx.fill()
    ctx.closePath();
}

//Esta funcion dibuja la paleta

function drawPaleta(){
    ctx.beginPath();
    ctx.rect(paletaX, canvas.height-paletaHeight, paletaWidth, paletaHeight);
    //ctx.fillStyle = "#0095DD";
    ctx.drawImage(img2, paletaX-correctorX, canvas.height-paletaHeight-20, 70, 72);
    //ctx.fill();
    ctx.closePath();
}

function drawMolesto(){
    ctx.beginPath();
    ctx.drawImage(img3, paletaX-correctorX, canvas.height-paletaHeight-20, 70, 72);
    ctx.closePath();
}

function contadora(){
    document.getElementById("contador").innerHTML = contadorRebotes;
}

function draw() {
     //Borra el fotrograma anterior y posiciona la bola en el nuevo x, y.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaleta();
    contadora();
    
    //se va a ejecutar mientra se presione preesDerecha y paletaX sea menor que el width
    if(pressDerecha && paletaX < canvas.width-paletaWidth) {
        paletaX += 6;
    }
    //Se ejecuta mientras se presiona pressIzquierda y paseta sea menor a 0
    else if(pressIzquierda && paletaX > 0) {
        paletaX -= 6;
    }

    //-ballRadius se utiliza como medida de colicion para que la pelotra rebote al final del radio y ni en el centro de ella 
    //Validacion de colicion si x+dx es mayor que 480px y menor a 0 le cambia el signo a dx
    if(x + dx > canvas.width-ballRadius || x + dx-ballRadius < 0) {
        dx = -dx;
    }
    
    //Ejecuta una validacion de colicion si y+dy es mayor a 320px o menor a 0 le cambia el signo a dy
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (
        y + dy > canvas.height-paletaHeight-ballRadius){
        if(x > paletaX && x< paletaX + paletaWidth){
            dy = -dy;
            contadorRebotes ++;

        }
    else {
    
        alert("PUNTOS OBTENIDOS: "+contadorRebotes);
        y = canvas.height-80;
        document.location.reload();
            
            
        }
    }

    x += dx;
    y += dy;
}
//Escucha cuando se presiona cualquier tecla y ejecuta la funcion presionarTecla
document.addEventListener("keydown", presionarTecla, false);

function presionarTecla(e){
    if(e.keyCode == 39){
        pressDerecha = true;
    }
    else if(e.keyCode == 37){
        pressIzquierda = true;
    }
}

//Escucha cuando se suelta cualquier tecla y ejecuta la funcion soltarTecla
document.addEventListener("keyup", soltarTecla, false);

function soltarTecla(e){
    if(e.keyCode == 39){
        pressDerecha = false;
    }
    else if(e.keyCode == 37){
        pressIzquierda = false;
    }
}


//Ejecuta la funcion draw cada 10 milisegundos indefinidamente.
setInterval(draw, 10);