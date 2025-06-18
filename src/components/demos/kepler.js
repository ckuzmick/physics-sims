import { useRef, useState, useEffect } from 'react';

export default function BasicKeplerDemo() {

    const planetRef = useRef(null);
      const semiMajorAxis = 150;
      const sunMass = 100;
      const planetMass = 10;
      
      // Calculate semi-minor axis to maintain reasonable proportions
      const b = 100; // maintains aspect ratio
    
      useEffect(() => {
        const planet = planetRef.current;
        if (!planet) return;
    
        let angle = 0;
        const viewBoxWidth = Math.max(384, semiMajorAxis * 2 + 100);
        const centerX = viewBoxWidth / 2;
        const centerY = 128;
        const c = Math.sqrt(semiMajorAxis * semiMajorAxis - b * b);
        const sunX = centerX - c;
    
        function animate() {
          const x = centerX + semiMajorAxis * Math.cos(angle);
          const y = centerY + b * Math.sin(angle);
          
          const distanceToSun = Math.sqrt((x - sunX) ** 2 + (y - centerY) ** 2);
          
          // Adjust speed based on masses (simplified gravitational effect)
          const baseSpeed = 0.02;
          const massEffect = Math.sqrt(sunMass / 100); // Normalize to default sun mass
          const angularVelocity = baseSpeed * massEffect * (semiMajorAxis / distanceToSun) * 0.8;
          
          angle += angularVelocity;
          if (angle > 2 * Math.PI) angle -= 2 * Math.PI;
          
          planet.setAttribute("cx", x);
          planet.setAttribute("cy", y);
          
          requestAnimationFrame(animate);
        }
        
        animate();
      }, []);
    
      const viewBoxWidth = Math.max(384, semiMajorAxis * 2 + 100);
      const centerX = viewBoxWidth / 2;
  return (
    <div className="flex flex-col items-center space-y-6 p-6">

        <div className="relative w-full max-w-4xl h-80 bg-gradient-to-b from-gray-900 to-gray-800 
          border-2 border-gray-600 rounded-xl overflow-hidden mx-auto shadow-2xl">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/10 to-transparent"></div>
        <svg 
          width="100%" 
          height="320" 
          viewBox={`0 0 ${viewBoxWidth} 256`}
          className="absolute inset-0 drop-shadow-lg"
          preserveAspectRatio="xMidYMid meet"
        >
          
          {/* Elliptical orbit path */}
          <ellipse
            cx={centerX}
            cy="128"
            rx={semiMajorAxis}
            ry={b}
            fill="none"
            stroke="#444"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {/* Sun at one focus - size based on mass */}
          <circle
            cx={centerX - Math.sqrt(semiMajorAxis * semiMajorAxis - b * b)}
            cy="128"
            r={Math.max(6, 4 + (sunMass / 100) * 6)}
            fill="yellow"
            className="drop-shadow-lg"
          />
          
          {/* Orbiting planet - size based on mass */}
          <circle
            ref={planetRef}
            cx={centerX + semiMajorAxis}
            cy="128"
            r={Math.max(3, 2 + (planetMass / 50) * 6)}
            fill="blue"
            className="drop-shadow-md"
          />
        </svg>
      </div>
    </div>
  );
}

