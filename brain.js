// Only one brain :(
BRAIN_KEY = 'QLEARNING_BRAIN';
LEARNING_RATE = 0.8;
RETENTION_RATE = 0.6;

class Brain{
    constructor(){
        let store = localStorage.getItem(BRAIN_KEY);
        if(store){
            this._store = {};
            localStorage.setItem(BRAIN_KEY, this._store);
        } else {
            this._store = store;
        }
    }

    notify(piece, prevgrid, prevAction, curgrid, curAction, gameState){
        let prevState = Brain.ToID(piece, prevgrid);
        let curState = Brain.ToID(piece, curgrid);

        let reward = this.gameReward(gameState);

        this.update(prevState, prevAction, curState, curAction, reward);
    }

    update(prevState, prevAction, curState, curAction, reward){
        if(!(prevState in this._store)){
            this._store[prevState] = {};
        }

        if(!(prevAction in this._store[prevState])){
            this._store[prevState][prevAction] = 0;
        }
        
        this._store[prevState][prevAction] = (1-RETENTION_RATE) * this._store[prevState][prevAction] +
                                             (RETENTATION_RATE) * (reward + LEARNING_RATE * this._store[curState][curAction] );
    }

    gameReward(gameState){
        switch(gameState){
            case GameState.WIN:
                return 1.0;
                break;
            case GameState.LOSE:
                return -1.0;
                break;
            case GameState.DRAW:
                return 0.5;
                break;
        }

        return 0.0;
    }

    static ToID(piece, grid){
        let id = '';
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(piece == GridType.O){
                    id += grid[i][j];
                } else {
                    id += FlipGrid(grid[i][j]);
                }
            }
        }
        return id;
    }

    static FlipGrid(grid){
        if(grid == GridType.O){
            return GridType.X;
        } else {
            return GridType.O;
        }
    }
}