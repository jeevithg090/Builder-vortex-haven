import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Cross-shaped object component
const CrossObject = ({ position, color, rotationSpeed }: any) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
      meshRef.current.rotation.z += rotationSpeed.z;
    }
  });

  return (
    <Float
      speed={0.5}
      rotationIntensity={0.1}
      floatIntensity={0.1}
      floatingRange={[0, 0.5]}
    >
      <group ref={meshRef} position={position}>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Depth bar */}
        <mesh>
          <boxGeometry args={[0.3, 0.3, 2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    </Float>
  );
};

// Distortion shader material
const DistortionMaterial = ({ mousePosition, time }: any) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec2 uMouse;
    uniform float uTime;
    uniform vec3 uResolution;
    varying vec2 vUv;

    void main() {
      vec2 st = vUv;
      vec2 mouse = uMouse;
      
      // Calculate distance from mouse
      float dist = distance(st, mouse);
      
      // Create ripple effect
      float ripple = sin(dist * 30.0 - uTime * 8.0) * 0.1;
      ripple *= smoothstep(0.3, 0.0, dist);
      
      // Distortion based on distance from mouse
      vec2 distortion = normalize(st - mouse) * ripple;
      
      // Chromatic aberration
      float r = smoothstep(0.2, 0.0, dist);
      float g = smoothstep(0.15, 0.0, dist);
      float b = smoothstep(0.1, 0.0, dist);
      
      // Create iridescent effect
      vec3 color = vec3(r, g, b) * 0.5;
      color += sin(dist * 20.0 + uTime) * 0.2;
      
      // Add distortion overlay
      float distortionMask = smoothstep(0.25, 0.0, dist);
      color += distortionMask * 0.3;
      
      gl_FragColor = vec4(color, distortionMask * 0.8);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value = mousePosition;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector3(1, 1, 1) },
      }}
      transparent
      blending={THREE.AdditiveBlending}
    />
  );
};

// Mouse interaction overlay
const MouseInteraction = ({ onMouseMove }: any) => {
  const { size, viewport } = useThree();
  const [mousePosition, setMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5),
  );

  const handleMouseMove = (event: any) => {
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;

    const newPosition = new THREE.Vector2((x + 1) / 2, (y + 1) / 2);

    setMousePosition(newPosition);
    onMouseMove(newPosition);
  };

  return (
    <mesh position={[0, 0, 5]} onPointerMove={handleMouseMove}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <DistortionMaterial mousePosition={mousePosition} />
    </mesh>
  );
};

// Main scene component
const Scene = () => {
  const [mousePosition, setMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5),
  );

  // Generate random cross objects
  const crossObjects = useMemo(() => {
    const objects = [];
    const colors = ["#0000FF", "#000000", "#CCCCCC"];

    for (let i = 0; i < 50; i++) {
      objects.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
      });
    }
    return objects;
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* 3D Cross Objects */}
      {crossObjects.map((obj) => (
        <CrossObject
          key={obj.id}
          position={obj.position}
          color={obj.color}
          rotationSpeed={obj.rotationSpeed}
        />
      ))}

      {/* Mouse Interaction Overlay */}
      <MouseInteraction onMouseMove={setMousePosition} />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const StrikingBackground = () => {
  return (
    <div className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="absolute inset-0"
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>

      {/* Foreground Content Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white max-w-4xl px-8">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
            STRIKING
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-80 max-w-2xl mx-auto leading-relaxed">
            Experience the future of interactive design with immersive 3D
            environments that respond to your every move.
          </p>
        </div>
      </div>

      {/* Performance indicator */}
      <div className="absolute top-4 right-4 z-20 text-white/50 text-xs font-mono">
        WebGL Active
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/60 text-sm text-center">
        <p>Move your mouse to create ripple effects</p>
        <div className="mt-2 w-8 h-8 mx-auto border border-white/30 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default StrikingBackground;
