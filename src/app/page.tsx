'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Environment, OrbitControls, Html } from '@react-three/drei';
import { Mesh } from 'three';
import styles from './page.module.css';
import ContactForm from './ContactForm';
import contactFormStyles from './ContactForm.module.css';
import { useIsMobile } from './useIsMobile';

function AnimatedText({ isAnimationPaused, isMobile }: { isAnimationPaused: boolean, isMobile: boolean }) {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (meshRef.current && !isAnimationPaused) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });
  return (
    <Center position={[0, isMobile ? 2 : 0, 0]}>  {/* Added z-coordinate */}
      <mesh ref={meshRef}>
        {!isMobile && (
          // Shadow text (only render on non-mobile devices)
          <Text3D
            font='/fonts/helvetiker_regular.typeface.json'
            size={3.66}
            height={0.72}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.072}
            bevelSize={0.072}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, 0, -0.06]}
          >
            MRC
            <meshStandardMaterial color='#808080' metalness={0.5} roughness={0.5} />
          </Text3D>
        )}
        
        {/* Main text */}
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={isMobile ? 1.8 : 3.6}  // Adjust size for mobile
          height={isMobile ? 0.36 : 0.72}  // Adjust height for mobile
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

function NavigationText({ setShowContactForm, isMobile }: { setShowContactForm: (show: boolean) => void, isMobile: boolean }) {
  return (
    <group position={[0, isMobile ? -2 : -7.2, 0]}>  // Adjust position for mobile
      <Center>
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={isMobile ? 0.3 : 0.5}  // Adjust size for mobile
          height={isMobile ? 0.06 : 0.1}  // Adjust height for mobile
          curveSegments={12}
        >
          WEB   ROBOTICS   PHOTOGRAPHY
          <meshStandardMaterial color='#202020' metalness={0} roughness={1} />
        </Text3D>
      </Center>
      <Center position={[0, isMobile ? -1 : -1.5, 0]}>  // Adjust position for mobile
        <Text3D
          font='/fonts/helvetiker_regular.typeface.json'
          size={isMobile ? 0.24 : 0.4}  // Adjust size for mobile
          height={isMobile ? 0.048 : 0.08}  // Adjust height for mobile
          curveSegments={12}
        >
          CONTACT
          <meshStandardMaterial color='#202020' metalness={0} roughness={1} />
        </Text3D>
        <Html>
          <div 
            className={styles.clickableOverlay}
            onClick={() => setShowContactForm(true)}
          />
        </Html>
      </Center>
    </group>
  );
}

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const isMobile = useIsMobile();

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
        <Canvas camera={{ position: [0, 0, isMobile ? 10 : 18] }}>  // Adjust camera position for mobile
          <Environment preset="studio" background />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedText isAnimationPaused={showContactForm} isMobile={isMobile} />
          <NavigationText setShowContactForm={setShowContactForm} isMobile={isMobile} />
          <OrbitControls enableZoom={false} enablePan={false} enabled={!showContactForm} />
        </Canvas>
      </div>
      {showContactForm && (
        <div className={`${contactFormStyles.overlay} ${isMobile ? contactFormStyles.mobileOverlay : ''}`}>
          <ContactForm onClose={() => setShowContactForm(false)} />
        </div>
      )}
    </div>
  );
}
