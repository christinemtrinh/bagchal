"use client";
import { useState, useEffect } from "react";
import Spot from "./Spot/Spot";
import { GameState } from "../../types/types";
import httpPostRequest from "../../utilities/httpPostRequest";
import "./board.css";

export default function Board(props: any) {
  const [spots, setSpots] = useState(Array(23).fill(null)); //State of currenet game board
  const [disabledSpots, setDisabledSpots] = useState([
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //Set useState to set Button to Disabled/Enabled
  const updateDisabledSpots = (locations) => {
    console.log(locations);
    setDisabledSpots(locations);
  };


  //Initialize board and first goat turn
  useEffect(() => {
    // Step 1: Tell the server whose turn it is and what the game board looks like right now.
    httpPostRequest<GameState>("/api/prepareGoatMove", {
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

  function callGoatLegalMoves(board) {
    console.log("test")
    httpPostRequest<GameState>("/api/prepareGoatMove", {
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

  //Handle Click and Call API to get Legal Moves
  function handleClick(i: number) {
    const nextSpot = spots.slice();

    // Tiger's turn will have to handle two clicks
    if (!props.player) {
      nextSpot[i] = null;
      setSpots(nextSpot);
      callGoatLegalMoves(nextSpot);

    } 
    else if (props.player) {
      //Goat Two Turn
      nextSpot[i] = "O";
      setSpots(nextSpot);
    }
    props.setPlayer(props.player);

  }

  return (
    <div className="container">
      <div className="board">
        <div className="turn">
          <p>{props.player ? 'Goat' : 'Tiger'}'s turn</p>
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
            {/* Check if ID is apart of legal moves, if not make button not clickable */}
            <Spot
              buttonID="1"
              disabled={disabledSpots[0]}
              value={(spots[0] = "X")}
              y={0}
              onSpotClick={() => handleClick(0)}
            />
          </div>
          <div className="row" style={{ margin: "20%" }}>
            <Spot
              buttonID="2"
              disabled={disabledSpots[1]}
              value={spots[1]}
              y={-97}
              onSpotClick={() => handleClick(1)}
            />
            <Spot
              buttonID="3"
              disabled={disabledSpots[2]}
              value={spots[2]}
              y={-42}
              onSpotClick={() => handleClick(2)}
            />
            <Spot
              buttonID="4"
              disabled={disabledSpots[3]}
              value={(spots[3] = "X")}
              y={-12}
              onSpotClick={() => handleClick(3)}
            />
            <Spot
              buttonID="5"
              disabled={disabledSpots[4]}
              value={(spots[4] = "X")}
              y={13}
              onSpotClick={() => handleClick(4)}
            />
            <Spot
              buttonID="6"
              disabled={disabledSpots[5]}
              value={spots[5]}
              y={41}
              onSpotClick={() => handleClick(5)}
            />
            <Spot
              buttonID="7"
              disabled={disabledSpots[6]}
              value={spots[6]}
              y={101}
              onSpotClick={() => handleClick(6)}
            />
          </div>
          <div className="row" style={{ margin: "-12%" }}>
            <Spot
              buttonID="8"
              disabled={disabledSpots[7]}
              value={spots[7]}
              y={-97}
              onSpotClick={() => handleClick(7)}
            />
            <Spot
              buttonID="9"
              disabled={disabledSpots[8]}
              value={spots[8]}
              y={-67}
              onSpotClick={() => handleClick(8)}
            />
            <Spot
              buttonID="10"
              disabled={disabledSpots[9]}
              value={spots[9]}
              y={-20}
              onSpotClick={() => handleClick(9)}
            />
            <Spot
              buttonID="11"
              disabled={disabledSpots[10]}
              value={spots[10]}
              y={20}
              onSpotClick={() => handleClick(10)}
            />
            <Spot
              buttonID="12"
              disabled={disabledSpots[11]}
              value={spots[11]}
              y={66}
              onSpotClick={() => handleClick(11)}
            />
            <Spot
              buttonID="13"
              disabled={disabledSpots[12]}
              value={spots[12]}
              y={101}
              onSpotClick={() => handleClick(12)}
            />
          </div>
          <div className="row" style={{ margin: "19%" }}>
            <Spot
              buttonID="14"
              disabled={disabledSpots[13]}
              value={spots[13]}
              y={-97}
              onSpotClick={() => handleClick(13)}
            />
            <Spot
              buttonID="15"
              disabled={disabledSpots[14]}
              value={spots[14]}
              y={-90}
              onSpotClick={() => handleClick(14)}
            />
            <Spot
              buttonID="16"
              disabled={disabledSpots[15]}
              value={spots[15]}
              y={-27}
              onSpotClick={() => handleClick(15)}
            />
            <Spot
              buttonID="17"
              disabled={disabledSpots[16]}
              value={spots[16]}
              y={27}
              onSpotClick={() => handleClick(16)}
            />
            <Spot
              buttonID="18"
              disabled={disabledSpots[17]}
              value={spots[17]}
              y={90}
              onSpotClick={() => handleClick(17)}
            />
            <Spot
              buttonID="19"
              disabled={disabledSpots[18]}
              value={spots[18]}
              y={101}
              onSpotClick={() => handleClick(18)}
            />
          </div>
          <div className="row" style={{ margin: "-6.5%" }}>
            <Spot
              buttonID="20"
              disabled={disabledSpots[19]}
              value={spots[19]}
              y={-183}
              onSpotClick={() => handleClick(19)}
            />
            <Spot
              buttonID="21"
              disabled={disabledSpots[20]}
              value={spots[20]}
              y={-57}
              onSpotClick={() => handleClick(20)}
            />
            <Spot
              buttonID="22"
              disabled={disabledSpots[21]}
              value={spots[21]}
              y={55}
              onSpotClick={() => handleClick(21)}
            />
            <Spot
              buttonID="23"
              disabled={disabledSpots[22]}
              value={spots[22]}
              y={183}
              onSpotClick={() => handleClick(22)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
