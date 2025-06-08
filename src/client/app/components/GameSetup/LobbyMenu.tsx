import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CopyLinkButton from '../CopyButton/CopyButton';

const socket: Socket = io('http://localhost:8080', { forceNew: true }); // TODO: Change to correct URL

const LobbyMenu = (props: any) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [playerCt, setPlayerCt] = useState<number>(0);

  // Define behavior upon rendering
  useEffect(() => {
    // Get current room info
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
      setRoomId(room);
      socket.emit('joinRoom', room);
      setLink(`${window.location.origin}?room=${room}`);
    }

    // Define socket handling
    socket.on('gameMove', ({move, timestamp, senderId}) => {
      const isOwnMove = senderId === socket.id;

      if (isOwnMove) {
        addMessage(`You move ${JSON.stringify(move)}`, timestamp)
      } else {
      addMessage(`Opponent move ${JSON.stringify(move)}`, timestamp)
      }
    })
    socket.on('playerJoined', ({msg, timestamp}) => {
      addMessage(msg, timestamp);
    })
    socket.on('playerLeft', ({msg, timestamp}) => {
      addMessage(msg, timestamp);
    })
    socket.on('playerCtUpdate', (ct) => {
      setPlayerCt(ct);
    })
    socket.on('roomFull', (msg) => {
      props.setRoomFull(msg);
    })

    // Cleanup functions
    return () => {
      socket.off('gameMove');
      socket.off('playerJoined');
      socket.off('playerLeft');
      socket.off('roomFull');
      socket.off('playerCtUpdate');

    };
  }, []);

  // Maintain message log to track application events
  const addMessage = (msg: string, time: string) => {
    setMessages(prevMsgs => [`[${time}] ${msg}`, ...prevMsgs]);
  };

  const createRoom = async () => {
    // Emit the event
    socket.emit('createRoom');

    // Listen once for the server response with the roomId
    socket.once('roomCreated', (roomId: string) => {
      setRoomId(roomId);
      setLink(`${window.location.origin}?room=${roomId}`);

      // Join the room officially on the server
      socket.emit('joinRoom', roomId);

      // Optionally update URL without reload
      window.history.replaceState(null, '', `?room=${roomId}`);
    });
  }

  const sendMove = () => {
    if (!roomId) return;
    const move = "Text here";

    // Emit event
    socket.emit('gameMove', { roomId, move });
  };

  return (
    <div>
      {!roomId && <button onClick={createRoom}>Create Game</button>}

      {(link || roomId) && (
        <div>
          <span>
            Room link: {link} <CopyLinkButton link={link} />
          </span>
          <div> Online: {playerCt}/2</div>
        </div>
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

export default LobbyMenu;