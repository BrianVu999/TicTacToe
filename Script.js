/*
* Tic Tac Toe scripts, January 2017
* Version 2
* Nam Vu
*/
// TODO document this
// This code is based on Basic Approach to DOM Manipulation (in lesson 2 DOM) to get document
var board = document.getElementsByTagName("td");

// assuming we index the 9 tic tac toe cells from left to right, top to
// bottom, as 0-8, these would be all of the winning combinations:
var winSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// X always gets to go first
var player = "X";

// keep track of how many cells are empty at any time
var empty = 9;

// keep track of game status - false if still playing
var gameOver = false;

var scoreX = 0;// displays score
var scoreO = 0;

/* Function resetGame() is called when user clicks on the "game reset" button
 1. sets content of all 9 cells to nothing
 2. sets the starting player (this version, X always starts the game)
 3. updates the message to the current player
 4. resets the number of empty cells to 9
 5. sets the game over flag to false to indicate that the game is in progress
 */
function resetGame() {
    document.getElementById("scoreX").style.border = "none";
    document.getElementById("scoreO").style.border = "none";

    currentPlayer(true);
    // TODO: document this code from class
    // "for" statement is based on Control Structures (in Lesson 2 DOM) to create a loop
    // innerHTML is based in InnerHTML field in lesson 2 DOM to change the content in that tag
    for (i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }

    // TODO reset player back to X and update it on the page
    document.getElementById("player").innerHTML = "X";//Change current player display to X
    player = "X";//Change next move to X move

    // TODO reset gameOver and # of empty cells
    gameOver = false;//Reset gameOver back to false;
    empty = 9; //Reset number of empty cells back to 9
}

/* Function cellClicked() is called
 when the event listeners for the "td" cells fire which occurs
 when the user clicks on one of the nine cells of the board
 1. decreases # of empty cells by 1
 2. sets the content of the clicked cell to the current player's mark
 3. checks whether or not there is a winner
 4. flips (changes) the current player
 5. updates the message to the current player
 */
function currentPlayer(display) {//display current player, it will disappear if game is over.
    if (display)
        document.getElementById("currentPlayer").style.display = "inline";
    else
        document.getElementById("currentPlayer").style.display = "none";
}
function cellClicked(cell) {
    // TODO: 1-5 should occur only when the selected cell is empty and the game is 
    // still in progress!
    //Condition statement to check game progress by object gameOver and empty cell
    if (gameOver == false && cell.innerHTML != "X" && cell.innerHTML != "O") {
        empty--;// TODO: decrease # of empty cells by 1
        // TODO: document this code from class
        // innerHTML is based in InnerHTML field in lesson 2 DOM to change the content in that tag
        // checkFunction is based in JavaScript Functions in lesson 2 DOM to call a function.
        // === and ? are based on Boolean Expressions in lession 1 to return true or false

        cell.innerHTML = player;
        checkWin();
        player = (player === "X") ? "O" : "X";
        document.getElementById("player").innerHTML = player;
    }
    else {
        alert("The chosen cell is not available");//alert user not to choose unavailable cells
    }
}

/* Function checkWin() is called to check all winning combinations and display results
 */
function checkWin() {

    // TODO: document all of the code from class
    // loop and condition Control Structures in lesson 2 DOM.
    for (i = 0; i < winSets.length; i++) {
        if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML
            && board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML
            && board[winSets[i][0]].innerHTML != "")
        //condition to check the winning set
        {

            gameOver = true;// Ending game
            document.getElementById("winner").innerHTML = player + " Wins!"; // Display winner
            displayWin(true);//Display notification

            if (player == "X") {
                document.getElementById("scoreX").innerHTML = ++scoreX;
                document.getElementById("scoreX").style.border = "2px solid red";
            }
            else {
                document.getElementById("scoreO").innerHTML = ++scoreO;
                document.getElementById("scoreO").style.border = "2px solid red";
            }

            currentPlayer(false);

            break;// break the loop

            // TODO: replace console.log("We have a winner!") with:
            //  - set gameOver variable: game is now over  
            //  - display "X Wins!" or "O Wins!" in the winner H3
            //  - call displayWin(true) function
            //  - break out of this loop: no point in continuing
        }
    }
    if (empty == 0) {//Check empty cells
        gameOver = true;
        document.getElementById("winner").innerHTML = "No one wins! :(";//display draw result
        currentPlayer(false);
        displayWin(true);
    }
    // TODO: if there are no empty cells left and game is not yet over,
    //       it means that there is no winner for this game
    // - set gameOver variable: game is now over  
    // - display "No one wins! :(" in the winner H3
    // - call displayWin(true) function

}

/* Enhancements you can try:
- highlight (change background colour) of the cell that was just clicked to indicate that it was the last move; make sure it goes back to the regular background when the next user clicks
- make the starting player random
- keep track of statistics (how many times each player wins)
- hide the "Player X Go!" on startup; show it only while game is playing
- when a winner is determined, the player information still swaps: would be nice if it didn't (I would
automatically hide those things before the game starts and when it ends (Week 3))
- change the font colour of the winning combination (don't forget to change it back when the game is reset)
*/

document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("message").addEventListener("click", function () {
    displayWin(false);
});
for (i = 0; i < board.length; i++) {
    document.getElementsByTagName("td")[i].addEventListener("click", function () {
        cellClicked(this);
    });
}
// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and 
// displayWin(false) hides)
function displayWin(show) {
    if (show) {
        document.getElementById("message").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("message").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}

// ===============================================================