// Determine where a tiger may move
// Input: Array of integers representing the game board, the index represents the location
//     0=unoccupied, 1=goat, 2=tiger
// Output: Dictionary of where each tiger may move
//     Example: For two tigers on the spots 1 and 5...
//     { 1: [2, 3, 4]
//       5: [4, 9]
//     }

let currentBoard = [
  ["T"],
  ["", "", "T", "T", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", ""],
]

let possibleMovesArray = [
  [true],
  [false, false, true, true, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false],
];

let graphDict = {
  "[0,0]": [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
  ],
  "[1,0]": [
    [1, 1],
    [2, 0],
  ],
  "[1,1]": [
    [0, 0],
    [1, 0],
    [1, 2],
    [2, 1],
  ],
  "[1,2]": [
    [0, 0],
    [1, 1],
    [1, 3],
    [2, 2],
    [3,2],
  ],
  "[1,3]": [
    [0, 0],
    [1, 4],
    [1, 2],
    [2, 3],
  ],
  "[1,4]": [
    [0, 0],
    [1, 3],
    [1, 5],
    [2, 4],
  ],
  "[1,5]": [
    [1, 4],
    [2, 5],
  ],
  "[2,0]": [
    [2, 1],
    [3, 0],
    [1, 0],
  ],
  "[2,1]": [
    [1, 1],
    [2, 0],
    [2, 2],
    [3, 1],
  ],
  "[2,2]": [
    [1, 2],
    [2, 1],
    [2, 3],
    [3, 2],
  ],
  "[2,3]": [
    [1, 3],
    [2, 4],
    [2, 2],
    [3, 3],
  ],
  "[2,4]": [
    [1, 4],
    [2, 3],
    [2, 5],
    [3, 4],
  ],
  "[2,5]": [
    [2, 4],
    [3, 5],
    [1, 5],
  ],
  "[3,0]": [
    [3, 1],
    [2, 0],
  ],
  "[3,1]": [
    [2, 1],
    [3, 0],
    [3, 2],
    [4, 0],
  ],
  "[3,2]": [
    [2, 2],
    [3, 1],
    [3, 3],
    [4, 1],
  ],
  "[3,3]": [
    [2, 3],
    [3, 4],
    [3, 2],
    [4, 2],
  ],
  "[3,4]": [
    [2, 4],
    [3, 3],
    [3, 5],
    [4, 3],
  ],
  "[3,5]": [
    [3, 4],
    [2, 5],
  ],
  "[4,0]": [
    [3, 1],
    [4, 1],
  ],
  "[4,1]": [
    [4, 0],
    [4, 2],
    [3, 2],
  ],
  "[4,2]": [
    [4, 1],
    [4, 3],
    [3, 3],
  ],
  "[4,3]": [
    [3, 4],
    [4, 2],
  ],
};

export function bfs(index) {
  if (graphDict[index]) {
    return graphDict[index];
  }
}

//finds spots with tigers
export function findTiger(inputBody, res) {
  // Check that inputs look good
  const inputBodyString = JSON.stringify(inputBody);
  const board = inputBody.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "T") {
        possibleMovesArray[i][j] = false;
      } else {
        possibleMovesArray[i][j] = true;
      }
    }
  }
  res.json({ possibleMoves: possibleMovesArray });
}

//finds spots with goats
export function findGoat(inputBody, res) {
  // Check that inputs look good
  const inputBodyString = JSON.stringify(inputBody);
  const board = inputBody.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "G") {
        possibleMovesArray[i][j] = false;
      } else {
        possibleMovesArray[i][j] = true;
      }
    }
  }
  //TODO: Get Legal Moves for Goat for Phase 2
  // Pass data back to client to await player move
  res.json({ possibleMoves: possibleMovesArray });
}

