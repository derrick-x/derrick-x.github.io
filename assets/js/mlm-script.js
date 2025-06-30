window.onload = function() {
    console.log("success!");
    const canvasFF = document.getElementById("ff");
    const ctxFF = canvasFF.getContext("2d");
    drawFeedForward();
}

function drawFeedForward() {
    ctxFF.fillStyle = "rgb(255, 0, 0)";
    ctxFF.fillRect(0, 0, 500, 300);
}

function drawBackpropagation() {
}

function drawTokenization() {

}