"use client";
import { useState, useEffect } from "react";
import Spot from "./Spot/Spot";
import { GameState } from "../../types/types";
import { piece } from "../../types/types";
import { movePiece } from "../../types/types";
import { captureGoat } from "../../types/types";
import { checkTigerCornered } from "../../types/types";
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
  let boardCopy = spots
  const [disabledSpots, setDisabledSpots] = useState([
    [true],
    [false, false, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false],
  ]);
  const [goatCounter, setGoatCounter] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState([-1,-1]);
  const [pieceSelected, setPieceSelected] = useState(false);
  const [capturedGoats, setCapturedGoats] = useState();
  const [numOfCapturedGoats, setNumOfCapturedGoats] = useState(0);
  const [numOfCorneredTigers, setNumOfCorneredTigers] = useState(0);
  const [isGameDone, setIsGameDone] = useState(false);

  const graphDict: {[key: string]: number[][]} = {
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

  const bfs = (index: number[]) => {
    const key =  JSON.stringify(index)
    return graphDict[key]

  }
  //Set useState to set Button to Disabled/Enabled
  const updateDisabledSpots = (locations) => {
    setDisabledSpots(locations);
  };

  const updateBoard = (newBoard) => {
    setSpots(newBoard);
  };

  //Initialize board and first goat turn
  useEffect(() => {
      boardCopy = spots
      callCheckTigerCorner(boardCopy)
      if(props.player)
      {
        if (goatCounter < 15) {
          callGoatLegalMovesPhaseOne(boardCopy);
        } else {
          callFindGoat(boardCopy);
        }
      }
      else
      {
        callFindTiger(boardCopy);
      }
  }, [spots],);

  //watches Num of cornered Tigers
  useEffect(() => {
    if (numOfCorneredTigers === 3) {
      console.log("Goat Wins!");
    }
  }, [numOfCorneredTigers]);
  //wawtches num of captured goats
  useEffect(() => {
    if(numOfCapturedGoats === 15)
      {
        console.log("Tiger Wins!")
      }
  }, [numOfCapturedGoats]);

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
        setCapturedGoats(response.capturedGoat);

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

  function callPlaceGoat(board, spot) {
    httpPostRequest<piece>("/api/placeGoat", {
      board: board,
      index: spot,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        boardCopy = response.board
        updateBoard(response.board);
      })
      .catch((error) => console.error("Request failed", error));
  }

  function callMoveTiger(board, spot, selectedPiece) {
    httpPostRequest<movePiece>("/api/moveTiger", {
      board: board,
      initialIndex: selectedPiece,
      finalIndex: spot,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateBoard(response.board);
      })
      .catch((error) => console.error("Request failed", error));
  }

  function callTigerCaptureGoat(board, spot, selectedPiece, capturedGoats) {
    httpPostRequest<captureGoat>("/api/tigerCaptureGoat", {
      board: board,
      initialIndex: selectedPiece,
      finalIndex: spot,
      goatCapturedIndex: capturedGoats,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateBoard(response.board);
      })
      .catch((error) => console.error("Request failed", error));
  }
  
  function callMoveGoat(board, spot, selectedPiece) {
    httpPostRequest<movePiece>("/api/moveGoat", {
      board: board,
      initialIndex: selectedPiece,
      finalIndex: spot,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateBoard(response.board);
      })
      .catch((error) => console.error("Request failed", error));
  }

  function callCheckTigerCorner(board) {
    httpPostRequest<GameState>("/api/checkTigerCorner", {
      board: board,
      turn: "Tiger",
    })
      .then((response) => {
        setNumOfCorneredTigers(response.numCornered);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //to check if place moved is a capture move
  const isMoveValid = (prev: number[], current: number[]) => {
    const possibleMoves = bfs(prev); 
    return possibleMoves.some(
      (move) => move[0] === current[0] && move[1] === current[1]
    );
  };
  //Handle Button Clicks
  function handleClick(row: number, col: number) {
    const nextSpot = spots.map((row) => [...row]);
    // Tiger's turn will have to handle two clicks
    if (!props.player) {
      //select a tiger
      if (!pieceSelected) {
        setSelectedPiece([row, col]);
        setPieceSelected(true);
        callGetTigerLegalMoves(nextSpot, [row, col]);
      }
      //select where to move
      //will need to check if same spot is clicked again to deselect and go back
      else {
        //checks if same piece was clicked (deselects tiger)
        if (selectedPiece[0] == row && selectedPiece[1] == col) {
          console.log("same piece");
          setPieceSelected(false);
          callFindTiger(nextSpot);
        } else {
          // Create updated board after tiger has moved
          //checks to see if piece was captured

          if(!isMoveValid([row, col], selectedPiece))
          {
            setNumOfCapturedGoats(numOfCapturedGoats + 1)
            callTigerCaptureGoat(nextSpot, [row, col], selectedPiece, capturedGoats)
          }
          else
          {

            callMoveTiger(nextSpot, [row, col], selectedPiece)
          }
          setPieceSelected(false);
          setSelectedPiece([-1,-1]);
          props.setPlayer(props.player);
        }
      }
      if(numOfCapturedGoats == 15)
        {
          console.log("Tiger Wins!")
        }
    }
    //goat turn
    else if (props.player) {

      //place goat
      if (goatCounter < 15) {
        callPlaceGoat(nextSpot, [row, col]);
        setGoatCounter(goatCounter + 1);
        callFindTiger(nextSpot);
        props.setPlayer(props.player);
      }
      //select goat
      else if (!pieceSelected) {
        setSelectedPiece([row,col]);
        setPieceSelected(true);
        callGetGoatLegalMovesPhaseTwo(nextSpot, [row, col]);
      }
      //select where to move
      else {
        if (selectedPiece[0] == row && selectedPiece[1] == col) {
          console.log("same piece");
          setPieceSelected(false);
          callFindGoat(nextSpot);
        } else {
          // Create updated board after tiger has moved
          // Map through old board (nextSpot), row by row
          callMoveGoat(nextSpot, [row, col], selectedPiece)
          setPieceSelected(false);
          setSelectedPiece([-1,-1]);

          props.setPlayer(props.player);
        }
      }
      callCheckTigerCorner(boardCopy)
      if(numOfCorneredTigers == 3)
        {
          console.log("Goat Wins!")
        } 
    }
  }

  return (
    <div className="container">

      <div className="board">
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
