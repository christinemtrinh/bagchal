// Determine where a tiger may move
// Input: Array of integers representing the game board, the index represents the location
//     0=unoccupied, 1=goat, 2=tiger
// Output: Dictionary of where each tiger may move
//     Example: For two tigers on the spots 1 and 5...
//     { 1: [2, 3, 4]
//       5: [4, 9]
//     }
function getTigerLegalMoves(board) {}             

//Using output given by getTigerLegalMoves, Restrict movement to those spots and get user input to move tiger
//Input: Tiger to move, Spot to move
//Output: Final location, initial location
function moveTiger(board) {}

// Determine if a goat has been captured, using the previous state
// Input: Array of integers representing the game board, the index is the location
// Output: Array of integers representing the game board, with the goat removed, if applicable
function isAnyGoatCaptured(board) {}

// Determine if there is not 15 goats that have been placed yet, place if not yet at 15
// Input: Location user pick to place goat, also checks if any existing goats or tiger at spot
// Output: Place Goat
function placeGoat(board) {}

// Determine where a goat may move
// Input: Array of integers representing the game board, the index represents the location
//     0=unoccupied, 1=goat, 2=tiger
// Output: Dictionary of where each goat may move
function getGoatLegalMoves(board) {}             

//Using output given by getGoatLegalMoves, Restrict movement to those spots and get user input to move tiger
//Input: Tiger to move, Spot to move
//Output: Final location, initial location
function moveGoat(board) {}

// Checks to see if tiger is cornered (No legal spots to move)
// Input: Tiger to check
// Output: True/False
function isTigerCornered(board){}

// Checks to see remaining goats = 0
// Input: Num of goats
// Output: True/False
function isTigerWin(board){}

// Checks to see if all three tigers are cornered
// Input: check legal moves for all three tiger, if all false / None
// Output: True/False
function isTigerWin(board){}