"use client"
import { useState, useEffect } from 'react'
import Spot from './Spot/Spot'
import { GameState } from '../../types/types'
import httpPostRequest from '../../utilities/httpPostRequest'
import './board.css'

export default function Board(props:any) {
  const [spots, setSpots] = useState(Array(23).fill(null)) //State or currenet game board
  const [xIsNext, setXIsNext] = useState(true); //State of turn


  useEffect(() => {
    // Step 1: Tell the server whose turn it is and what the game board looks like right now.
    httpPostRequest<GameState>('/api/prepareGoatMove', {turn: 'Goat', board: spots})
      // Step 5: Receive the response and determine what player may do
      .then(response => console.log(response))
      .catch(error => console.error('Request failed', error)); 
  }, [])


    function handleClick(i:number)
    {
      const nextSpot = spots.slice();

      //If spot is already taken, can't be used
      if(spots[i]) { return }
  
      // Tiger's turn
      if(props.player == "Tiger") {
        nextSpot[i] = "X"
        props.setPlayer("Goat")
      }
      else {
        //Goat Two Turn
        props.setPlayer("Tiger")
      }
      setXIsNext(!xIsNext)
      setSpots(nextSpot)
    }

    return (
    <div className = "container">
    <div className = "board">
      <div className = "line1"></div>
      <div className = "line2"></div>
      <div className = "line3"></div>
      <div className = "line4"></div>
      <div className = "line5"></div>
      <div className = "line6"></div>
    <div className = "rectangle"></div>
      <div className="button-container">
        <div className="row" style={{margin: "10%", top: "30%"}}>
          <Spot buttonID ="A1" value={spots[0] = "X"} y = {0} onSpotClick={() => handleClick(0)} />
        </div>
        <div className="row" style={{margin: "20%"}}>
          <Spot buttonID="B1" value={spots[1]} y={-97} onSpotClick={() => handleClick(1)}/>
          <Spot buttonID="B2" value={spots[2]} y={-42} onSpotClick={() => handleClick(2)}/>
          <Spot buttonID="B3" value={spots[3] = "X"} y={-12} onSpotClick={() => handleClick(3)}/>
          <Spot buttonID="B4" value={spots[4] = "X"} y={13} onSpotClick={() => handleClick(4)}/>
          <Spot buttonID="B5" value={spots[5]} y={41} onSpotClick={() => handleClick(5)}/>
          <Spot buttonID="B6" value={spots[6]} y={101} onSpotClick={() => handleClick(6)}/>
        </div>
        <div className="row" style={{margin:"-12%"}}>
          <Spot buttonID="C1" value={spots[7]} y={-97} onSpotClick={() => handleClick(7)}/>
          <Spot buttonID="C2" value={spots[8]} y={-67} onSpotClick={() => handleClick(8)}/>
          <Spot buttonID="C3" value={spots[9]} y={-20} onSpotClick={() => handleClick(9)}/>
          <Spot buttonID="C4" value={spots[10]} y={20} onSpotClick={() => handleClick(10)}/>
          <Spot buttonID="C5" value={spots[11]} y={66} onSpotClick={() => handleClick(11)}/>
          <Spot buttonID="C6" value={spots[12]} y={101} onSpotClick={() => handleClick(12)}/>
        </div>
        <div className="row" style={{margin: "19%"}}>
          <Spot buttonID="D1" value={spots[13]} y={-97} onSpotClick={() => handleClick(13)}/>
          <Spot buttonID="D2" value={spots[14]} y={-90} onSpotClick={() => handleClick(14)}/>
          <Spot buttonID="D3" value={spots[15]} y={-27} onSpotClick={() => handleClick(15)}/>
          <Spot buttonID="D4" value={spots[16]} y={27} onSpotClick={() => handleClick(16)}/>
          <Spot buttonID="D5" value={spots[17]} y={90} onSpotClick={() => handleClick(17)}/>
          <Spot buttonID="D6" value={spots[18]} y={101} onSpotClick={() => handleClick(18)}/>
        </div>
        <div className="row" style={{margin: "-6.5%"}}>
          <Spot buttonID="E1" value={spots[19]} y={-183} onSpotClick={() => handleClick(19)}/>
          <Spot buttonID="E2" value={spots[20]} y={-57} onSpotClick={() => handleClick(20)}/>
          <Spot buttonID="E3" value={spots[21]} y={55} onSpotClick={() => handleClick(21)}/>
          <Spot buttonID="E4" value={spots[22]} y={183} onSpotClick={() => handleClick(22)}/>
        </div>
    </div>
    </div>

  </div>
    )
}
