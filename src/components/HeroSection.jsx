"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import bgImage from '../assets/hero_pasta_creative.png';

const HeroSection = () => {
  const router = useRouter();
  const texts = [
    "Premium Sri Lankan Pasta",
    "Gourmet Flavors, Healthy Choices",
    "Supporting Cancer Care",
    "Crafted for Perfection"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-premium-v4 full-bleed-v4"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${bgImage.src || bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/pasta_video.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay-v4" style={{ zIndex: 1 }}></div>

      <div className="hero-content-v4" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-left-v4" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 92, 0, 0.2)',
              color: 'var(--color-terracotta)',
              padding: '6px',
              borderRadius: '8px'
            }}>
              <Flame size={16} fill="var(--color-terracotta)" />
            </span>
            <span className="hero-subtitle-v4" style={{ margin: 0, letterSpacing: '4px', fontSize: '13px', fontWeight: '800' }}>
              ESTD 2024
            </span>
          </div>

          <div className="hero-text-container-v4">
            <h1 className={`hero-title-animated-v4 ${fade ? 'fade-in' : 'fade-out'}`} style={{ color: 'white', fontWeight: '800' }}>
              {texts[currentIndex]}
            </h1>
          </div>

          <p className="hero-description-v4" style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.7', marginBottom: '36px' }}>
            Experience the finest gourmet pasta, factory-direct from Sri Lanka.
            Healthy, delicious, and socially responsible.
          </p>

          <div className="hero-actions-v4">
            <button className="hero-btn-primary-v4 hover-scale" onClick={() => router.push('/products')} style={{
              boxShadow: '0 12px 24px rgba(255, 92, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Explore Our Collection
              <ArrowRight size={20} style={{ transition: 'transform 0.3s ease' }} className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Brand logo watermark overlay over video to cover default watermark */}
      <div className="hide-mobile" style={{
        position: 'absolute',
        bottom: '22px',
        right: '110px',
        zIndex: 2,
        opacity: 0.9,
        width: '68px',
        pointerEvents: 'none'
      }}>
        <img
          src="/logo-transparent.png"
          alt="Brand Watermark"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
