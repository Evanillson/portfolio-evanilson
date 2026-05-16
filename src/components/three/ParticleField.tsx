'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function Particles({ count = 1500, mouse, isLight }: { count?: number; mouse: React.MutableRefObject<[number, number]>, isLight?: boolean }) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 15;

      // Gradient colors
      const t = Math.random();
      if (isLight) {
        col[i3] = t * 0.1 + (1 - t) * 0;       // R: darker blues for light mode
        col[i3 + 1] = t * 0.3 + (1 - t) * 0.5; // G
        col[i3 + 2] = t * 0.8 + (1 - t) * 1;    // B
      } else {
        col[i3] = t * 0.54 + (1 - t) * 0;       // R
        col[i3 + 1] = t * 0.17 + (1 - t) * 0.94; // G
        col[i3 + 2] = t * 0.89 + (1 - t) * 1;    // B
      }
    }

    return [pos, col];
  }, [count]);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  // Create a circular texture dynamically with a soft glow
  const particleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(16, 16, 16, 0, Math.PI * 2);
      context.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const geometry = mesh.current.geometry;
    const positionAttr = geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();

    // Mouse influence
    const mouseX = (mouse.current[0] / window.innerWidth) * 2 - 1;
    const mouseY = -(mouse.current[1] / window.innerHeight) * 2 + 1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating motion
      posArray[i3] = originalPositions[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.15;
      posArray[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * 0.2 + i * 0.015) * 0.15;
      posArray[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * 0.1 + i * 0.005) * 0.1;

      // Parallax mouse reaction
      const dx = posArray[i3] - mouseX * viewport.width * 0.5;
      const dy = posArray[i3 + 1] - mouseY * viewport.height * 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) / 3;
        posArray[i3] += dx * force * 0.02;
        posArray[i3 + 1] += dy * force * 0.02;
      }
    }

    positionAttr.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={isLight ? 0.3 : 0.6}
        sizeAttenuation
        depthWrite={false}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        map={particleTexture}
        alphaTest={0.001}
      />
    </points>
  );
}

function ShootingStar({ delay = 0, color = '#00F0FF', isLight }: { delay?: number; color?: string, isLight?: boolean }) {
  const mesh = useRef<THREE.Points>(null);
  const [speed] = useState(() => 10 + Math.random() * 5);
  const trailLength = 40;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(trailLength * 3);
    const col = new Float32Array(trailLength * 3);
    const baseColor = new THREE.Color(color);
    
    for (let i = 0; i < trailLength; i++) {
      // Non-linear fade for the tail
      const intensity = Math.pow(1 - i / trailLength, 2); 
      col[i * 3] = baseColor.r * intensity;
      col[i * 3 + 1] = baseColor.g * intensity;
      col[i * 3 + 2] = baseColor.b * intensity;
    }
    return [pos, col];
  }, [color]);

  const particleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(8, 8, 8, 0, Math.PI * 2);
      context.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime() + delay;
    const progress = (time * speed) % 60; 
    
    const geometry = mesh.current.geometry;
    const posAttr = geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    const startX = 25;
    const startY = 15;
    const dirX = -1;
    const dirY = -0.6; // diagonal movement

    for (let i = 0; i < trailLength; i++) {
      // Trail points follow slightly behind
      const offset = progress - i * 0.15;
      posArray[i * 3] = startX + dirX * offset;
      posArray[i * 3 + 1] = startY + dirY * offset;
      posArray[i * 3 + 2] = -2;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={trailLength}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={trailLength}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={isLight ? 0.3 : 0.8}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}

export default function ParticleField() {
  const mouseRef = useRef<[number, number]>([0, 0]);
  const [particleCount, setParticleCount] = useState(1500);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth < 768;
    const isLowPerf = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    if (isMobile || isLowPerf) {
      setParticleCount(600);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = [e.clientX, e.clientY];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} mouse={mouseRef} isLight={isLight} />
        <ShootingStar color={isLight ? "var(--accent-primary)" : "var(--accent-primary)"} delay={0} isLight={isLight} />
        <ShootingStar color={isLight ? "#000000" : "#ffffff"} delay={25} isLight={isLight} />
      </Canvas>
    </div>
  );
}
