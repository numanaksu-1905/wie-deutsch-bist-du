import React, { useState } from 'react'

function beep(type='good'){
  const ctx = new (window.AudioContext||window.webkitAudioContext)()
  const o = ctx.createOscillator(); const g = ctx.createGain()
  o.connect(g); g.connect(ctx.destination)
  o.type = 'sine'; o.frequency.value = type==='good'? 880 : (type==='level'? 1200 : 220)
  g.gain.setValueAtTime(0.001, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime+0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.25)
  o.start(); o.stop(ctx.currentTime+0.26)
}

const categories = {
  'Einbürgerungstest':[
    { q:'Welche Farben hat die deutsche Flagge?', a:['Schwarz-Rot-Gold','Blau-Weiß','Rot-Weiß-Rot','Grün-Weiß'], c:0 },
    { q:'Wie viele Bundesländer hat Deutschland?', a:['12','14','16','18'], c:2 }
  ],
  'Deutschland-Fakten':[
    { q:'In welcher Stadt steht das Brandenburger Tor?', a:['München','Berlin','Hamburg','Köln'], c:1 },
    { q:'Welcher Fluss fließt durch Köln?', a:['Elbe','Donau','Rhein','Spree'], c:2 }
  ],
  'Sprichwörter':[
    { q:"Vervollständige: 'Viele Köche ...'", a:['... bringen Glück.','... verderben den Brei.','... machen satt.','... gehen in die Küche.'], c:1 }
  ],
  'Memes':[
    { q:'Was bestellt ein typischer Alman im Restaurant?', a:['Nur Leitungswasser','Extra Ketchup','Den Chefkoch','Noch eine Steuererklärung'], c:0 }
  ],
  'Allgemein':[
    { q:'Welche Stadt ist die Hauptstadt von Deutschland?', a:['Hamburg','Berlin','München','Bonn'], c:1 }
  ]
}

const feedback = {
  high:['🔥 Alman-Level 100!','🚀 Unaufhaltsam, Ehrenbürger!','👑 Kanzler-Vibes!'],
  mid:['😅 Da geht noch was!','👏 Stabile Leistung!','📚 Solide – weiter so!'],
  low:['🙈 Deutsch light!','😂 Nochmal üben!','🤔 Fast geschafft!']
}

export default function SoloGame({onBack}){
  const [category,setCategory] = useState(null)
  const [i,setI] = useState(0)
  const [score,setScore] = useState(0)
  const [level,setLevel] = useState(1)
  const [xp,setXp] = useState(0)
  const [done,setDone] = useState(false)
  const [picked,setPicked] = useState(-1)

  function pickCat(cat){ setCategory(cat); setI(0); setScore(0); setLevel(1); setXp(0); setDone(false) }

  function choose(idx){
    if(picked>=0) return;
    setPicked(idx)
    const q = categories[category][i]
    const correct = idx===q.c
    if(correct){
      beep('good')
      const ns = score+10; const nx = xp+12
      setScore(ns); setXp(nx)
      if(nx%60===0){ setLevel(level+1); beep('level') }
    }else{
      beep('bad')
    }
    setTimeout(()=>{
      setPicked(-1)
      if(i+1<categories[category].length){ setI(i+1) }
      else{ setDone(true) }
    }, 550)
  }

  function comment(){
    const total = categories[category].length*10
    const p = score/total
    const pool = p>0.75? feedback.high : p>0.4? feedback.mid : feedback.low
    return pool[Math.floor(Math.random()*pool.length)]
  }

  if(!category){
    return (
      <div className='solo-menu'>
        <h2>Kategorie wählen</h2>
        {Object.keys(categories).map(cat=>(
          <button key={cat} onClick={()=>pickCat(cat)}>{cat}</button>
        ))}
        <button className='btn-ghost' onClick={onBack}>⬅️ Zurück</button>
      </div>
    )
  }

  if(done){
    return (
      <div className='solo-result'>
        <h2>Ergebnis</h2>
        <p>Punkte: {score}</p>
        <p>Level: {level} • XP: {xp}</p>
        <p>{comment()}</p>
        <button onClick={()=>pickCat(null)}>🔄 Neu starten</button>
        <button className='btn-ghost' onClick={onBack}>⬅️ Menü</button>
      </div>
    )
  }

  const q = categories[category][i]
  return (
    <div className='solo-game'>
      <div className='hud'>
        <span className='badge'>Level {level}</span>
        <span className='badge'>XP {xp}</span>
        <span className='badge'>Punkte {score}</span>
      </div>
      <h2>{category}</h2>
      <p>{q.q}</p>
      <div className='answers'>
        {q.a.map((ans,idx)=>{
          let cls=''; if(picked>=0){ cls = idx===q.c? 'correct':'wrong'; if(idx!==picked && idx!==q.c) cls='' }
          return <button key={idx} className={cls} onClick={()=>choose(idx)}>{ans}</button>
        })}
      </div>
      <p className='muted'>Frage {i+1} / {categories[category].length}</p>
      <button className='btn-ghost' onClick={onBack}>⬅️ Menü</button>
    </div>
  )
}
