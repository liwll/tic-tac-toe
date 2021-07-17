const GameBoard = (() => {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const getBoard = () => board;
    const placeX = index => {
        board[index] = 1;
    };
    const placeO = index => {
        board[index] = 2;
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
        if (GameBoard.getBoard()[i] === 0) {
            GameBoard.placeX(i);
            console.log(GameBoard.getBoard());
            console.log(GameController.turn++);
            return true;
        }
    }
    const turnO = (i) => {
        if (GameBoard.getBoard()[i] === 0) {
            GameBoard.placeO(i);
            console.log(GameBoard.getBoard());
            console.log(GameController.turn++);
            return true;
        }
    }
    const checkWinner = () => {
        
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
    const board = document.querySelector('.board');
    const setup = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i;
            square.addEventListener('click', () => {
                if (GameController.turn % 2 === 0) {
                    if (GameController.turnX(i)) {
                        square.textContent = 'X';
                    }
                }
                else {
                    if (GameController.turnO(i)) {
                        square.textContent = 'O';
                    }
                }
            });
            board.appendChild(square);
        }
    }
    return {
        setup,
    };
})();

const gameController = GameController;
console.log(GameBoard.getBoard());
DisplayController.setup();