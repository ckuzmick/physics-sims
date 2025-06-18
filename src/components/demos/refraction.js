'use client'

import React, { useState } from 'react';
import Equation, { EquationInline } from '../wide/equation';


export default function RefractionDemo() {
    const [ior1, setIor1] = useState(1.0); // Air
    const [ior2, setIor2] = useState(1.5); // Glass
    const [incidentAngle, setIncidentAngle] = useState(30);

    const calculateRefraction = () => {
        const incidentRad = (incidentAngle * Math.PI) / 180;
        const sinRefracted = (ior1 / ior2) * Math.sin(incidentRad);
        
        if (Math.abs(sinRefracted) > 1) {
            return null; // Total internal reflection
        }
        
        return Math.asin(sinRefracted) * (180 / Math.PI);
    };

    const refractedAngle = calculateRefraction();

    return (
        <div className="refraction-demo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <svg width="600" height="400" viewBox="0 0 600 400">
                {/* Interface line - now vertical */}
                <line x1="300" y1="0" x2="300" y2="400" stroke="#333" strokeWidth="2" />
                
                {/* Normal line - now horizontal */}
                <line x1="0" y1="200" x2="600" y2="200" stroke="#ccc" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Incident ray */}
                <line 
                    x1={300 - 150 * Math.cos((incidentAngle * Math.PI) / 180)}
                    y1={200 - 150 * Math.sin((incidentAngle * Math.PI) / 180)}
                    x2="300"
                    y2="200"
                    stroke="black"
                    strokeWidth="2"
                />
                
                {/* Refracted ray */}
                {refractedAngle !== null && (
                    <line 
                        x1="300"
                        y1="200"
                        x2={300 + 150 * Math.cos((refractedAngle * Math.PI) / 180)}
                        y2={200 + 150 * Math.sin((refractedAngle * Math.PI) / 180)}
                        stroke="black"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                    />
                )}
                
                {/* Arrow marker */}
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                                    refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                </defs>
                
                {/* Labels */}
                <text x="20" y="30" fontSize="16">Medium 1 (n = {ior1})</text>
                <text x="420" y="30" fontSize="16">Medium 2 (n = {ior2})</text>
            </svg>
            
            <div className="controls" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label><EquationInline text={`n_1 = ${ior1}`} /></label>
                    <input 
                        type="range" 
                        min="1.0" 
                        max="2.0" 
                        step="0.1" 
                        value={ior1}
                        onChange={(e) => setIor1(parseFloat(e.target.value))}
                    />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label><EquationInline text={`n_2 = ${ior2}`} /></label>
                    <input 
                        type="range" 
                        min="1.0" 
                        max="2.5" 
                        step="0.1" 
                        value={ior2}
                        onChange={(e) => setIor2(parseFloat(e.target.value))}
                    />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label><EquationInline text={`\\theta _i = ${incidentAngle} \\deg`} /></label>
                    <input 
                        type="range" 
                        min="0" 
                        max="89" 
                        value={incidentAngle}
                        onChange={(e) => setIncidentAngle(parseInt(e.target.value))}
                    />
                </div>
                
                <div style={{ marginLeft: '20px', fontSize: '16px', fontWeight: 'bold' }}>
                    {refractedAngle !== null ? (
                        <span>Refracted Angle: {refractedAngle.toFixed(1)}°</span>
                    ) : (
                        <span style={{ color: 'red' }}>Total Internal Reflection</span>
                    )}
                </div>
            </div>
        </div>
    );
}

