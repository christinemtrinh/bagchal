"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'


export default function Home() {
  const router = useRouter()
  const [player, setPlayer] = useState(true); //State to update player/turn text Goat: True, Tiger: False
  const [numOfCapturedGoats, setNumOfCapturedGoats] = useState(0);
  const [numOfCorneredTigers, setNumOfCorneredTigers] = useState(0);
  function changePlayer()
  {
    setPlayer(!player)
  }

  // Opens page on click
  // const handleClickToUser = async () => {    
  //   router.push('/user')
  // } 

  return (
    <div>
      <Rules player={player}/>
      <div style={{position: "relative"}}>
      <div className="turn">
            <p>
              {player ? "Goat" : "Tiger"}'s turn<br />
              Goats Captured: {numOfCapturedGoats} : Tigers Cornered: {numOfCorneredTigers}
            </p>
        </div>
        <Board setPlayer={changePlayer} player = {player}/>
      </div>
  </div>
  );
}

