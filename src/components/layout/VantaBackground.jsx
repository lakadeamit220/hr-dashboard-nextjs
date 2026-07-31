"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const myRef = useRef(null);

  useEffect(() => {

    if (!vantaEffect && scriptLoaded && window.VANTA && window.THREE && myRef.current) {
      try {
        // Vanta Globe doesn't work well on light backgrounds because of AdditiveBlending.
        // We override the blending mode of Three.js before initializing Vanta.
        const originalAdditive = window.THREE.AdditiveBlending;
        window.THREE.AdditiveBlending = window.THREE.NormalBlending;

        const effect = window.VANTA.GLOBE({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6,
          color2: 0x2563eb,
          backgroundColor: 0xffffff,
          size: 0.5
        });
        
        // Restore it just in case
        window.THREE.AdditiveBlending = originalAdditive;
        
        setVantaEffect(effect);
      } catch (error) {
        console.error("Vanta initialization failed:", error);
      }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect, scriptLoaded]);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" strategy="lazyOnload" onLoad={() => {
        setScriptLoaded(true); 
      }} />
      <div 
        ref={myRef} 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000" 
      />
    </>
  );
}
