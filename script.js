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

const GameController = (() => {
    let turn = 0;
    let isOver = true;
    const getIsOver = () => {
        return isOver;
    }
    const setIsOver = (newVal) => {
        isOver = newVal;
    }
    const setTurn = (newTurn) => {
        turn = newTurn;
    }
    const turnX = (i) => {
        if (isOver) return false;
        if (GameBoard.getBoard()[i] === 0) {
            GameBoard.placeX(i);
            console.log(GameBoard.getBoard());
            console.log(turn++);
            return true;
        }
    }
    const turnO = (i) => {
        if (isOver) return false;
        if (GameBoard.getBoard()[i] === 0) {
            GameBoard.placeO(i);
            console.log(GameBoard.getBoard());
            console.log(turn++);
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
                turn = 0;
                return true;
            }
        }
        //Check for winners by columns
        for (let i = 0; i <= 2; i++) {
            let columnSum = board[i] + board[i + 3] + board[i + 6];
            if (columnSum === 3 || columnSum === 15) {
                isOver = true;
                turn = 0;
                return true;
            }
        }

        //Check for winners by diagonals
        let diagonalSumA = board[0] + board[4] + board[8];
        let diagonalSumB = board[2] + board[4] + board[6];

        if (diagonalSumA === 3 || diagonalSumB === 3) {
            isOver = true;
            turn = 0;
            return true;
        }
        if (diagonalSumA === 15 || diagonalSumB === 15) {
            isOver = true;
            turn = 0;
            return true;
        }
    }
    const handleClick = (square, i) => {
        if (turn % 2 === 0) {
            if (turnX(i)) {
                square.textContent = 'X';
                if (checkWinner()) {
                    DisplayController.finishGame('X');
                }
            }
        }
        else {
            if (turnO(i)) {
                square.textContent = 'O';
                if (checkWinner()) {
                    DisplayController.finishGame('O');
                }
            }
        }
        if (turn === 9 && !checkWinner()) {
            DisplayController.finishGame('Draw');
            turn++;
            isOver = false;
        }
    }
    return {
        getIsOver,
        setIsOver, 
        setTurn, 
        handleClick,
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
                GameController.handleClick(square, i);
            });
            board.appendChild(square);
        }
        const playBtn = document.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            DisplayController.restart();
            playBtn.textContent = 'Restart';
        });
    }
    const finishGame = (winner) => {
        const statusPanel = document.querySelector('.status-panel');
        const winMessage = document.createElement('span');
        winMessage.classList.add('win-msg');
        winMessage.textContent = (winner === 'Draw') ? 'It\'s a draw ????' : `${winner} is the champion! ????`;
        statusPanel.appendChild(winMessage);
    };
    const restart = () => {
        GameController.setIsOver(false);
        GameController.setTurn(0);
        GameBoard.clearBoard();

        const gameSquares = document.querySelectorAll('.square');
        gameSquares.forEach((square) => {
            square.textContent = '';
        });
        const statusPanel = document.querySelector('.status-panel');
        statusPanel.innerHTML = '';
    }
    return {
        setup, 
        finishGame, 
        restart, 
    };
})();

DisplayController.setup();