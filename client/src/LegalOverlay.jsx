import React, { useEffect, useState } from 'react'

export default function LegalOverlay(){
  const [accepted,setAccepted] = useState(false)
  const [showTerms,setShowTerms] = useState(false)
  const [showPrivacy,setShowPrivacy] = useState(false)

  useEffect(()=>{
    const ok = localStorage.getItem('acceptedLegal')
    if(ok) setAccepted(true)
  },[])

  function accept(){
    localStorage.setItem('acceptedLegal','true')
    setAccepted(true)
  }

  if(accepted) return null
  return (
    <div className='legal-overlay'>
      <div className='legal-box'>
        <h2>Bevor es losgeht 🚀</h2>
        <p>Bitte bestätige unsere <button className='link' onClick={()=>setShowTerms(true)}>AGB</button> und <button className='link' onClick={()=>setShowPrivacy(true)}>Datenschutzerklärung</button>.</p>
        <button className='accept-btn' onClick={accept}>Ich stimme zu ✅</button>

        {showTerms && (
          <div className='modal'>
            <div className='modal-content'>
              <button className='close' onClick={()=>setShowTerms(false)}>✕</button>
              <iframe src='/terms.html' title='AGB'></iframe>
            </div>
          </div>
        )}

        {showPrivacy && (
          <div className='modal'>
            <div className='modal-content'>
              <button className='close' onClick={()=>setShowPrivacy(false)}>✕</button>
              <iframe src='/privacy.html' title='Datenschutz'></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
