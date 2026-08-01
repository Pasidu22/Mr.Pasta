import React from 'react';
import { Leaf, ShieldCheck, Globe } from 'lucide-react';
import sustainabilityBg from '../assets/sustainability_and_quality.png';

const SustainabilityQuality = () => {
    return (
        <section style={{
            position: 'relative',
            width: '100%',
            margin: '0',
            minHeight: '600px',
            borderRadius: '0',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 1.2s ease-out'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${sustainabilityBg.src || sustainabilityBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)',
                zIndex: 2
            }}></div>

            {/* Content Container aligned to 1200px site grid */}
            <div style={{
                position: 'relative',
                zIndex: 3,
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '120px 40px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <div style={{ maxWidth: '720px' }} className="animate-sustainability-text">
                    <span style={{ 
                        color: 'var(--color-terracotta)', 
                        fontSize: '14px', 
                        fontWeight: '800', 
                        letterSpacing: '5px', 
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '16px'
                    }}>
                        Ethically Crafted
                    </span>
                    <h2 style={{ 
                        fontSize: 'clamp(38px, 5.5vw, 54px)', 
                        fontWeight: '800', 
                        marginBottom: '24px',
                        fontFamily: 'var(--font-accent)',
                        lineHeight: '1.1',
                        wordBreak: 'break-word',
                        letterSpacing: '-1.5px'
                    }}>
                        Sustainability & Quality
                    </h2>
                    <p style={{ 
                        fontSize: '20px', 
                        lineHeight: '1.75', 
                        marginBottom: '40px',
                        opacity: 0.9,
                        fontWeight: '400',
                        maxWidth: '650px'
                    }}>
                        We source ingredients from local Sri Lankan farmers and produce under ISO 22000-certified standards, ensuring safe, sustainable, and premium-quality pasta.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        <div className="sustain-badge-v4">
                            <Leaf size={18} style={{ color: '#81C784' }} />
                            <span>Local Sourcing</span>
                        </div>
                        <div className="sustain-badge-v4">
                            <ShieldCheck size={18} style={{ color: '#64B5F6' }} />
                            <span>Food Safety Standard</span>
                        </div>
                        <div className="sustain-badge-v4">
                            <Globe size={18} style={{ color: '#FFB74D' }} />
                            <span>Eco-friendly Production</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Local scoped styles for transitions and entrance animation */}
            <style>{`
                .animate-sustainability-text {
                    opacity: 0;
                    transform: translateX(-40px);
                    animation: slideInLeftText 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
                }
                @keyframes slideInLeftText {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .sustain-badge-v4 {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 10px 22px;
                    border-radius: 100px;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    cursor: pointer;
                }
                .sustain-badge-v4:hover {
                    transform: translateY(-4px) scale(1.03);
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.35);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
                }
            `}</style>
        </section>
    );
};

export default SustainabilityQuality;
