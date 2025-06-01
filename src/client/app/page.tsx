"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'
import Page from './components/GameSetup/Page'
import Modal from './components/Containers/Modal'

export default function Home() {
  const router = useRouter()
  const [player, setPlayer] = useState(true); //State to update player/turn text Goat: True, Tiger: False
  const [isOpen, setIsOpen] = useState(true);

  function changePlayer()
  {
    setPlayer(!player)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}><Page/></Modal>
      <Rules player={player}/>
      <div style={{position: "relative", top: "55px"}}>
        <Board setPlayer={changePlayer} player = {player}/>
      </div>
  </div>
  );
}

