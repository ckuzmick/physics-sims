'use client'

import "@/styles/keplerthree.css";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const OrbitingPlanetBase = dynamic(() => import("@/components/demos/three-sample"), { ssr: false });

export default function KeplerPage() {
    const [dimensions, setDimensions] = useState({
        width: 88,
        height: 800,
    });

    React.useEffect(() => {
        function updateDimensions() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        updateDimensions(); // Set initial dimensions on mount
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <>
            <main>
                <h1>Kepler's Laws</h1>
                <OrbitingPlanetBase
                    planetRadius={0.10}
                    sunRadius={0.20}
                    semiMajor={5.00}
                    semiMinor={2.00}
                    orbitSpeed={0.01}
                    width={dimensions.width}
                    height={dimensions.height}
                />
                <p>
                    Kepler's laws describe the motion of planets around the Sun. They were formulated by Johannes Kepler in the early 17th century and are fundamental to our understanding of celestial mechanics. The three laws are:
                </p>
                <ul>
                    <li><strong>First Law (Law of Ellipses):</strong> Planets move in elliptical orbits with the Sun at one focus.</li>
                    <li><strong>Second Law (Law of Equal Areas):</strong> A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.</li>
                    <li><strong>Third Law (Harmonic Law):</strong> The square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit.</li>
                </ul>
            </main>
        </>
    )
}