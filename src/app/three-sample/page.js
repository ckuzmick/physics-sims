'use client'

import { useState } from "react";
import dynamic from "next/dynamic";

const OrbitingPlanetBase = dynamic(() => import("@/components/demos/three-sample"), { ssr: false });

export default function ThreePage() {
  const [planetRadius, setPlanetRadius] = useState(0.15);
  const [sunRadius, setSunRadius] = useState(0.5);
  const [semiMajor, setSemiMajor] = useState(1.5);
  const [semiMinor, setSemiMinor] = useState(1.2);
  const [orbitSpeed, setOrbitSpeed] = useState(0.01);

  // Helper to format numbers with fixed decimals
  const formatValue = (value, decimals = 2) => value.toFixed(decimals);

  // Calculate dynamic min and max for semiMinor based on semiMajor
  const semiMinorMin = semiMajor / 10;
  const semiMinorMax = semiMajor;

  return (
    <main style={{ padding: 32 }}>
      <h1>Minimal Orbiting Planet Demo</h1>
      <div style={{ display: "flex", gap: 32 }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Planet Radius:</span>
            <span style={{ fontFamily: "monospace", minWidth: 48, display: "inline-block", textAlign: "right" }}>
              {formatValue(planetRadius)}
            </span>
            <input
              type="range"
              min={0.05}
              max={0.5}
              step={0.01}
              value={planetRadius}
              onChange={e => setPlanetRadius(Number(e.target.value))}
            />
          </label>
          <br />
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Sun Radius:</span>
            <span style={{ fontFamily: "monospace", minWidth: 48, display: "inline-block", textAlign: "right" }}>
              {formatValue(sunRadius)}
            </span>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.01}
              value={sunRadius}
              onChange={e => setSunRadius(Number(e.target.value))}
            />
          </label>
          <br />
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Semi-Major Axis:</span>
            <span style={{ fontFamily: "monospace", minWidth: 48, display: "inline-block", textAlign: "right" }}>
              {formatValue(semiMajor)}
            </span>
            <input
              type="range"
              min={0.5}
              max={3.0}
              step={0.01}
              value={semiMajor}
              onChange={e => {
                const newMajor = Number(e.target.value);
                setSemiMajor(newMajor);
                // Clamp semiMinor if out of new bounds
                setSemiMinor(prev => Math.max(Math.min(prev, newMajor), newMajor / 10));
              }}
            />
          </label>
          <br />
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Semi-Minor Axis:</span>
            <span style={{ fontFamily: "monospace", minWidth: 48, display: "inline-block", textAlign: "right" }}>
              {formatValue(semiMinor)}
            </span>
            <input
              type="range"
              min={semiMinorMin}
              max={semiMinorMax}
              step={0.01}
              value={semiMinor}
              onChange={e => setSemiMinor(Number(e.target.value))}
            />
          </label>
          <br />
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Orbit Speed:</span>
            <span style={{ fontFamily: "monospace", minWidth: 48, display: "inline-block", textAlign: "right" }}>
              {formatValue(orbitSpeed, 3)}
            </span>
            <input
              type="range"
              min={0.001}
              max={0.05}
              step={0.001}
              value={orbitSpeed}
              onChange={e => setOrbitSpeed(Number(e.target.value))}
            />
          </label>
        </div>
        <OrbitingPlanetBase
          planetRadius={planetRadius}
          sunRadius={sunRadius}
          semiMajor={semiMajor}
          semiMinor={semiMinor}
          orbitSpeed={orbitSpeed}
        />
      </div>
    </main>
  );
}
