class Player {
    constructor(tictactoe){
        this._tictactoe = tictactoe;
    }
    
    notify(piece, grid, gameState){
        this._piece = piece;
        this._grid = grid;
        this._gameState = gameState;
    }
}