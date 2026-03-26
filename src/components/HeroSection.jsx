import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg_image.png';

const HeroSection = () => {
  const navigate = useNavigate();
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
      }, 500); // Wait for fade out
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="hero-premium-v4 full-bleed-v4" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay-v4"></div>
      
      <div className="hero-content-v4">
        <div className="hero-left-v4">
          <span className="hero-subtitle-v4">ESTD 2024</span>
          <div className="hero-text-container-v4">
            <h1 className={`hero-title-animated-v4 ${fade ? 'fade-in' : 'fade-out'}`}>
              {texts[currentIndex]}
            </h1>
          </div>
          <p className="hero-description-v4">
            Experience the finest gourmet pasta, factory-direct from Sri Lanka. 
            Healthy, delicious, and socially responsible.
          </p>
          <div className="hero-actions-v4">
            <button className="hero-btn-primary-v4" onClick={() => navigate('/products')}>
              Explore Our Collection
              <ArrowRight size={20} style={{ marginLeft: '10px' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
