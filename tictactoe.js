class TicTacToe {
    constructor(element){
        this._element = element;
        this._gameOver = true;
    };

    startGame(player1, player2){
        if(!player1 || !player2){
            return;
        }

        this._grid = [
            [GridType.EMPTY, GridType.EMPTY, GridType.EMPTY],
            [GridType.EMPTY, GridType.EMPTY, GridType.EMPTY],
            [GridType.EMPTY, GridType.EMPTY, GridType.EMPTY],
        ];

        this._playerType = GridType.O;
        this._activePlayer = player1;
        this._passivePlayer = player2;

        this._gameOver = false;

        this._activePlayer.notify(this._playerType, this._grid, GameState.ONGOING);

        this.render();
    };

    selectCell(col, row){
        if(this._grid[col][row] == GridType.EMPTY && !this._gameOver){
            this._grid[col][row] = this._playerType;

            if(GameUtils.IsWinningMove(this._grid, this._playerType)){
                this._gameOver = true;

                this._activePlayer.notify(this._playerType, this._grid, GameState.WIN);
                this._passivePlayer.notify(this._playerType, this._grid, GameState.LOSE);
            } else if (GameUtils.AllValidMoves(this._grid).length == 0 ) {
                this._gameOver = true;

                this._activePlayer.notify(this._playerType, this._grid, GameState.DRAW);
                this._passivePlayer.notify(this._playerType, this._grid, GameState.DRAW);
            } else {
                this.togglePlayer();
                this._activePlayer.notify(this._playerType, this._grid, GameState.ONGOING);
            }

            this.render();
        }
    };

    togglePlayer(){
        if(this._playerType == GridType.O){
            this._playerType = GridType.X;
        } else {
            this._playerType = GridType.O;
        }

        // Swap players
        this._activePlayer = [this._passivePlayer, this._passivePlayer = this._activePlayer][0];
    };

    render(){
        let container = $('<table>');

        this._grid.map((grid, col) => {
            let tr = $('<tr>');
            
            grid.map((cell, row) => {
                let td = $('<td col="'+col+'" row="'+row+'">'+GameUtils.RenderGrid(cell)+'</td>');

                td.click(() => this.selectCell(col, row));

                tr.append(td);
            });

            container.append(tr);
        });
        
        this._element.html(container);
    };
};
