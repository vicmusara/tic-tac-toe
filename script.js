const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Function to check for a win
const checkWin = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
};

// Function to check for a tie
const checkTie = () => {
    return gameBoard.every(cell => cell !== '');
};

// Function to update status message
const updateStatus = () => {
    if (!gameOver) {
        status.textContent = `Player ${currentPlayer}'s turn`;
    } else if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
    } else {
        status.textContent = 'It\'s a tie!';
    }
};

// Function to handle cell click
const handleCellClick = (index) => {
    if (!gameOver && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (checkWin() || checkTie()) {
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        updateStatus();
    }
};

// Function to reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    updateStatus();
};

// Event listener for cell clicks
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initial status update
updateStatus();
