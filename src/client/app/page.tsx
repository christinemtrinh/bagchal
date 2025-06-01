"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'
import Page from './components/GameSetup/Page'

export default function Home() {
  const router = useRouter()
  const [player, setPlayer] = useState(true); //State to update player/turn text Goat: True, Tiger: False
  function changePlayer()
  {
    setPlayer(!player)
  }

  return (
    <div>
      <Page></Page>
      <Rules player={player}/>
      <div style={{position: "relative", top: "55px"}}>
        <Board setPlayer={changePlayer} player = {player}/>
      </div>
  </div>
  );
}