export function getTigerLegalMoves(inputBody, res) {
  const board = inputBody.board;
  const moves = bfs(JSON.stringify(inputBody.index));
  let moveArrayCopy = [
    [true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true]
  ];
  let goatsCaptured = []
  moveArrayCopy[inputBody.index[0]][inputBody.index[1]] = false
  for (let i = 0; i < moves.length; i++) {

    if (board[moves[i][0]][moves[i][1]] == "G") {
      //add capture logic
      moveArrayCopy[moves[i][0]][moves[i][1]] = true;


    } else if (board[moves[i][0]][moves[i][1]] == "") {
      moveArrayCopy[moves[i][0]][moves[i][1]] = false;
    } else {
      moveArrayCopy[moves[i][0]][moves[i][1]] = true;
    }
  }
  res.json({ possibleMoves: moveArrayCopy, capturedPiece: goatsCaptured});
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

//Using output given by getGoatLegalMoves, Restrict movement to those spots and get user input to move tiger
//Input: Tiger to move, Spot to move
//Output: Final location, initial location
export function placeGoat(inputBody, res) {
  let boardCopy = inputBody.board
  boardCopy[inputBody.index[0]][inputBody.index[1]] = "G"
  currentBoard = boardCopy
  res.json({ board: boardCopy })
}

export function moveTiger(inputBody, res) {
  let boardCopy = inputBody.board
  let initialPos = inputBody.initialIndex
  let finalPos = inputBody.finalIndex
  let updatedBoard = boardCopy.map((rowMap, rowIndexMap) => {
    // Check if we are at T0
    if (initialPos[0] === finalPos[0] && initialPos[0] === rowIndexMap) {
      if (initialPos[1] > finalPos[1]) {
        return [
          ...rowMap.slice(0, finalPos[1]),
          "T",
          ...rowMap.slice(finalPos[1] + 1, initialPos[1]),
          "",
          ...rowMap.slice(initialPos[1] + 1, rowMap.length),
        ];
      } else {
        return [
          ...rowMap.slice(0, initialPos[1]),
          "",
          ...rowMap.slice(initialPos[1] + 1, finalPos[1]),
          "T",
          ...rowMap.slice(finalPos[1] + 1, rowMap.length),
        ];
      }
    } else if (rowIndexMap === finalPos[0]) {
      // move Tiger to new position
      return [
        ...rowMap.slice(0, finalPos[1]),
        "T",
        ...rowMap.slice(finalPos[1] + 1, rowMap.length),
      ];
    } else if (rowIndexMap === initialPos[0]) {
      // New board should clear this spot
      return [
        ...rowMap.slice(0, initialPos[1]),
        "",
        ...rowMap.slice(initialPos[1] + 1, rowMap.length),
      ];
      // clear the old Tiger position
      // Check if we are at T1
    } else {
      return rowMap; // leave the rest unchanged
    }
  });
  currentBoard = updatedBoard
  console.log(updatedBoard)
  res.json({ board: updatedBoard })
}

export function moveGoat(inputBody, res) {
  let boardCopy = inputBody.board
  let initialPos = inputBody.initialIndex
  let finalPos = inputBody.finalIndex
  let updatedBoard = boardCopy.map((rowMap, rowIndexMap) => {
    // Check if we are at T0
    if (initialPos[0] === finalPos[0] && initialPos[0] === rowIndexMap) {
      if (initialPos[1] > finalPos[1]) {
        return [
          ...rowMap.slice(0, finalPos[1]),
          "G",
          ...rowMap.slice(finalPos[1] + 1, initialPos[1]),
          "",
          ...rowMap.slice(initialPos[1] + 1, rowMap.length),
        ];
      } else {
        return [
          ...rowMap.slice(0, initialPos[1]),
          "",
          ...rowMap.slice(initialPos[1] + 1, finalPos[1]),
          "G",
          ...rowMap.slice(finalPos[1] + 1, rowMap.length),
        ];
      }
    } else if (rowIndexMap === finalPos[0]) {
      // move Tiger to new position
      return [
        ...rowMap.slice(0, finalPos[1]),
        "G",
        ...rowMap.slice(finalPos[1] + 1, rowMap.length),
      ];
    } else if (rowIndexMap === initialPos[0]) {
      // New board should clear this spot
      return [
        ...rowMap.slice(0, initialPos[1]),
        "",
        ...rowMap.slice(initialPos[1] + 1, rowMap.length),
      ];
      // clear the old Tiger position
      // Check if we are at T1
    } else {
      return rowMap; // leave the rest unchanged
    }
  });
  currentBoard = updatedBoard
  console.log(updatedBoard)
  res.json({ board: updatedBoard })
}

export function getGoatLegalMovesPhaseOne(inputBody, res) {
  // Check that inputs look good
  const board = inputBody.board;

  //Gets Goat Legal Places To Move While in Phase One
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] != "") {
        possibleMovesArray[i][j] = true;
      } else {
        possibleMovesArray[i][j] = false;
      }
    }
  }
  res.json({ possibleMoves: possibleMovesArray });
}

export function getGoatLegalMovesPhaseTwo(inputBody, res) {
  const board = inputBody.board;
  const moves = bfs(JSON.stringify(inputBody.index));
  let moveArrayCopy = [
    [true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true]
  ];
  moveArrayCopy[inputBody.index[0]][inputBody.index[1]] = false
  for (let i = 0; i < moves.length; i++) {
    //maybe add corner tiger check?
    if (board[moves[i][0]][moves[i][1]] == "T") {
      moveArrayCopy[moves[i][0]][moves[i][1]] = true;
    } else if (board[moves[i][0]][moves[i][1]] == "") {
      moveArrayCopy[moves[i][0]][moves[i][1]] = false;
    } else {
      moveArrayCopy[moves[i][0]][moves[i][1]] = true;
    }
  }
  res.json({ possibleMoves: moveArrayCopy });
}


// Checks to see if tiger is cornered (No legal spots to move)
// Input: Tiger to check
// Output: True/False
function isTigerCornered(board) {}

// Checks to see if all three tigers are cornered
// Input: check legal moves for all three tiger, if all false / None
// Output: True/False
function isTigerWin(board) {}
