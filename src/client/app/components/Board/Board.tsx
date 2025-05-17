"use client";
import { useState, useEffect } from "react";
import Spot from "./Spot/Spot";
import { GameState } from "../../types/types";
import httpPostRequest from "../../utilities/httpPostRequest";
import "./board.css";

export default function Board(props: any) {
  const [spots, setSpots] = useState([
    [""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", ""],
  ]); //State of currenet game board
  const [disabledSpots, setDisabledSpots] = useState([
    [true],
    [false, false, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false]
  ]);
  const [goatCounter, setGoatCounter] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState({row: 0, col: 0});
  const [pieceSelected, setPieceSelected] = useState(false);
  //Set useState to set Button to Disabled/Enabled
  const updateDisabledSpots = (locations) => {
    console.log(locations);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //find legal spots to move tiger
  function callGetTigerLegalMoves(board, selectedTiger) {
    httpPostRequest<GameState>("/api/getTigerLegalMoves", {
      turn: "Tiger",
      board: board,
      piece: selectedTiger,
    })
      // Step 5: Receive the response and determine what player may do
      .then((response) => {
        updateDisabledSpots(response.possibleMoves);
        console.log(response);
      })
      .catch((error) => console.error("Request failed", error));
  }

  //Handle Button Clicks
  function handleClick(row: number, col: number) {
    const nextSpot = spots.slice();
    // Tiger's turn will have to handle two clicks
    if (!props.player) 
    {
      //select a tiger
      if(!pieceSelected)
      {
        setSelectedPiece({row, col})
        setPieceSelected(true)
        callGetTigerLegalMoves(nextSpot)
      }
      //select where to move
      //will need to check if same spot is clicked again to deselect and go back
      else
      {
        setSpots(nextSpot);
        if(goatCounter <= 15)
        {
          callGoatLegalMovesPhaseOne(nextSpot);
        }
        else
        {
          callFindGoat(nextSpot)
        }
        setPieceSelected(false)
        props.setPlayer(props.player);
      }

    } 
    //goat turn
    else if (props.player) 
    {
      //place goat
      if (goatCounter <= 15) 
      {
        nextSpot[row][col] = "G";
        setSpots(nextSpot);
        setGoatCounter(goatCounter + 1);
        callFindTiger(nextSpot);
        props.setPlayer(props.player);
      }
      //select goat
      else if (!pieceSelected)
      {
        setSelectedPiece({row, col})
        setPieceSelected(true)
      }
      //select where to move
      else
      {
        callFindTiger(nextSpot);
        setPieceSelected(false)
        props.setPlayer(props.player);
        
      }
    }
  }

  return (
    <div className="container">
      <div className="board">
        <div className="turn">
          <p>{props.player ? "Goat" : "Tiger"}'s turn</p>
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
              value={(spots[0][0] = "T")}
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
              onSpotClick={() => handleClick(1,0)}
            />
            <Spot
              buttonID="3"
              disabled={disabledSpots[1][1]}
              value={spots[1][1]}
              y={-42}
              onSpotClick={() => handleClick(1,1)}
            />
            <Spot
              buttonID="4"
              disabled={disabledSpots[1][2]}
              value={(spots[1][2] = "T")}
              y={-12}
              onSpotClick={() => handleClick(1,2)}
            />
            <Spot
              buttonID="5"
              disabled={disabledSpots[1][3]}
              value={(spots[1][3] = "T")}
              y={13}
              onSpotClick={() => handleClick(1,3)}
            />
            <Spot
              buttonID="6"
              disabled={disabledSpots[1][4]}
              value={spots[1][4]}
              y={41}
              onSpotClick={() => handleClick(1,4)}
            />
            <Spot
              buttonID="7"
              disabled={disabledSpots[1][5]}
              value={spots[1][5]}
              y={101}
              onSpotClick={() => handleClick(1,5)}
            />
          </div>
          <div className="row" style={{ margin: "-12%" }}>
            <Spot
              buttonID="8"
              disabled={disabledSpots[2][0]}
              value={spots[2][0]}
              y={-97}
              onSpotClick={() => handleClick(2,0)}
            />
            <Spot
              buttonID="9"
              disabled={disabledSpots[2][1]}
              value={spots[2][1]}
              y={-67}
              onSpotClick={() => handleClick(2,1)}
            />
            <Spot
              buttonID="10"
              disabled={disabledSpots[2][2]}
              value={spots[2][2]}
              y={-20}
              onSpotClick={() => handleClick(2,2)}
            />
            <Spot
              buttonID="11"
              disabled={disabledSpots[2][3]}
              value={spots[2][3]}
              y={20}
              onSpotClick={() => handleClick(2,3)}
            />
            <Spot
              buttonID="12"
              disabled={disabledSpots[2][4]}
              value={spots[2][4]}
              y={66}
              onSpotClick={() => handleClick(2,4)}
            />
            <Spot
              buttonID="13"
              disabled={disabledSpots[2][5]}
              value={spots[2][5]}
              y={101}
              onSpotClick={() => handleClick(2,5)}
            />
          </div>
          <div className="row" style={{ margin: "19%" }}>
            <Spot
              buttonID="14"
              disabled={disabledSpots[3][0]}
              value={spots[3][0]}
              y={-97}
              onSpotClick={() => handleClick(3,0)}
            />
            <Spot
              buttonID="15"
              disabled={disabledSpots[3][1]}
              value={spots[3][1]}
              y={-90}
              onSpotClick={() => handleClick(3,1)}
            />
            <Spot
              buttonID="16"
              disabled={disabledSpots[3][2]}
              value={spots[3][2]}
              y={-27}
              onSpotClick={() => handleClick(3,2)}
            />
            <Spot
              buttonID="17"
              disabled={disabledSpots[3][3]}
              value={spots[3][3]}
              y={27}
              onSpotClick={() => handleClick(3,3)}
            />
            <Spot
              buttonID="18"
              disabled={disabledSpots[3][4]}
              value={spots[3][4]}
              y={90}
              onSpotClick={() => handleClick(3,4)}
            />
            <Spot
              buttonID="19"
              disabled={disabledSpots[3][5]}
              value={spots[3][5]}
              y={101}
              onSpotClick={() => handleClick(3,5)}
            />
          </div>
          <div className="row" style={{ margin: "-6.5%" }}>
            <Spot
              buttonID="20"
              disabled={disabledSpots[4][0]}
              value={spots[4][0]}
              y={-183}
              onSpotClick={() => handleClick(4,0)}
            />
            <Spot
              buttonID="21"
              disabled={disabledSpots[4][1]}
              value={spots[4][1]}
              y={-57}
              onSpotClick={() => handleClick(4,1)}
            />
            <Spot
              buttonID="22"
              disabled={disabledSpots[4][2]}
              value={spots[4][2]}
              y={55}
              onSpotClick={() => handleClick(4,2)}
            />
            <Spot
              buttonID="23"
              disabled={disabledSpots[4][3]}
              value={spots[4][3]}
              y={183}
              onSpotClick={() => handleClick(4,3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
