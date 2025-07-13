import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Helper: solve Kepler's equation for E given M and e
function solveKepler(M, e, tol = 1e-6, maxIter = 20) {
  let E = M;
  for (let i = 0; i < maxIter; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tol) break;
  }
  return E;
}

export default function OrbitingPlanetBase({
  semiMajor = 1.5,
  semiMinor = 1.2,
  sunRadius = 0.5,
  planetRadius = 0.15,
  orbitSpeed = 0.01, // interpreted as mean anomaly step per frame
  width = 800,
  height = 800,
}) {
  const mountRef = useRef(null);
  const meanAnomalyRef = useRef(0); // mean anomaly (M)
  const planetRef = useRef();
  const sunRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  // Store latest props in refs for animation loop
  const propsRef = useRef({ semiMajor, semiMinor, sunRadius, planetRadius, orbitSpeed, width, height });
  propsRef.current = { semiMajor, semiMinor, sunRadius, planetRadius, orbitSpeed, width, height };

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222233);
    mount.style.width = `${width}px`;
    mount.style.height = `${height}px`;
    sceneRef.current = scene;
    const aspect = width / height;
    const viewSize = 8;
    const camera = new THREE.OrthographicCamera(
      -viewSize * aspect / 2,
      viewSize * aspect / 2,
      viewSize / 2,
      -viewSize / 2,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Sun at right focus (ellipse always centered at (0,0))
    const a = semiMajor;
    const b = semiMinor;
    const e = Math.sqrt(1 - (b * b) / (a * a));
    const c = a * e;
    const sunGeometry = new THREE.SphereGeometry(sunRadius, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.7 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(c, 0, 0); // right focus, ellipse centered at (0,0)
    scene.add(sun);
    sunRef.current = sun;

    // Planet
    const planetGeometry = new THREE.SphereGeometry(planetRadius, 32, 32);
    const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x3399ff });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);
    planetRef.current = planet;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const sunLight = new THREE.PointLight(0xffee88, 1.2, 100);
    sunLight.position.copy(sun.position);
    scene.add(sunLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemiLight.position.set(0, 5, 0);
    scene.add(hemiLight);

    // OrbitControls (allow rotate, disable zoom/pan)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    let frameId;
    const animate = () => {
      // Use latest props
      const { semiMajor, semiMinor, sunRadius, planetRadius, orbitSpeed } = propsRef.current;
      const a = semiMajor;
      const b = semiMinor;
      const e = Math.sqrt(1 - (b * b) / (a * a));
      const c = a * e;
      // Advance mean anomaly (M)
      meanAnomalyRef.current += orbitSpeed;
      if (meanAnomalyRef.current > 2 * Math.PI) meanAnomalyRef.current -= 2 * Math.PI;
      // Solve Kepler's equation: M = E - e*sin(E)
      const M = meanAnomalyRef.current;
      const E = solveKepler(M, e);
      // True anomaly (theta): tan(theta/2) = sqrt((1+e)/(1-e)) * tan(E/2)
      const tanHalfTheta = Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2);
      const theta = 2 * Math.atan(tanHalfTheta);
      // r = a(1-e*cos(E))
      const r = a * (1 - e * Math.cos(E));
      // Position in orbital plane, ellipse always centered at (0,0), sun at right focus
      const x = r * Math.cos(theta) + c;
      const y = r * Math.sin(theta);
      if (planetRef.current) {
        planetRef.current.position.set(x, y, 0);
        // Update planet size if changed
        if (planetRef.current.geometry.parameters.radius !== planetRadius) {
          planetRef.current.geometry.dispose();
          planetRef.current.geometry = new THREE.SphereGeometry(planetRadius, 32, 32);
        }
      }
      if (sunRef.current) {
        sunRef.current.position.set(c, 0, 0);
        // Update sun size if changed
        if (sunRef.current.geometry.parameters.radius !== sunRadius) {
          sunRef.current.geometry.dispose();
          sunRef.current.geometry = new THREE.SphereGeometry(sunRadius, 32, 32);
        }
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      controls.dispose();
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    // eslint-disable-next-line
  }, []);

  // No need for a prop-change effect: animation loop reads latest props from ref

  return <div ref={mountRef} />;
}