const GameBoard = (() => {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const getBoard = () => board;
    const placeX = index => {
        board[index] = 1;
    };
    const placeO = index => {
        board[index] = 5;
    };
    const clearBoard = () => {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    };
    return {
        getBoard,
        placeX,
        placeO,
        clearBoard,
    };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}

const GameController = (() => {
    let turn = 0;
    let isOver = false;
    const turnX = (i) => {
        if (isOver) return false;
        if (GameBoard.getBoard()[i] === 0) {
            GameBoard.placeX(i);
            console.log(GameBoard.getBoard());
            console.log(GameController.turn++);
            return true;
        }
    }
    const turnO = (i) => {
        if (isOver) return false;
        if (GameBoard.getBoard()[i] === 0) {
            GameBoard.placeO(i);
            console.log(GameBoard.getBoard());
            console.log(GameController.turn++);
            return true;
        }
    }
    const checkWinner = () => {
        const board = GameBoard.getBoard();
        //Check for winners by rows
        for (let i = 0; i <= 6; i += 3) {
            let rowSum = board[i] + board[i + 1] + board[i + 2];
            if (rowSum === 3 || rowSum === 15) {
                isOver = true;
                return true;
            }
        }
        //Check for winners by columns
        for (let i = 0; i <= 2; i++) {
            let columnSum = board[i] + board[i + 3] + board[i + 6];
            if (columnSum === 3 || columnSum === 15) {
                isOver = true;
                return true;
            }
        }

        //Check for winners by diagonals
        let diagonalSumA = board[0] + board[4] + board[8];
        let diagonalSumB = board[2] + board[4] + board[6];

        if (diagonalSumA === 3 || diagonalSumB === 3) {
            isOver = true;
            return true;
        }
        if (diagonalSumA === 15 || diagonalSumB === 15) {
            isOver = true;
            return true;
        }
    }
    return {
        turn, 
        turnX, 
        turnO, 
        isOver, 
        checkWinner,
    }
})();

const DisplayController = (() => {
    const setup = () => {
        const board = document.querySelector('.board');
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i;
            square.addEventListener('click', () => {
                if (GameController.turn % 2 === 0) {
                    if (GameController.turnX(i)) {
                        square.textContent = 'X';
                        if (GameController.checkWinner()) {
                            finishGame('X');
                        }
                    }
                }
                else {
                    if (GameController.turnO(i)) {
                        square.textContent = 'O';
                        if (GameController.checkWinner()) {
                            finishGame('O');
                        }
                    }
                }
                if (GameController.turn === 9 && !GameController.checkWinner()) {
                    finishGame('Draw');
                    GameController.turn++;
                    GameController.isOver = true;
                }
            });
            board.appendChild(square);
        }
    }
    const finishGame = (winner) => {
        const statusPanel = document.querySelector('.status-panel');
        const winMessage = document.createElement('span');
        winMessage.textContent = (winner === 'Draw') ? 'It\'s a draw 😒' : `${winner} is the champion! 👑`;
        statusPanel.appendChild(winMessage);
    };
    return {
        setup,
    };
})();

DisplayController.setup();