"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'


export default function Home() {
  const router = useRouter()
  const [player, setPlayer] = useState(true); //State to update player/turn text Goat: True, Tiger: False
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
      <Board setPlayer={changePlayer} player = {player}/>
      
  </div>
  );
}

