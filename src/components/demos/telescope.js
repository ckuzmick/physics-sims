'use client'

import React, { useState } from 'react';
import Equation, { EquationInline } from '../wide/equation';

export default function LensBundleDemo() {
    const [angleDeg, setAngleDeg] = useState(1);
    const [focalLength, setFocalLength] = useState(2.0);

    const calculateLensBundle = () => {
        const theta = (angleDeg * Math.PI) / 180;
        const yFocus = focalLength * Math.tan(theta);

        const nRays = 7;
        const y0Offsets = Array.from({ length: nRays }, (_, i) => -1 + (2 * i) / (nRays - 1));
        const scale = 50;

        const rays = y0Offsets.map(offset => {
            const y0 = offset;
            const yAtLens = y0;
            
            // Calculate incoming ray starting point based on angle
            const startX = 50; // Start rays from left edge
            const lensX = 200; // Moved lens to left side
            const dx = lensX - startX;
            const startY = 200 - yAtLens * scale + dx * Math.tan(theta);

            return {
                y0,
                yAtLens,
                startX,
                startY,
                yIntersect: 200 - yAtLens * scale
            };
        });

        return { yFocus, rays, scale };
    };

    const { yFocus, rays, scale } = calculateLensBundle();
    const lensX = 200;
    const focalPlaneX = lensX + focalLength * scale;

    return (
        <>
        <div className="lens-bundle-demo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <svg width="800" height="400" viewBox="0 0 800 400">
                {/* Lens as a simple vertical line */}
                <line
                    x1={lensX}
                    y1="100"
                    x2={lensX}
                    y2="300"
                    stroke="blue"
                    strokeWidth="3"
                />

                {/* Focal plane */}
                <line
                    x1={focalPlaneX}
                    y1="50"
                    x2={focalPlaneX}
                    y2="350"
                    stroke="red"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                />

                {/* Ground line */}
                <line
                    x1="0"
                    y1="200"
                    x2="800"
                    y2="200"
                    stroke="#ccc"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                />

                {/* Rays */}
                {rays.map((ray, index) => (
                    <g key={index}>
                        {/* Incoming ray at angle */}
                        <line
                            x1={ray.startX}
                            y1={ray.startY}
                            x2={lensX}
                            y2={ray.yIntersect}
                            stroke="black"
                            strokeWidth="1"
                        />
                        {/* Outgoing ray to focus */}
                        <line
                            x1={lensX}
                            y1={ray.yIntersect}
                            x2={focalPlaneX}
                            y2={200 - yFocus * scale}
                            stroke="green"
                            strokeWidth="1"
                        />
                    </g>
                ))}

                {/* Focus point */}
                <circle
                    cx={focalPlaneX}
                    cy={200 - yFocus * scale}
                    r="4"
                    fill="red"
                />

                {/* Labels */}
                <text x={lensX} y="90" textAnchor="middle" fontSize="14" fill="blue">Lens</text>
                <text x={focalPlaneX} y="40" textAnchor="middle" fontSize="14" fill="red">Focal Plane</text>
                <text x={focalPlaneX + 10} y={200 - yFocus * scale - 10} fontSize="12" fill="red"></text>
            </svg>

            <div className="controls" style={{ display: 'flex', gap: '30px', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label><EquationInline text={`\\theta = ${angleDeg}\\deg`} /></label>
                    <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.1"
                        value={angleDeg}
                        onChange={(e) => setAngleDeg(parseFloat(e.target.value))}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label><EquationInline text={`f = ${focalLength}m`} /></label>
                    <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.1"
                        value={focalLength}
                        onChange={(e) => setFocalLength(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>All rays arriving at {angleDeg}° converge to (x = {focalLength}m, y = {yFocus.toFixed(3)}m) on the focal plane.</p>
            </div>

        </div>
        </>
    );
}
