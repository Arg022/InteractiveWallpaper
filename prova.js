
// Aggiungi un evento mousedown per iniziare il disegno
canvas.addEventListener("mousedown", (e) => {
    saveState(); // Salva lo stato prima di disegnare
    isDrawing = true;
    drawAtMousePosition(e); // Disegna subito quando il mouse è premuto
});

// Aggiungi un evento mousemove per disegnare mentre il mouse si muove
canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        drawAtMousePosition(e); // Disegna solo se il mouse è premuto
    }
});

// Aggiungi un evento mouseup per smettere di disegnare quando si rilascia il mouse
canvas.addEventListener("mouseup", () => {
    isDrawing = false; // Ferma il disegno quando il mouse viene rilasciato
});

// Aggiungi un evento mouseleave per smettere di disegnare quando il mouse esce dal canvas
canvas.addEventListener("mouseleave", () => {
    isDrawing = false; // Ferma il disegno se il mouse esce dal canvas
});

// Funzione per ottenere la posizione del mouse e disegnare
function drawAtMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);
    drawPixel(x, y, currentColor);
}

// Salva lo stato corrente del canvas
function saveState() {
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Funzione per annullare l'ultimo cambiamento
function undoLastChange() {
    if (canvasHistory.length > 0) {
        const lastState = canvasHistory.pop(); // Rimuove l'ultimo stato salvato
        ctx.putImageData(lastState, 0, 0);     // Ripristina il canvas allo stato precedente
    }
}

// Disegna la griglia iniziale
drawGrid();

// Aggiungi un pulsante per annullare
document.getElementById('undoBtn').addEventListener('click', undoLastChange);