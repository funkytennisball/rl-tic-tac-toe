const GridType = {
    EMPTY: 0,
    O: 1,
    X: 2,
};

const GameState = {
    WIN: 0,
    LOSE: 1,
    DRAW: 2,
    ONGOING: 3,
};

class GameUtils{
    constructor(){
    };

    static IsWinningMove(board, player){
        let col=0, row=0, diag=0, rdiag=0;

        for(let i=0; i<3; i++){
            for(let j=0; j<3;j++){
                if(board[i][j] == player) row ++;
                if(board[j][i] == player) col ++;
            }

            if(board[i][i] == player) diag ++;
            if(board[i][2-i] == player) rdiag ++;

            if(row != 3) row = 0;
            if(col != 3) col = 0;
        }
        
        return (col == 3) || (row == 3) || (diag == 3) || (rdiag == 3);
    }

    static AllValidMoves(board){
        let moves = [];

        if(board){
            for(let i=0; i<3; i++){
                for(let j=0; j<3;j++){
                    if(board[i][j] == GridType.EMPTY) moves.push({row:j, col:i});
                }
            }
        }

        return moves;
    }

    static RenderGrid(gridType){
        switch(gridType){
            case GridType.EMPTY:
                return '';
                break;
            case GridType.O:
                return 'O';
                break;
            case GridType.X:
                return 'X';
                break;
        }
        return;
    }
}