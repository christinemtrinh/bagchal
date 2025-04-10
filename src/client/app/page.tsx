"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'


export default function Home() {
  const router = useRouter()
  const [player, setPlayer] = useState("Goat"); //State to update player/turn text


  // Opens page on click
  // const handleClickToUser = async () => {    
  //   router.push('/user')
  // } 

  return (
    <div>
      <Rules player={player}/>
      <Board setPlayer={setPlayer}/>
      
  </div>
  );
}

