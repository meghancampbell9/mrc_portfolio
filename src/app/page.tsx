'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Environment, OrbitControls, Html } from '@react-three/drei';
import { Mesh } from 'three';
import styles from './page.module.css';
import ContactForm from './ContactForm';
import contactFormStyles from './ContactForm.module.css';

function AnimatedText({ isAnimationPaused }: { isAnimationPaused: boolean }) {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (meshRef.current && !isAnimationPaused) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });
  return (
    <Center>
      <mesh ref={meshRef}>
        {/* Shadow text */}
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={3.66}  // Increased from 3.05 to 3.66
          height={0.72}  // Increased from 0.6 to 0.72
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.072}  // Increased from 0.06 to 0.072
          bevelSize={0.072}  // Increased from 0.06 to 0.072
          bevelOffset={0}
          bevelSegments={5}
          position={[0, 0, -0.06]}  // Adjusted from -0.05 to -0.06
        >
          MRC
          <meshStandardMaterial color='#808080' metalness={0.5} roughness={0.5} />
        </Text3D>
        
        {/* Main text */}
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={3.6}  // Increased from 3 to 3.6
          height={0.72}  // Increased from 0.6 to 0.72
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.072}  // Increased from 0.06 to 0.072
          bevelSize={0.072}  // Increased from 0.06 to 0.072
          bevelOffset={0}
          bevelSegments={5}
        >
          MRC
          <meshStandardMaterial color='#C0C0C0' metalness={0.8} roughness={0.2} />
        </Text3D>
      </mesh>
    </Center>
  );
}

function NavigationText({ setShowContactForm }: { setShowContactForm: (show: boolean) => void }) {
  return (
    <group position={[0, -7.2, 0]}>  // Changed from -6 to -7.2
      <Center>
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={0.5}
          height={0.1}
          curveSegments={12}
        >
          WEB   ROBOTICS   PHOTOGRAPHY
          <meshStandardMaterial color='#202020' metalness={0} roughness={1} />
        </Text3D>
      </Center>
      <Center position={[0, -1.5, 0]}>
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={0.4}
          height={0.08}
          curveSegments={12}
          onClick={() => setShowContactForm(true)}
        >
          CONTACT
          <meshStandardMaterial color='#202020' metalness={0} roughness={1} />
        </Text3D>
      </Center>
    </group>
  );
}

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (showContactForm) {
      document.body.classList.add(contactFormStyles.noScroll);
    } else {
      document.body.classList.remove(contactFormStyles.noScroll);
    }
  }, [showContactForm]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Canvas camera={{ position: [0, 0, 18] }}>  // Changed from 15 to 18
          <Environment preset="studio" background />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedText isAnimationPaused={showContactForm} />
          <NavigationText setShowContactForm={setShowContactForm} />
          <OrbitControls enableZoom={false} enablePan={false} enabled={!showContactForm} />
        </Canvas>
      </div>
      {showContactForm && (
        <div className={contactFormStyles.overlay}>
          <ContactForm onClose={() => setShowContactForm(false)} />
        </div>
      )}
    </div>
  );
}
