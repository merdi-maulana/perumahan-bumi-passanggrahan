'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

type SceneName = 'depan' | 'dalam';

interface TourProps {
  currentScene: SceneName;
  onNavigate: (scene: SceneName) => void;
}

// Komponen internal untuk mengatur Kamera dan Tekstur Dunia 360
const SceneManager = ({ currentScene, onNavigate }: TourProps) => {
  const { camera } = useThree();
  
  // Load kedua tekstur gambar 360° sekaligus
  const textures = {
    depan: useTexture('/halaman-depan.jpg'),
    dalam: useTexture('/ruang-tamu.jpg'),
  };

  // Referensi target FOV (Field of View) untuk efek zoom
  const targetFov = useRef(75);

  useEffect(() => {
    if (currentScene === 'dalam') {
      // Efek ketika masuk: persempit FOV untuk simulasi zoom-in mendalam
      targetFov.current = 30;
      
      const timer = setTimeout(() => {
        // Kembalikan FOV ke normal setelah transisi selesai
        targetFov.current = 75;
        camera.position.set(0, 0, 0); // reset posisi kamera di tengah ruangan baru
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentScene, camera]);

  // Loop animasi Three.js untuk memperhalus pergerakan zoom kamera (lerp)
  /* eslint-disable react-hooks/immutability */
  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.1);
      camera.updateProjectionMatrix();
    }
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group>
      
      <mesh scale={[-1, 1, 1]}> 
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial 
          map={textures[currentScene]} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      
      {currentScene === 'depan' && (
        <mesh 
          position={[5, -2, -15]} // Sesuaikan koordinat ini agar pas di atas pintu rumahmu
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('dalam'); // Pindah scene saat diklik
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#00ffcc" opacity={0.6} transparent wireframe />
        </mesh>
      )}
    </group>
  );
};

export default function VirtualTourCanvas({ currentScene, onNavigate }: TourProps) {
  return (
    <div className="w-full h-full absolute inset-0 bg-black">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <ambientLight intensity={1.5} />
        
        <SceneManager currentScene={currentScene} onNavigate={onNavigate}/>
        
        <OrbitControls 
          enableZoom={false} // dimatikan agar tidak merusak efek zoom kustom kita
          enablePan={false} 
          rotateSpeed={-0.4} // minus agar arah geser natural mengikuti mouse
        />
      </Canvas>
    </div>
  );
}