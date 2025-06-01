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
//dictionary of node connections
let graphDict = 
{
  '[0 , 0]': [[1,1],[1,2],[1,3],[1,4]],
  '[1 , 0]': [[1,1],[2,0]],
  '[1 , 1]': [[0,0],[1,0],[1,2],[2,1]],
  '[1,2]': [[0,0], [1,1], [1,3],[2,2]],
  '[1,3]': [[0,0],[1,4],[1,2],[2,3]],
  '[1,4]': [[0,0],[1,3],[1,5],[2,4]],
  '[1,5]': [[1,4],[2,5]],
  '[2,0]': [[2,1],[3,0],[1,0]],
  '[2,1]': [[1,1],[2,0],[2,2],[3,1]],
  '[2,2]': [[1,2], [2,1], [2,3],[3,2]],
  '[2,3]': [[1,3],[2,4],[2,2],[3,3]],
  '[2,4]': [[1,4],[2,3],[2,5],[3,4]],
  '[2,5]': [[2,4],[3,5],[1,5]],
  '[3,0]': [[3,1],[2,0]],
  '[3,1]': [[2,1],[3,0],[3,2],[4,0]],
  '[3,2]': [[2,2], [3,1], [3,3],[4,1]],
  '[3,3]': [[2,3],[3,4],[3,2],[4,2]],
  '[3,4]': [[2,4],[3,3],[3,5],[4,3]],
  '[3,5]': [[3,4],[2,5]],
  '[4,0]': [[3,1],[4,1]],
  '[4,1]': [[4,0],[4,2],[3,2]],
  '[4,2]': [[4,1],[4,3],[3,3]],
  '[4,3]': [[3,4],[4,2]]
}
//dictionary of directional connection
let directionDict = {
  'vert1': [[1,0],[2,0],[3,0]],
  'vert2': [[0,0],[1,1],[2,1],[3,1],[4,0]],
  'vert3': [[0,0],[1,2],[2,2],[3,2],[4,1]],
  'vert4': [[0,0],[1,3],[2,3],[3,3],[4,2]],
  'vert5': [[0,0],[1,4],[2,4],[3,4],[4,3]],
  'vert6': [[1,5],[2,5],[3,5]],
  'hor1': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],
  'hor2': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],
  'hor3': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
  'hor4': [[4,0],[4,1],[4,2],[4,3]]
}

// checks for the valid nodes that a tiger can capture
export function checkCapture(tigerPos, board)
{
  let validIndex = []
  let goatIndex = []
  //look through directional dictionary to find tiger position
  for (let line in directionDict)
  {
      let value = directionDict[line]
    for (let i = 0; i < value.length; i++) {
      let [rowT, colT] = value[i]
      //when it finds the tiger position, it will start checking in the positions around it
      //to check if capturing is legal
      if (JSON.stringify(tigerPos) == JSON.stringify([rowT,colT])) 
      {
        let currentIndex = i
        //check if capture is legal in south/east direction
        if (currentIndex < value.length - 2) 
        { 
          let [rowG, colG] = value[currentIndex + 1]
          let [rowE, colE] = value[currentIndex + 2]
          if (board[rowG][colG] == "G" && board[rowE][colE] == "") 
          {
            validIndex.push([rowE, colE])
            goatIndex.push([rowG,colG])
          }
            
        }
        //check if capture is legal in north/west direction
        if (currentIndex > 1) 
        {
          let [rowG, colG] = value[currentIndex - 1]
          let [rowE, colE] = value[currentIndex - 2]
          if (board[rowG][colG] == "G" && board[rowE][colE] == "") 
          {
            validIndex.push([rowE, colE])
            goatIndex.push([rowG,colG])
          }
        }
      }
    }
  }
  return [validIndex,goatIndex]
}


export function bfs(index) {
  if(graphDict[index]) {
    return graphDict[index]
  }
}

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
    console.log(inputBody)
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
function isTigerWin(board) {
  
}
