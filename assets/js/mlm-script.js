window.onload = function() {
    console.log("success!");
    const canvasFF = document.getElementById("ff");
    const ctxFF = canvasFF.getContext("2d");
    drawFeedForward(ctxFF);
}

function drawFeedForward(ctx) {
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(0, 0, 500, 300);
}

function drawBackpropagation() {
}

function drawTokenization() {

}