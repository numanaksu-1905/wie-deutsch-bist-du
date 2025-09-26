import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000')

export default function MultiPlayer({onBack}){
  const [room,setRoom] = useState('')
  const [joined,setJoined] = useState(false)
  const [me] = useState('Spieler'+Math.floor(Math.random()*1000))
  const [players,setPlayers] = useState({})

  useEffect(()=>{
    socket.on('updatePlayers', data => setPlayers(data||{}))
    return ()=>{ socket.off('updatePlayers') }
  },[])

  function join(){
    if(!room.trim()) return
    socket.emit('joinRoom',{room, playerName: me})
    setJoined(true)
  }
  function addPoints(){
    const my = players[me]||0
    socket.emit('sendScore', {room, playerName: me, score: my+10})
  }

  if(!joined){
    return (
      <div className='multi-menu'>
        <h2>⚔️ Multiplayer</h2>
        <input placeholder='Raumcode' value={room} onChange={e=>setRoom(e.target.value)} />
        <button onClick={join}>Beitreten</button>
        <button className='btn-ghost' onClick={onBack}>⬅️ Zurück</button>
      </div>
    )
  }

  return (
    <div className='multi-game'>
      <h2>Raum {room}</h2>
      <ul>
        {Object.keys(players).map(p=>(
          <li key={p}>
            <span>{p}</span>
            <div className='scorebar'><div style={{width: Math.min(100, players[p])+'%'}}/></div>
            <span>{players[p]}</span>
          </li>
        ))}
      </ul>
      <button onClick={addPoints}>+10 Punkte</button>
      <button className='btn-ghost' onClick={onBack}>⬅️ Menü</button>
    </div>
  )
}
