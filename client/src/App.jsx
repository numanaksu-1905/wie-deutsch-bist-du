import React, { useState } from 'react'
import SoloGame from './SoloGame'
import MultiPlayer from './MultiPlayer'
import LegalOverlay from './LegalOverlay'

export default function App(){
  const [theme, setTheme] = useState('flag')
  const [mode, setMode] = useState(null)
  return (
    <div className={`app theme-${theme}`}>
      <LegalOverlay/>
      <header>
        <h1>🇩🇪 Wie deutsch bist du?</h1>
        <div>
          <button className="theme-btn" onClick={()=>setTheme(theme==='flag'?'tech':'flag')}>🎨 Theme wechseln</button>
        </div>
      </header>
      {!mode && (
        <div className="menu">
          <button onClick={()=>setMode('solo')}>🎯 Solo</button>
          <button className="btn-ghost" onClick={()=>setMode('multi')}>⚔️ Multiplayer</button>
        </div>
      )}
      {mode==='solo' && <SoloGame onBack={()=>setMode(null)}/>}
      {mode==='multi' && <MultiPlayer onBack={()=>setMode(null)}/>}
    </div>
  )
}
