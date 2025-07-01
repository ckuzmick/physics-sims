'use client'

import React, { useState, useCallback } from 'react';

const AngleConversions = () => {
    const [degrees, setDegrees] = useState(0);
    const [radians, setRadians] = useState(0);
    const [microradians, setMicroradians] = useState(0);
    const [arcminutes, setArcminutes] = useState(0);
    const [arcseconds, setArcseconds] = useState(0);

    const updateAllFromDegrees = useCallback((deg) => {
        const rad = (deg * Math.PI) / 180;
        const microrad = rad * 1000000;
        const arcmin = deg * 60;
        const arcsec = deg * 3600;

        setDegrees(deg);
        setRadians(rad);
        setMicroradians(microrad);
        setArcminutes(arcmin);
        setArcseconds(arcsec);
    }, []);

    const handleSliderChange = (e) => {
        const value = parseFloat(e.target.value);
        updateAllFromDegrees(value);
    };

    return (
        <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', width: '100%', maxWidth: '600px' }}>            
            <div style={{ marginBottom: '20px', width: '100%' }}>
                <input
                    type="range"
                    min={-360}
                    max={360}
                    step={0.1}
                    value={degrees}
                    onChange={handleSliderChange}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', width: '100%' }}>
                <div>
                    <strong>Degrees:</strong> {degrees.toFixed(6)}°
                    <br />
                    <em>Equation: deg = deg</em>
                </div>
                <div>
                    <strong>Radians:</strong> {radians.toFixed(6)} rad
                    <br />
                    <em>Equation: rad = deg × π/180</em>
                </div>
                <div>
                    <strong>Microradians:</strong> {microradians.toFixed(0)} μrad
                    <br />
                    <em>Equation: μrad = rad × 1,000,000</em>
                </div>
                <div>
                    <strong>Arcminutes:</strong> {arcminutes.toFixed(2)}&apos;
                    <br />
                    <em>Equation: arcmin = deg × 60</em>
                </div>
                <div>
                    <strong>Arcseconds:</strong> {arcseconds.toFixed(1)}&apos;&apos;
                    <br />
                    <em>Equation: arcsec = deg × 3600</em>
                </div>
            </div>
        </div>
    );
};

export default AngleConversions;
