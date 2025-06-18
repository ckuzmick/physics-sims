"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/demo.module.css";
import RefractionDemo from "@/components/demos/refraction";
import Equation from "@/components/wide/equation";
import LensBundleDemo from "@/components/demos/telescope";

export default function TelescopePage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.header}>Telescope Optics</h1>
                <div className="text-gray-300 text-center max-w-2xl mb-6">
                    <p className="mb-4">
                        Telescopes use the principles of refraction and reflection to magnify distant objects. 
                        Understanding how light bends as it passes through different materials is fundamental 
                        to telescope design and optical systems.
                    </p>
                </div>
                
                <RefractionDemo />
            
                <p className="text-gray-300 text-center mt-4 max-w-md mx-auto">
                    Observe how light rays bend when passing through different optical elements. 
                    Adjust the parameters to see how refraction affects the focusing of light.
                </p>

                <LensBundleDemo />
                
                <div className="text-gray-300 max-w-4xl mx-auto mt-8 mb-8">          
                    <div className="space-y-6 text-justify">
                        <p>
                            Refraction occurs when light passes from one medium to another with different optical densities. 
                            Snell&apos;s law governs this behavior:
                        </p>
                        <Equation text="n_1 \sin \theta_1 = n_2 \sin \theta_2" />
                        
                        <p>
                            where n₁ and n₂ are the refractive indices of the two media, and θ₁ and θ₂ are the angles 
                            of incidence and refraction respectively. This principle enables lenses to focus light 
                            and create magnified images in telescopes.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}