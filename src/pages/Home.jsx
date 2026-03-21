import React from 'react';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCard from '../components/ProductCard';
import PromoCarousel from '../components/PromoCarousel';
import OurPhilosophy from '../components/OurPhilosophy';
import SustainabilityQuality from '../components/SustainabilityQuality';
import SocialImpact from '../components/SocialImpact';
import WhoWeAre from '../components/WhoWeAre';
import VisionMission from '../components/VisionMission';

const Home = () => {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out', width: '100%' }}>
            <div style={{ marginBottom: '32px' }}>
                <CategoryCarousel />
            </div>

            <div id="hero">
                <PromoCarousel />
            </div>
            
            <OurPhilosophy />

            <div id="sustainability">
                <SustainabilityQuality />
            </div>
            
            <div id="social-impact">
                <SocialImpact />
            </div>
            
            <div id="who-we-are">
                <WhoWeAre />
            </div>

            <div id="vision-mission">
                <VisionMission />
            </div>
        </div>
    );
};

export default Home;
