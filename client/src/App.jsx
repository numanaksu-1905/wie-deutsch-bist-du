// client/src/App.jsx
import React, { useState } from 'react';
import BackgroundLayer from './BackgroundLayer';
import { sfx } from './sfx';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

/* ----------------- Kleine UI-Bausteine (inline) ----------------- */
function BigButton({ children, onClick, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        fontSize: 'clamp(16px, 2.6vw, 20px)',
        fontWeight: 700,
        padding: '16px 18px',
        border: '1px solid rgba(255,255,255,.12)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'transform .08s ease, box-shadow .12s ease, background .2s ease',
        boxShadow: '0 12px 28px rgba(0,0,0,.25)',
        color: '#fff',
        background:
          variant === 'primary'
            ? 'linear-gradient(180deg, rgba(0,153,255,.85), rgba(0,122,220,.85))'
            : 'linear-gradient(180deg, rgba(138,148,255,.85), rgba(95,105,230,.85))',
      }}
      onMouseDown={() => (sfx.click?.play?.(), null)}
      onTouchStart={() => (sfx.click?.play?.(), null)}
      onPointerDown={e => e.currentTarget.style.transform = 'scale(.98)'}
      onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {children}
    </button>
  );
}

function Card({ children }) {
  return (
    <div
      className="card"
      style={{
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 22,
        background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 20px 60px rgba(0,0,0,.45)',
        padding: 'clamp(18px, 2.6vw, 30px)',
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h1
      className="h1"
      style={{
        textAlign: 'center',
        fontSize: 'clamp(28px, 5vw, 46px)',
        lineHeight: 1.12,
        fontWeight: 800,
        letterSpacing: '-.02em',
        margin: '10px 0 6px',
      }}
    >
      {children}
    </h1>
  );
}

function Sub({ children }) {
  return (
    <p
      className="sub"
      style={{
        textAlign: 'center',
        color: '#8eacc2',
        margin: '0 0 18px',
        fontSize: 'clamp(14px, 2.2vw, 16px)',
      }}
    >
      {children}
    </p>
  );
}

/* ----------------- Start-Menü ----------------- */
function StartMenu({ onSolo, onMulti }) {
  return (
    <Card>
      <SectionTitle>Wie deutsch bist du?</SectionTitle>
      <Sub>Wähle deinen Modus</Sub>

      <div
        className="btns"
        style={{
          display: 'grid',
          gap: 18,
          gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
        }}
      >
        <BigButton
          variant="primary"
          onClick={() => {
            sfx.move?.play?.();
            onSolo();
          }}
        >
          Solo
        </BigButton>

        <BigButton
          variant="secondary"
          onClick={() => {
            sfx.move?.play?.();
            onMulti();
          }}
        >
          Multiplayer
        </BigButton>
      </div>

      <div
        style={{
          marginTop: 18,
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        }}
      >
        <div style={pillStyle('#36d6be')}>Einbürgerungstest</div>
        <div style={pillStyle('#ffcc4b')}>Allgemeinwissen</div>
        <div style={pillStyle('#ff7b9b')}>Deutschland-Kultur</div>
      </div>

      <p
        style={{
          opacity: .85,
          textAlign: 'center',
          marginTop: 16,
          fontSize: 13,
          color: '#b8c9d6',
        }}
      >
        Server:{' '}
        <code style={codeStyle}>{SOCKET_URL}</code>
      </p>
    </Card>
  );
}

const pillStyle = (c) => ({
  borderRadius: 999,
  padding: '10px 12px',
  textAlign: 'center',
  fontWeight: 700,
  color: '#0b1220',
  background: `linear-gradient(180deg, ${c}, ${c})`,
  border: '1px solid rgba(255,255,255,.25)',
  boxShadow: '0 10px 26px rgba(0,0,0,.28)',
});

const codeStyle = {
  background: 'rgba(255,255,255,.07)',
  padding: '2px 6px',
  borderRadius: 6,
  border: '1px solid rgba(255,255,255,.12)',
};

/* ----------------- Haupt-App ----------------- */
export default function App() {
  const [mode, setMode] = useState('menu'); // 'menu' | 'solo' | 'multi-menu'

  return (
    <>
      {/* Hintergrund aktivieren (das war Schritt 3) */}
      <BackgroundLayer />

      <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(20px, 3vw, 36px)' }}>
        {mode === 'menu' && (
          <StartMenu
            onSolo={() => setMode('solo')}
            onMulti={() => setMode('multi-menu')}
          />
        )}

        {mode === 'solo' && (
          <Card>
            <SectionTitle>Solo – Kategorien</SectionTitle>
            <Sub>Wähle eine Kategorie &nbsp;•&nbsp; Level & Punkte inklusive</Sub>

            <div
              style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
              }}
            >
              <BigButton onClick={() => alert('Einbürgerungstest – folgt in deinem nächsten Commit!')}>Einbürgerungstest</BigButton>
              <BigButton onClick={() => alert('Allgemeinwissen – folgt in deinem nächsten Commit!')}>Allgemeinwissen</BigButton>
              <BigButton onClick={() => alert('Deutschland-Kultur – folgt in deinem nächsten Commit!')}>Deutschland-Kultur</BigButton>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
              <BigButton variant="secondary" onClick={() => { sfx.move?.play?.(); setMode('menu'); }}>Zurück</BigButton>
            </div>
          </Card>
        )}

        {mode === 'multi-menu' && (
          <Card>
            <SectionTitle>Multiplayer</SectionTitle>
            <Sub>Spiele mit Freunden oder suche Gegner</Sub>

            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
              <BigButton onClick={() => alert('Mit Freunden – Lobby/Code – folgt im nächsten Schritt!')}>Mit Freunden</BigButton>
              <BigButton onClick={() => alert('Gegner-Suche – Matchmaking – folgt im nächsten Schritt!')}>Gegner suchen</BigButton>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
              <BigButton variant="secondary" onClick={() => { sfx.move?.play?.(); setMode('menu'); }}>Zurück</BigButton>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
