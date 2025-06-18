"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/demo.module.css";
import BasicKeplerDemo from "@/components/demos/kepler";
import Equation from "@/components/wide/equation";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.header}>Kepler&apos;s Laws</h1>
        <div className="text-gray-300 text-center max-w-2xl mb-6">
          <p className="mb-4">
            Johannes Kepler (1571-1630) was a German astronomer who discovered three fundamental laws 
            that describe planetary motion. His work revolutionized our understanding of the solar system 
            and laid the foundation for Newton&apos;s law of universal gravitation.
          </p>
          <ol className={styles.lawlist}>
            <li><strong>Law of Ellipses:</strong> Planets orbit the sun in elliptical paths with the sun at one focus.</li>
            <li><strong>Law of Equal Areas:</strong> A line connecting a planet to the sun sweeps equal areas in equal time intervals.</li>
            <li><strong>Harmonic Law:</strong> The square of a planet&apos;s orbital period is proportional to the cube of its average distance from the sun.</li>
          </ol>
        </div>
        
        <BasicKeplerDemo />
      
        <p className="text-gray-300 text-center mt-4 max-w-md mx-auto">
          The planet follows an elliptical orbit, moving faster when closer to the sun. 
          Adjust the sliders to change the orbit size, sun mass, and planet mass to observe how they affect the motion.
        </p>
        <Equation text="T^2 = \frac{4\pi^2}{GM}a^3" />
        
        <div className="text-gray-300 max-w-4xl mx-auto mt-8 mb-8">          
          <div className="space-y-6 text-justify">
            <p>
              Kepler&apos;s laws emerge from the fundamental principles of celestial mechanics and can be derived from Newton&apos;s laws of motion and universal gravitation. The gravitational force between two masses follows the inverse square law:
            </p>
            <Equation text="F = G\frac{m_1 m_2}{r^2}" />
            
            <p>
              For a planet orbiting the sun, this force provides the centripetal acceleration necessary for circular or elliptical motion. The gravitational potential energy of the system is given by:
            </p>
            <Equation text="U(r) = -G\frac{Mm}{r}" />
            
            <p>
              The total energy of the orbit combines kinetic and potential energy. For an elliptical orbit with semi-major axis <em>a</em>, the total energy is:
            </p>
            <Equation text="E = -\frac{GMm}{2a}" />
            
            <p>
              The eccentricity of an elliptical orbit relates to the angular momentum <em>L</em> and energy through:
            </p>
            <Equation text="e = \sqrt{1 + \frac{2EL^2}{GMm^3}}" />
            
            <p>
              Kepler&apos;s second law manifests through conservation of angular momentum. The areal velocity (area swept per unit time) remains constant:
            </p>
            <Equation text="\frac{dA}{dt} = \frac{L}{2m} = \frac{r^2\dot{\theta}}{2} = \text{constant}" />
            
            <p>
              At perihelion (closest approach) and aphelion (farthest point), the planet&apos;s velocity can be calculated using energy conservation:
            </p>
            <Equation text="v_{peri} = \sqrt{\frac{GM(1+e)}{a(1-e)}}" />
            <Equation text="v_{aph} = \sqrt{\frac{GM(1-e)}{a(1+e)}}" />
            
            <p>
              The orbital period derives from integrating over the complete elliptical path. Using the relationship between the mean anomaly <em>M</em> and time:
            </p>
            <Equation text="M = n(t - t_0) = \frac{2\pi}{T}(t - t_0)" />
            
            <p>
              where <em>n</em> is the mean motion. The eccentric anomaly <em>E</em> relates to the mean anomaly through Kepler&apos;s equation:
            </p>
            <Equation text="M = E - e\sin E" />
            
            <p>
              For small eccentricities, perturbation theory can approximate orbital elements. The secular changes in orbital parameters due to gravitational interactions follow:
            </p>
            <Equation text="\frac{da}{dt} = \frac{2a^2}{n}\sum_i \frac{\partial R}{\partial M_i}" />
            
            <p>
              where <em>R</em> represents the disturbing function from other celestial bodies. These equations form the foundation of modern orbital mechanics and space navigation, enabling precise predictions of planetary positions and spacecraft trajectories throughout the solar system.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