export function SliderKeplerDemo() {

    const planetRef = useRef(null);
      const [semiMajorAxis, setSemiMajorAxis] = useState(150);
      const [sunMass, setSunMass] = useState(100);
      const [planetMass, setPlanetMass] = useState(10);
      
      // Calculate semi-minor axis to maintain reasonable proportions
      const b = 100; // maintains aspect ratio
    
      useEffect(() => {
        const planet = planetRef.current;
        if (!planet) return;
    
        let angle = 0;
        const viewBoxWidth = Math.max(384, semiMajorAxis * 2 + 100);
        const centerX = viewBoxWidth / 2;
        const centerY = 128;
        const c = Math.sqrt(semiMajorAxis * semiMajorAxis - b * b);
        const sunX = centerX - c;
    
        function animate() {
          const x = centerX + semiMajorAxis * Math.cos(angle);
          const y = centerY + b * Math.sin(angle);
          
          const distanceToSun = Math.sqrt((x - sunX) ** 2 + (y - centerY) ** 2);
          
          // Adjust speed based on masses (simplified gravitational effect)
          const baseSpeed = 0.02;
          const massEffect = Math.sqrt(sunMass / 100); // Normalize to default sun mass
          const angularVelocity = baseSpeed * massEffect * (semiMajorAxis / distanceToSun) * 0.8;
          
          angle += angularVelocity;
          if (angle > 2 * Math.PI) angle -= 2 * Math.PI;
          
          planet.setAttribute("cx", x);
          planet.setAttribute("cy", y);
          
          requestAnimationFrame(animate);
        }
        
        animate();
      }, [semiMajorAxis, b, sunMass, planetMass]);
    
      const viewBoxWidth = Math.max(384, semiMajorAxis * 2 + 100);
      const centerX = viewBoxWidth / 2;
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="grid gap-6 w-full max-w-md">
          {/* Semi-Major Axis Slider */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3 text-center">
              Semi-Major Axis: <span className="text-blue-400 font-semibold">{semiMajorAxis}px</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="100"
                max="300"
                value={semiMajorAxis}
                onChange={(e) => setSemiMajorAxis(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:bg-blue-500 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-blue-400
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all
                        [&::-webkit-slider-thumb]:duration-150
                        [&::-webkit-slider-thumb]:hover:bg-blue-400
                        [&::-webkit-slider-thumb]:hover:shadow-xl
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:bg-blue-500
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((semiMajorAxis - 100) / 200) * 100}%, #374151 ${((semiMajorAxis - 100) / 200) * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>

          {/* Sun Mass Slider */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3 text-center">
              Sun Mass: <span className="text-yellow-400 font-semibold">{sunMass}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="50"
                max="200"
                value={sunMass}
                onChange={(e) => setSunMass(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:bg-yellow-500 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-yellow-400
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all
                        [&::-webkit-slider-thumb]:duration-150
                        [&::-webkit-slider-thumb]:hover:bg-yellow-400
                        [&::-webkit-slider-thumb]:hover:shadow-xl
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:bg-yellow-500
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #eab308 0%, #eab308 ${((sunMass - 50) / 150) * 100}%, #374151 ${((sunMass - 50) / 150) * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>

          {/* Planet Mass Slider */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3 text-center">
              Planet Mass: <span className="text-blue-400 font-semibold">{planetMass}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="50"
                value={planetMass}
                onChange={(e) => setPlanetMass(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:bg-green-500 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-green-400
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all
                        [&::-webkit-slider-thumb]:duration-150
                        [&::-webkit-slider-thumb]:hover:bg-green-400
                        [&::-webkit-slider-thumb]:hover:shadow-xl
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:bg-green-500
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((planetMass - 1) / 49) * 100}%, #374151 ${((planetMass - 1) / 49) * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-4xl h-80 bg-gradient-to-b from-gray-900 to-gray-800 
          border-2 border-gray-600 rounded-xl overflow-hidden mx-auto shadow-2xl">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/10 to-transparent"></div>
        <svg 
          width="100%" 
          height="320" 
          viewBox={`0 0 ${viewBoxWidth} 256`}
          className="absolute inset-0 drop-shadow-lg"
          preserveAspectRatio="xMidYMid meet"
        >
          
          {/* Elliptical orbit path */}
          <ellipse
            cx={centerX}
            cy="128"
            rx={semiMajorAxis}
            ry={b}
            fill="none"
            stroke="#444"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {/* Sun at one focus - size based on mass */}
          <circle
            cx={centerX - Math.sqrt(semiMajorAxis * semiMajorAxis - b * b)}
            cy="128"
            r={Math.max(6, 4 + (sunMass / 100) * 6)}
            fill="yellow"
            className="drop-shadow-lg"
          />
          
          {/* Orbiting planet - size based on mass */}
          <circle
            ref={planetRef}
            cx={centerX + semiMajorAxis}
            cy="128"
            r={Math.max(3, 2 + (planetMass / 50) * 6)}
            fill="blue"
            className="drop-shadow-md"
          />
        </svg>
      </div>
    </div>
  );
}