import React from 'react';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCard from '../components/ProductCard';
import PromoCarousel from '../components/PromoCarousel';
import OurPhilosophy from '../components/OurPhilosophy';
import SustainabilityQuality from '../components/SustainabilityQuality';
import SocialImpact from '../components/SocialImpact';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VisionMission from '../components/VisionMission';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';

const Home = () => {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', position: 'relative' }}>
            {/* Background Decorations */}
            <div className="blob blob-1 hide-mobile"></div>
            <div className="blob blob-2 hide-mobile"></div>
            <SEO 
                title="Home" 
                description="The best premium pasta in Sri Lanka. From factory-direct wholesale to healthy gluten-free options, Mr. Pasta brings gourmet dining to your home while supporting cancer care."
                keywords="Mr. Pasta, Sri Lanka, Premium Pasta, Gourmet, Healthy, Gluten-Free, Apeksha Hospital"
            />
            {/* Hidden H1 for SEO */}
            <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
                Mr. Pasta - Premium Sri Lankan Pasta & Gourmet Dining
            </h1>

            <HeroSection />

            <div className="main-container">
                <div style={{ marginBottom: '32px' }}>
                    <CategoryCarousel />
                </div>

                <div id="promo-offers">
                    <PromoCarousel />
                </div>
                
                <OurPhilosophy />

                <div id="sustainability">
                    <SustainabilityQuality />
                </div>
                
                <div id="social-impact">
                    <SocialImpact />
                </div>

                <Testimonials />

                {/* About Redirect Section */}
                <div style={{ padding: '80px 20px', background: 'var(--color-gray-soft)', textAlign: 'center', borderRadius: 'var(--radius-lg)', margin: '40px 0' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                        <span style={{ color: 'var(--color-terracotta)', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px' }}>Discover More</span>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-accent)', marginBottom: '16px' }}>Quality You Can Trust</h2>
                        <p style={{ fontSize: '18px', color: '#666', maxWidth: '800px', lineHeight: '1.6', margin: '0 auto 24px' }}>
                            We are a premium pasta brand dedicated to creating value-added pasta products that combine delicious taste, better nutrition, and joy at the table.
                        </p>
                        <Link to="/about" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            background: 'var(--color-terracotta)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '700',
                            fontSize: '16px',
                            transition: 'var(--transition)'
                        }} className="hover-scale">
                            Learn Our Story
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
