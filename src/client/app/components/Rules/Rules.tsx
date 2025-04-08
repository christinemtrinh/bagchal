import { useState } from 'react'
import Modal from "react-modal"
import './rules.css'

export default function Rules () {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
        <button className="button2" onClick={() => setShowModal(true)}>Open Rulebook</button>
        <Modal className="content" isOpen={showModal} ariaHideApp={false}>
          <button className="button1" onClick={() => setShowModal(false)}>Back to Game </button>
          <h1>Rules for tigers</h1>
          <p>&bull; Can move to any adjacent free position.</p>
          <p>&bull; Can jump over a goat in any direction if there is an open space right adjacent to the goat and capture the goat in the process. Captured goat is removed from the board.</p>
          <p>&bull; Can capture goats during any of the two phases.</p>
          <p>&bull; In each turn only one goat can be captured.</p>
          <p>&bull;Can&apos;t jump over another tiger.</p>
          <p>Rules for goats</p>
          <p>&bull; Goats can&apos;t move until all goats have been placed on the board.</p>
          <p>&bull; Can move to any adjacent free position in second phase.</p>
          <p>&bull; Can&apos;t jump over tigers or other goats.</p>
          <p>The game is over when either, all goats are captured by the tigers, or the goats have blocked the tigers from being able to move.</p>
          <p>If there is a stalemate and both players repeat the moves, the game ends in a draw if a particular position is repeated more than twice.</p>
        </Modal>
        </div>
    )
}