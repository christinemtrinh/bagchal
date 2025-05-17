// Determine where a tiger may move
// Input: Array of integers representing the game board, the index represents the location
//     0=unoccupied, 1=goat, 2=tiger
// Output: Dictionary of where each tiger may move
//     Example: For two tigers on the spots 1 and 5...
//     { 1: [2, 3, 4]
//       5: [4, 9]
//     }
let possibleMovesArray = [
    [true],
    [false, false, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false]
  ];

//finds spots with tigers
export function findTiger(inputBody, res) {
  // Check that inputs look good
  const inputBodyString = JSON.stringify(inputBody);
  const board = inputBody.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 'T') {
        possibleMovesArray[i][j] = false;
      }
      else
      {
        possibleMovesArray[i][j] = true;
      }
    }
  }
  console.log(possibleMovesArray);
  res.json({ possibleMoves: possibleMovesArray });
}

//finds spots with goats
export function findGoat(inputBody, res) {
    // Check that inputs look good
    const inputBodyString = JSON.stringify(inputBody);
    const board = inputBody.board;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 'G') {
          possibleMovesArray[i][j] = false;
        }
        else
        {
          possibleMovesArray[i][j] = true;
        }
      }
    }
    //TODO: Get Legal Moves for Goat for Phase 2
    // Pass data back to client to await player move
    console.log(possibleMovesArray);
    res.json({ possibleMoves: possibleMovesArray });
  }

export function getTigerLegalMoves(inputBody, res) {
    const board = inputBody.board;
    
}
// Determine if a goat has been captured, using the previous state
// Input: Array of integers representing the game board, the index is the location
// Output: Array of integers representing the game board, with the goat removed, if applicable
function isAnyGoatCaptured(board) {}


// Determine where a goat may move
// Input: Array of integers representing the game board, the index represents the location
//     0=unoccupied, 1=goat, 2=tiger
// Output: Dictionary of where each goat may move
// Step 3: Add you logic to handle the game



export function getGoatLegalMovesPhaseOne(inputBody, res) {
  // Check that inputs look good
  const inputBodyString = JSON.stringify(inputBody);

  const board = inputBody.board;

  //Gets Goat Legal Places To Move While in Phase One
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] != '') {
        possibleMovesArray[i][j] = true;
      }
      else
      {
        possibleMovesArray[i][j] = false;
      }
    }
  }
  console.log(possibleMovesArray);
  res.json({ possibleMoves: possibleMovesArray });
}

//Using output given by getGoatLegalMoves, Restrict movement to those spots and get user input to move tiger
//Input: Tiger to move, Spot to move
//Output: Final location, initial location
function moveGoat(board) {}

// Checks to see if tiger is cornered (No legal spots to move)
// Input: Tiger to check
// Output: True/False
function isTigerCornered(board) {}

// Checks to see if all three tigers are cornered
// Input: check legal moves for all three tiger, if all false / None
// Output: True/False
function isTigerWin(board) {}
