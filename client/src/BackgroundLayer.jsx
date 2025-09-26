// client/src/BackgroundLayer.jsx
import React from 'react';
import './index.css';

/**
 * Hintergrund-Layer: Verlauf + SVG-Grafik
 * Wird in App.jsx ganz oben eingebunden.
 */
export default function BackgroundLayer() {
  return (
    <>
      <div className="bg-grad" aria-hidden="true"></div>
      <img className="bg" src="/bg.svg" alt="" aria-hidden="true" />
    </>
  );
}
