import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8080', {forceNew: true}); // TODO: Change to correct URL

const Page = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
    const [link, setLink] = useState<string | null> (null);
    const [messages, setMessages] = useState<string[]>([]);

    // Define behavior upon rendering
    useEffect(() => {
        // Get current room info
        const params = new URLSearchParams(window.location.search);
        const room = params.get('room');
        if (room) {
            setRoomId(room);
            console.log("Emitting joinRoom")
            socket.emit('joinRoom', room);
        }

        // Define socket handling
        socket.on('gameMove', (move) => {
          console.log("Detect gameMove")
          addMessage(`Opponent move ${JSON.stringify(move)}`)
        })
        socket.on('playerJoined', (msg) => {
            console.log("Detect player joined")
          addMessage(msg);
        })
        socket.on('playerLeft', (msg) => {
          addMessage(msg);
        })

        // Cleanup functions
        return () => {
            socket.off('gameMove');
            socket.off('playerJoined');
            socket.off('playerLeft');
        };
    }, []);

    // Helper functions

    // Maintain message log to track application events
    const addMessage = (msg: string) => setMessages((prevMsgs) => [...prevMsgs, msg]);

    const createRoom = async() => {
        // Use backend to get roomId
        const res = await fetch('http://localhost:8080/create-room');
        const data = await res.json();
        setRoomId(data.roomId);
        setLink(`${window.location.origin}?room=${data.roomId}`);
            socket.emit('joinRoom', data.roomId);
            // Update URL without reload
            window.history.replaceState(null, '', `?room=${data.roomId}`);
    }

    const sendMove = () => {
        if (!roomId) return;
        const move = {x: Math.random()}
        
        // Emit event
        socket.emit('gameMove', {roomId, move});
        addMessage(`You send move: ${JSON.stringify(move)}`);
    };

    return (
        <div>
        {!roomId && <button onClick={createRoom}>Create Game</button>}

        {link && (
            <p>
              Share this link: <a href={link}>{link}</a>
            </p>
          )}

          {roomId && (
            <>
              <button onClick={sendMove}>Send Move</button>
              <div>
                {messages.map((m, i) => (
                  <p key={i}>{m}</p>
                ))}
              </div>
            </>
          )}
        </div>
    ); 
}

export default Page;