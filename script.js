const GameBoard = (() => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        board,
        getBoard,
        placeX,
        placeO,
        clearBoard,
    };
})();

const DisplayController = (() => {
    const board = document.querySelector('.board');
    const setup = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            board.appendChild(square);
        }
    }
    const displayBoard = gameBoard => {
    }
    return {
        displayBoard,
    };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}