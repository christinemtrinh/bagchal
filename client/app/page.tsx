"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import './board.css'
import { useState } from 'react'
import Modal from "react-modal"
function Spot({ buttonID, value, y, onSpotClick }) {
  return (
    <button
      id={buttonID}
      onClick={onSpotClick}
      className="button"
      style={{left: y + "%"}}
    >
      {value}
    </button>
  );
}

export default function Home() {
  const [xIsNext, setXIsNext] = useState(true); //State of turn
  const [spots, setSpots] = useState(Array(23).fill(null)) //State or currenet game board
  const [player, setPlayer] = useState("Goat"); //State to update player/turn text
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()
  var goatCounter = 0
  var tempTigerLocation

  //Opens page on click
  const handleClickToUser = async () => {    
    router.push('/user')
  } 

  function handleClick(i)
  {
    const nextSpot = spots.slice();
    
    if(spots[i]) //Makes sure if spot is already taken, can't be used
    {
      return
    }


    if(!xIsNext) //Turn taking on tic tac toe rules
    {
      //Player One Turn
      // tempTigerLocation = i
      // nextSpot[i] = "" //Set spot to X   TODO: Tried to do tiger movement
      nextSpot[i] = "X"
      setPlayer("Goat")
    }
    else
    {
      //Plater Two Turn
      if(goatCounter != 15)
      {
        nextSpot[i] = "O"
        goatCounter = goatCounter + 1
      }

      setPlayer("Tiger")

    }
    setXIsNext(!xIsNext)
    setSpots(nextSpot)
  }
  const customStyles = {
    content: {
      width: "50%",
      margin: "auto",
      backgroundColor: "#000000"
    }
  };

  return (
    <div>
      <div>
        <button className="button2" onClick={() => setShowModal(true)}>Open Rulebook</button>
        <Modal style={customStyles} isOpen={showModal} ariaHideApp={false}>
          <button className="button1" onClick={() => setShowModal(false)}>Back to Game </button>
          <h1>Rules for tigers</h1>
          <p>&bull; Can move to any adjacent free position.</p>
          <p>&bull; Can jump over a goat in any direction if there is an open space right adjacent to the goat and capture the goat in the process. Captured goat is removed from the board.</p>
          <p>&bull; Can capture goats during any of the two phases.</p>
          <p>&bull; In each turn only one goat can be captured.</p>
          <p>Can&apos;t jump over another tiger.</p>
          <p>Rules for goats</p>
          <p>&bull; Goats can&apos;t move until all goats have been placed on the board.</p>
          <p>&bull; Can move to any adjacent free position in second phase.</p>
          <p>&bull; Can&apos;t jump over tigers or other goats.</p>
          <p>The game is over when either, all goats are captured by the tigers, or the goats have blocked the tigers from being able to move.</p>
          <p>If there is a stalemate and both players repeat the moves, the game ends in a draw if a particular position is repeated more than twice.</p>
        </Modal>
      </div>
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
  </div>
  );
}

