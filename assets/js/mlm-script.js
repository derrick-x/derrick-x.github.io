window.onload = function() {
    console.log("success!");
    const ctx = [document.getElementById("feed-forward").getContext("2d")];
}

function drawFeedForward(id) {
    ctx[id].fillStyle = "rgb(0, 0, 0)";
    ctx[id].fillRect(0, 0, 500, 300);
}

function drawBackpropagation(id) {
}

function drawTokenization(id) {

}