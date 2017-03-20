class AI extends Player{
    constructor(tictactoe, brain){
        super(tictactoe);

        this._brain = brain;
    }

    notify(piece, grid, gameState){
        super.notify(piece, grid, gameState);

        let move = this._brain.notify(piece, this._lastMove, this._lastGrid, , gameState);

        if(gameState == GameState.ONGOING){
            this._tictactoe.selectCell(move.col, move.row);
        }

        this._lastAction = move;
        this._lastGrid = grid;
    }
}