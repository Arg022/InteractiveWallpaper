// Seleziona il canvas e il contesto 2D 
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Imposta le dimensioni della griglia
const pixelSize = 20;
const gridWidth = 32;
const gridHeight = 18;

// Calcola la larghezza e l'altezza del canvas
canvas.width = gridWidth * pixelSize;
canvas.height = gridHeight * pixelSize;

// Variabile per tenere traccia se il mouse è premuto
let isDrawing = false;

// Colore di default (nero)
let currentColor = "#000000";

// Stack per memorizzare gli stati del canvas
let canvasHistory = [];

// Funzione per disegnare un pixel
function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

// Disegna la griglia iniziale (sfondo bianco)
function drawGrid() {
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            drawPixel(x, y, "#FFFFFF"); // Colore di sfondo bianco
        }
    }
}

// Funzione per salvare lo stato del canvas
function saveState() {
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Aggiungi un evento click al canvas per disegnare un pixel
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);

    // Salva lo stato prima di disegnare
    saveState(); 
    // Disegna il pixel nella posizione cliccata con il colore corrente
    drawPixel(x, y, currentColor);
});

// Aggiungi un evento mousedown per iniziare il disegno
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);
    
    // Salva lo stato prima di iniziare a disegnare
    saveState(); 
    drawPixel(x, y, currentColor); // Disegna subito quando il mouse è premuto
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

// Funzione per impostare un nuovo colore
function setColor(newColor) {
    currentColor = newColor;
}

function drawAtMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);
    drawPixel(x, y, currentColor);
}

// Funzione per salvare il disegno come immagine
function saveDrawing() {
    const link = document.createElement('a');
    link.download = 'pixelart.png'; // Nome del file da salvare
    link.href = canvas.toDataURL(); // Converte il canvas in un URL immagine
    link.click(); // Simula il click per il download
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
// Annulla l'ultimo "disegno"
document.getElementById('undoBtn').addEventListener('click', undoLastChange);
