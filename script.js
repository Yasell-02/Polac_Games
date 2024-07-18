let board;
let currentPlayer;
let gameMode;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

window.onload = function() {
    gameMode = localStorage.getItem('gameMode');
    resetGame();
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.innerText = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (!board[index]) {
        board[index] = currentPlayer;
        e.target.classList.add(currentPlayer);
        e.target.innerText = currentPlayer;

        if (checkWin(currentPlayer)) {
            showResult(`${currentPlayer} HA GANADO`);
            return;
        } else if (board.every(cell => cell)) {
            showResult('¡ES UN EMPATE!');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameMode === 'single' && currentPlayer === 'O') {
            makeAiMove();
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function makeAiMove() {
    const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.click();
}

function showResult(message) {
    const popup = document.getElementById('result-popup');
    const resultMessage = document.getElementById('result-message');
    resultMessage.innerText = message;
    popup.style.display = 'flex';
}

function closePopup() {
    document.getElementById('result-popup').style.display = 'none';
    resetGame();
}

function returnToMenu() {
    window.location.href = 'index.html';
}
