let tictactoe = new TicTacToe($('tictactoe'));

let brain = new Brain();

let ai = new AI(tictactoe);
let human = new Human(tictactoe)

let ai2 = new AI(tictactoe);
let human2 = new Human(tictactoe)

tictactoe.startGame(ai, ai2);
