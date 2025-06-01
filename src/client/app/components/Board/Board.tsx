"use client";
import { useState, useEffect } from "react";
import Spot from "./Spot/Spot";
import { GameState } from "../../types/types";
import { piece } from "../../types/types";
import httpPostRequest from "../../utilities/httpPostRequest";
import "./board.css";
import next from "next";

export default function Board(props: any) {
  const [spots, setSpots] = useState([
    ["T"],
    ["", "", "T", "T", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", ""],
  ]); //State of currenet game board
  const [disabledSpots, setDisabledSpots] = useState([
    [true],
    [false, false, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false],
  ]);
  const [goatCounter, setGoatCounter] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState({ row: -1, col: -1 });
  const [pieceSelected, setPieceSelected] = useState(false);
  //Set useState to set Button to Disabled/Enabled
  const updateDisabledSpots = (locations) => {
    setDisabledSpots(locations);
  };

  //Initialize board and first goat turn
  useEffect(() => {
    // Step 1: Tell the server whose turn it is and what the game board looks like right now.
    httpPostRequest<GameState>("/api/prepareGoatMovePhaseOne", {
      turn: "Goat",
      board: spots,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
      })
      .catch((error) => console.error("Request failed", error));
  }, []);

  //Find places to place goat
  function callGoatLegalMovesPhaseOne(board) {
    httpPostRequest<GameState>("/api/prepareGoatMovePhaseOne", {
      turn: "Goat",
      board: board,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //select goat
  function callFindGoat(board) {
    httpPostRequest<GameState>("/api/selectGoat", {
      turn: "Goat",
      board: board,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //select tiger
  function callFindTiger(board) {
    httpPostRequest<GameState>("/api/selectTiger", {
      turn: "Tiger",
      board: board,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //find legal spots to move tiger
  function callGetTigerLegalMoves(board, selectedTiger) {
    httpPostRequest<piece>("/api/getTigerLegalMoves", {
      board: board,
      index: selectedTiger,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
      })
      .catch((error) => console.error("Request failed", error));
  }

  function callGetGoatLegalMovesPhaseTwo(board, selectedGoat) {
    httpPostRequest<piece>("/api/getTigerLegalMoves", {
      board: board,
      index: selectedGoat,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //Handle Button Clicks
  function handleClick(row: number, col: number) {
    const nextSpot = spots.map((row) => [...row]);
    let updatedBoard;
    // Tiger's turn will have to handle two clicks
    if (!props.player) {
      //select a tiger
      if (!pieceSelected) {
        setSelectedPiece({ row, col });
        setPieceSelected(true);
        callGetTigerLegalMoves(nextSpot, [row, col]);
      }
      //select where to move
      //will need to check if same spot is clicked again to deselect and go back
      else {
        //checks if same piece was clicked (deselects tiger)
        if (selectedPiece.row == row && selectedPiece.col == col) {
          console.log("same piece");
          setPieceSelected(false);
          callFindTiger(nextSpot);
        } else {
          // Create updated board after tiger has moved
          // Map through old board (nextSpot), row by row
          updatedBoard = nextSpot.map((rowMap, rowIndexMap) => {
            //Check if piece is captures
            if(Math.abs(row - selectedPiece.row) > 1 || Math.abs(col - selectedPiece.col) > 1 )
            {
              console.log("piece captured");
              if (row === selectedPiece.row && row === rowIndexMap) {
                if (selectedPiece.col > col) {
                  return [
                    ...rowMap.slice(0, col),
                    "T",
                    ...rowMap.slice(col + 1, selectedPiece.col),
                    "",
                    ...rowMap.slice(selectedPiece.col + 1, rowMap.length),
                  ];
                //Move Tiger Right
                } else {
                  return [
                    ...rowMap.slice(0, selectedPiece.col),
                    "",
                    ...rowMap.slice(selectedPiece.col + 1, col),
                    "T",
                    ...rowMap.slice(col + 1, rowMap.length),
                  ];
                }
              }
              // move Tiger up and down
              else if (rowIndexMap === row) {
                return [
                  ...rowMap.slice(0, col),
                  "T",
                  ...rowMap.slice(col + 1, rowMap.length),
                ];
              } else if (rowIndexMap === selectedPiece.row) {
                return [
                  ...rowMap.slice(0, selectedPiece.col),
                  "",
                  ...rowMap.slice(selectedPiece.col + 1, rowMap.length),
                ];
              } else {
                return rowMap; // leave the rest unchanged
              }
            }
            // Check if we are at initial position to clear spot
            //Move Tiger Left
            else{
              if (row === selectedPiece.row && row === rowIndexMap) {
                if (selectedPiece.col > col) {
                  return [
                    ...rowMap.slice(0, col),
                    "T",
                    ...rowMap.slice(col + 1, selectedPiece.col),
                    "",
                    ...rowMap.slice(selectedPiece.col + 1, rowMap.length),
                  ];
                //Move Tiger Right
                } else {
                  return [
                    ...rowMap.slice(0, selectedPiece.col),
                    "",
                    ...rowMap.slice(selectedPiece.col + 1, col),
                    "T",
                    ...rowMap.slice(col + 1, rowMap.length),
                  ];
                }
              }
              // move Tiger up and down
              else if (rowIndexMap === row) {
                return [
                  ...rowMap.slice(0, col),
                  "T",
                  ...rowMap.slice(col + 1, rowMap.length),
                ];
              } else if (rowIndexMap === selectedPiece.row) {
                return [
                  ...rowMap.slice(0, selectedPiece.col),
                  "",
                  ...rowMap.slice(selectedPiece.col + 1, rowMap.length),
                ];
              } else {
                return rowMap; // leave the rest unchanged
              }
            }
          });
          console.log(updatedBoard);
          setPieceSelected(false);
          setSelectedPiece({ row: -1, col: -1 });
          setSpots(updatedBoard);

          //checks to see if phase one of goats is done
          if (goatCounter < 15) {
            callGoatLegalMovesPhaseOne(updatedBoard);
          } else {
            callFindGoat(updatedBoard);
          }

          props.setPlayer(props.player);
        }
      }
    }
    //goat turn
    else if (props.player) {
      //place goat
      if (goatCounter < 15) {
        nextSpot[row][col] = "G";
        setSpots(nextSpot);
        setGoatCounter(goatCounter + 1);
        callFindTiger(nextSpot);
        props.setPlayer(props.player);
      }
      //select goat
      else if (!pieceSelected) {
        setSelectedPiece({ row, col });
        setPieceSelected(true);
        callGetGoatLegalMovesPhaseTwo(nextSpot, [row, col]);
      }
      //select where to move
      else {
        if (selectedPiece.row == row && selectedPiece.col == col) {
          console.log("same piece");
          setPieceSelected(false);
          callFindGoat(nextSpot);
        } else {
          // Create updated board after tiger has moved
          // Map through old board (nextSpot), row by row
          updatedBoard = nextSpot.map((rowMap, rowIndexMap) => {
            // Check if we are at T0
            if (row === selectedPiece.row && row === rowIndexMap) {
              if (selectedPiece.col > col) {
                return [
                  ...rowMap.slice(0, col),
                  "G",
                  ...rowMap.slice(col + 1, selectedPiece.col),
                  "",
                  ...rowMap.slice(selectedPiece.col + 1, rowMap.length),
                ];
              } else {
                return [
                  ...rowMap.slice(0, selectedPiece.col),
                  "",
                  ...rowMap.slice(selectedPiece.col + 1, col),
                  "G",
                  ...rowMap.slice(col + 1, rowMap.length),
                ];
              }
            } else if (rowIndexMap === row) {
              // move Tiger to new position
              return [
                ...rowMap.slice(0, col),
                "G",
                ...rowMap.slice(col + 1, rowMap.length),
              ];
            } else if (rowIndexMap === selectedPiece.row) {
              // New board should clear this spot
              return [
                ...rowMap.slice(0, selectedPiece.col),
                "",
                ...rowMap.slice(selectedPiece.col + 1, rowMap.length),
              ];
              // clear the old Tiger position
              // Check if we are at T1
            } else {
              return rowMap; // leave the rest unchanged
            }
          });
          setPieceSelected(false);
          setSelectedPiece({ row: -1, col: -1 });
          setSpots(updatedBoard);
          callFindTiger(updatedBoard);
          props.setPlayer(props.player);
        }
      }
    }
  }

  return (
    <div className="container">
      <div className="board">
        <div className="turn">
          <p>
            {props.player ? "Goat" : "Tiger"}'s turn : Phase{" "}
            {goatCounter < 15 ? "One" : "Two"}
          </p>
        </div>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
        <div className="line4"></div>
        <div className="line5"></div>
        <div className="line6"></div>
        <div className="rectangle"></div>
        <div className="button-container">
          <div className="row" style={{ margin: "10%", top: "30%" }}>
            <Spot
              buttonID="1"
              disabled={disabledSpots[0][0]}
              value={spots[0][0]}
              y={0}
              onSpotClick={() => handleClick(0, 0)}
            />
          </div>
          <div className="row" style={{ margin: "20%" }}>
            <Spot
              buttonID="2"
              disabled={disabledSpots[1][0]}
              value={spots[1][0]}
              y={-97}
              onSpotClick={() => handleClick(1, 0)}
            />
            <Spot
              buttonID="3"
              disabled={disabledSpots[1][1]}
              value={spots[1][1]}
              y={-42}
              onSpotClick={() => handleClick(1, 1)}
            />
            <Spot
              buttonID="4"
              disabled={disabledSpots[1][2]}
              value={spots[1][2]}
              y={-12}
              onSpotClick={() => handleClick(1, 2)}
            />
            <Spot
              buttonID="5"
              disabled={disabledSpots[1][3]}
              value={spots[1][3]}
              y={13}
              onSpotClick={() => handleClick(1, 3)}
            />
            <Spot
              buttonID="6"
              disabled={disabledSpots[1][4]}
              value={spots[1][4]}
              y={41}
              onSpotClick={() => handleClick(1, 4)}
            />
            <Spot
              buttonID="7"
              disabled={disabledSpots[1][5]}
              value={spots[1][5]}
              y={101}
              onSpotClick={() => handleClick(1, 5)}
            />
          </div>
          <div className="row" style={{ margin: "-12%" }}>
            <Spot
              buttonID="8"
              disabled={disabledSpots[2][0]}
              value={spots[2][0]}
              y={-97}
              onSpotClick={() => handleClick(2, 0)}
            />
            <Spot
              buttonID="9"
              disabled={disabledSpots[2][1]}
              value={spots[2][1]}
              y={-67}
              onSpotClick={() => handleClick(2, 1)}
            />
            <Spot
              buttonID="10"
              disabled={disabledSpots[2][2]}
              value={spots[2][2]}
              y={-20}
              onSpotClick={() => handleClick(2, 2)}
            />
            <Spot
              buttonID="11"
              disabled={disabledSpots[2][3]}
              value={spots[2][3]}
              y={20}
              onSpotClick={() => handleClick(2, 3)}
            />
            <Spot
              buttonID="12"
              disabled={disabledSpots[2][4]}
              value={spots[2][4]}
              y={66}
              onSpotClick={() => handleClick(2, 4)}
            />
            <Spot
              buttonID="13"
              disabled={disabledSpots[2][5]}
              value={spots[2][5]}
              y={101}
              onSpotClick={() => handleClick(2, 5)}
            />
          </div>
          <div className="row" style={{ margin: "19%" }}>
            <Spot
              buttonID="14"
              disabled={disabledSpots[3][0]}
              value={spots[3][0]}
              y={-97}
              onSpotClick={() => handleClick(3, 0)}
            />
            <Spot
              buttonID="15"
              disabled={disabledSpots[3][1]}
              value={spots[3][1]}
              y={-90}
              onSpotClick={() => handleClick(3, 1)}
            />
            <Spot
              buttonID="16"
              disabled={disabledSpots[3][2]}
              value={spots[3][2]}
              y={-27}
              onSpotClick={() => handleClick(3, 2)}
            />
            <Spot
              buttonID="17"
              disabled={disabledSpots[3][3]}
              value={spots[3][3]}
              y={27}
              onSpotClick={() => handleClick(3, 3)}
            />
            <Spot
              buttonID="18"
              disabled={disabledSpots[3][4]}
              value={spots[3][4]}
              y={90}
              onSpotClick={() => handleClick(3, 4)}
            />
            <Spot
              buttonID="19"
              disabled={disabledSpots[3][5]}
              value={spots[3][5]}
              y={101}
              onSpotClick={() => handleClick(3, 5)}
            />
          </div>
          <div className="row" style={{ margin: "-6.5%" }}>
            <Spot
              buttonID="20"
              disabled={disabledSpots[4][0]}
              value={spots[4][0]}
              y={-183}
              onSpotClick={() => handleClick(4, 0)}
            />
            <Spot
              buttonID="21"
              disabled={disabledSpots[4][1]}
              value={spots[4][1]}
              y={-57}
              onSpotClick={() => handleClick(4, 1)}
            />
            <Spot
              buttonID="22"
              disabled={disabledSpots[4][2]}
              value={spots[4][2]}
              y={55}
              onSpotClick={() => handleClick(4, 2)}
            />
            <Spot
              buttonID="23"
              disabled={disabledSpots[4][3]}
              value={spots[4][3]}
              y={183}
              onSpotClick={() => handleClick(4, 3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
