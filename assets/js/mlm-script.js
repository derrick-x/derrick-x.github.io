window.onload = function() {
    loop();
}

function loop() {
    const canvas = document.getElementById("ff");
    const ctx = canvas.getContext("2d");
    drawFF(ctx);
    requestAnimationFrame(loop);
}

const LAYER_SIZE = [2, 4, 4, 2];
var neurons = [[Math.random(), Math.random()], [], [], []];
var weights = [[[], [], [], []], [[], [], [], []], [[], []]];
var biases = [[], [], []];
for (let i = 1; i < LAYER_SIZE.length; i++) {
    for (let j = 0; j < LAYER_SIZE[i]; j++) {
        for (let k = 0; k < LAYER_SIZE[i - 1]; k++) {
            weights[i - 1][j][k] = Math.random() * 0.2 - 0.1;
        }
        biases[i - 1][j] = Math.random() * 0.2 - 0.1;
    }
}

function drawFF(ctx) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, 500, 300);
    let products = [[], [], []];
    for (let i = 1; i < LAYER_SIZE.length; i++) {
        for (let j = 0; j < LAYER_SIZE[i]; j++) {
            neurons[i][j] = 0;
        }
    }
    ctx.lineWidth = 3;
    for (let i = 1; i < LAYER_SIZE.length; i++) {
        for (let j = 0; j < LAYER_SIZE[i]; j++) {
            for (let k = 0; k < LAYER_SIZE[i - 1]; k++) {
                if (weights[i - 1][j][k] > 0) {
                    let blue = 255 + Math.trunc(Math.pow(0.1, weights[i - 1][j][k]) * -127);
                    let red = 255 - blue;
                    let green = 255 - blue;
                    ctx.strokeStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
                }
                else {
                    let red = 255 + Math.trunc(Math.pow(0.1, weights[i - 1][j][k] * -1) * -127);
                    let green = 255 - red;
                    let blue = 255 - red;
                    ctx.strokeStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
                }
                ctx.beginPath();
                ctx.moveTo(100 + i * 100, 300 * (j + 1) / (LAYER_SIZE[i] + 1));
                ctx.lineTo(i * 100, 300 * (k + 1) / (LAYER_SIZE[i - 1] + 1));
                ctx.stroke();
            }
        }
    }
    for (let i = 0; i < LAYER_SIZE.length; i++) {
        for (let j = 0; j < LAYER_SIZE[i]; j++) {
            let bright = Math.tanh(neurons[i][j] * 2) * 255;
            ctx.fillStyle = "rgb(" + bright + ", " + bright + "," + bright + ")";
            ctx.beginPath();
            ctx.arc(100 + i * 100, 300 * (j + 1) / (LAYER_SIZE[i] + 1), 20, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(127, 127, 127)";
    ctx.beginPath();
    ctx.arc(100, 300 / (LAYER_SIZE[0] + 1), 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(100, 600 / (LAYER_SIZE[0] + 1), 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 5;
    for (let i = 1; i < LAYER_SIZE.length; i++) {
        for (let j = 0; j < LAYER_SIZE[i]; j++) {
            if (biases[i - 1][j] > 0) {
                let blue = 255 + Math.trunc(Math.pow(0.1, biases[i - 1][j]) * -127);
                let red = 255 - blue;
                let green = 255 - blue;
                ctx.strokeStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            }
            else {
                let red = 255 + Math.trunc(Math.pow(0.1, biases[i - 1][j] * -1) * -127);
                let green = 255 - red;
                let blue = 255 - red;
                ctx.strokeStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            }
            ctx.beginPath();
            ctx.arc(100 + i * 100, 300 * (j + 1) / (LAYER_SIZE[i] + 1), 20, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}

function drawBP() {
}

function drawTK() {

}