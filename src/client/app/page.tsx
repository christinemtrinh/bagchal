"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'
import LobbyMenu from './components/GameSetup/LobbyMenu'
import Modal from './components/Containers/Modal'

export default function Home() {
  const router = useRouter()
  const [player, setPlayer] = useState(true); //State to update player/turn text Goat: True, Tiger: False
  const [isOpen, setIsOpen] = useState(true);
  const [roomIsFull, setRoomIsFull] = useState(false);
  function changePlayer()
  {
    setPlayer(!player)
  }

  return (
    <div>
      <Modal isOpen={roomIsFull? true : isOpen} onClose={() => setIsOpen(false)}>
        {roomIsFull? <h3>Room is full! Please try a different link </h3>: <LobbyMenu setRoomFull={setRoomIsFull}/>}
      </Modal>
      <Rules player={player}/>
      <div style={{position: "relative", top: "55px"}}>
        <Board setPlayer={changePlayer} player = {player}/>
      </div>
  </div>
  );
}

