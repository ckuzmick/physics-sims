'use client'

import React, { useState } from 'react';
import Equation, { EquationInline } from '../wide/equation';

export default function LensBundleDemo() {
    const [angleDeg, setAngleDeg] = useState(1);
    const [focalLength, setFocalLength] = useState(2.0);

    const calculateLensBundle = () => {
        const theta = (angleDeg * Math.PI) / 180;
        const yFocus = focalLength * Math.tan(theta);

        const xStart = -1;
        const nRays = 7;
        const y0Offsets = Array.from({ length: nRays }, (_, i) => -1 + (2 * i) / (nRays - 1));

        const scale = 50;
        const lensHeight = 150;

        const lensRadius = focalLength * scale * 4;
        const curvature = Math.sqrt(lensRadius ** 2 - lensHeight ** 2) - lensRadius;

        const rays = y0Offsets.map(offset => {
            const y0 = offset;
            const yAtLens = y0 + (-xStart) * Math.tan(theta);

            const yScreen = 200 - yAtLens * scale;
            const yRelative = yScreen - 200;

            const discriminant = lensRadius ** 2 - yRelative ** 2;
            if (discriminant < 0) return null;

            const xOffset = lensRadius - Math.sqrt(discriminant);
            const xIntersect = 400 + xOffset + curvature;

            return {
                y0,
                yAtLens,
                xIntersect,
                yIntersect: yScreen
            };
        }).filter(Boolean);

        return { yFocus, rays, theta, scale, lensRadius, curvature, lensHeight };
    };

    const { yFocus, rays, theta, scale, lensRadius, curvature, lensHeight } = calculateLensBundle();

    return (
        <div className="lens-bundle-demo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
            <svg width="800" height="400" viewBox="0 0 800 400">
                {/* Lens as a circular cutout */}
                <path
                    d={`
                        M ${400} ${200 - lensHeight}
                        A ${lensRadius} ${lensRadius} 0 0 0 ${400} ${200 + lensHeight}
                    `}
                    stroke="blue"
                    strokeWidth="2"
                    fill="none"
                />

                <line
                    x1={400 + focalLength * scale}
                    y1="50"
                    x2={400 + focalLength * scale}
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
                        <line
                            x1="300"
                            y1={200 - ray.y0 * scale}
                            x2={ray.xIntersect}
                            y2={ray.yIntersect}
                            stroke="black"
                            strokeWidth="1"
                        />
                        <line
                            x1={ray.xIntersect}
                            y1={ray.yIntersect}
                            x2={400 + focalLength * scale}
                            y2={200 - yFocus * scale}
                            stroke="green"
                            strokeWidth="1"
                        />
                    </g>
                ))}

                {/* Focus point */}
                <circle
                    cx={400 + focalLength * scale}
                    cy={200 - yFocus * scale}
                    r="4"
                    fill="red"
                />

                {/* Labels */}
                <text x="390" y="40" textAnchor="middle" fontSize="14" fill="blue">Lens</text>
                <text x={400 + focalLength * scale} y="40" textAnchor="middle" fontSize="14" fill="red">Focal Plane</text>
                <text x={400 + focalLength * scale + 10} y={200 - yFocus * scale - 10} fontSize="12" fill="red">
                    Focus ({focalLength}m, {yFocus.toFixed(3)}m)
                </text>
            </svg>

            <div className="controls" style={{ display: 'flex', gap: '30px', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label><EquationInline text={`\\theta = ${angleDeg}\\deg`} /></label>
                    <input
                        type="range"
                        min="-50"
                        max="50"
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
                        max="10"
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
    );
}
