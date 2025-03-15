"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import './board.css'
import { useState } from 'react'



//Make buttons reuseable
function Spot({buttonID, x, y, value, onSpotClick})
{
  function onClickPrint()
  {
    console.log("Button " + buttonID + " was clicked")
  }
  return <button id = {buttonID} onClick = {onSpotClick} className = "button" style = {{left: x + "px", top: y + "px"}}>{value}</button>
}

export default function Home() {
  const [xIsNext, setXIsNext] = useState(true); //State of turn
  const [spots, setSpots] = useState(Array(17).fill(null)) //State or currenet game board
  const [player, setPlayer] = useState("Goat"); //State to update player/turn text
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


  

  return (
    <div className = "board">
      <div className = "line1"></div>
      <div className = "line2"></div>
      <div className = "line3"></div>
      <div className = "line4"></div>
      <div className = "line5"></div>
      <div className = "rectangle"></div>
      <h1>Player {player} turn</h1>
      {/* <button id = "A1" onClick = {() =>handleClick(1)} className = "button" style = {{left: '613px', top: '90px'}}></button> */}
      <Spot buttonID="A1" x="613" y="90" value={spots[0] = "X"} onSpotClick= {() => handleClick(0)}/>
      <Spot buttonID="B1" x="294" y="270" value={spots[1]} onSpotClick={() =>handleClick(1)}/>
      <Spot buttonID="B2" x="508" y="270" value={spots[2]} onSpotClick={() =>handleClick(2)}/>
      <Spot buttonID="B3" x="580" y="270" value={spots[3] = "X"} onSpotClick={() =>handleClick(3)}/>
      <Spot buttonID="B4" x="644" y="270" value={spots[4] = "X"} onSpotClick={() =>handleClick(4)}/>
      <Spot buttonID="B5" x="716" y="270" value={spots[5]} onSpotClick={() =>handleClick(5)}/>
      <Spot buttonID="B6" x="930" y="270" value={spots[6]} onSpotClick={() =>handleClick(6)}/>
      <Spot buttonID="C1" x="294" y="435" value={spots[7]} onSpotClick={() =>handleClick(7)}/>
      <Spot buttonID="C2" x="415" y="435" value={spots[8]} onSpotClick={() =>handleClick(8)}/>
      <Spot buttonID="C3" x="552" y="435" value={spots[9]} onSpotClick={() =>handleClick(9)}/>
      <Spot buttonID="C4" x="673" y="435" value={spots[10]} onSpotClick={() =>handleClick(10)}/>
      <Spot buttonID="C5" x="810" y="435" value={spots[11]} onSpotClick={() =>handleClick(11)}/>
      <Spot buttonID="C6" x="930" y="435" value={spots[12]} onSpotClick={() =>handleClick(12)}/>
      <Spot buttonID="D1" x="325" y="590" value={spots[13]} onSpotClick={() =>handleClick(13)}/>
      <Spot buttonID="D2" x="525" y="590" value={spots[14]} onSpotClick={() =>handleClick(14)}/>
      <Spot buttonID="D3" x="700" y="590" value={spots[15]} onSpotClick={() =>handleClick(15)}/>
      <Spot buttonID="D4" x="900" y="590" value={spots[16]} onSpotClick={() =>handleClick(16)}/>
    </div>
  );
}

