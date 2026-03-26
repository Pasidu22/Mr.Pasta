import React from 'react';
import sustainabilityBg from '../assets/sustainability_bg.png';

const SustainabilityQuality = () => {
    return (
        <section style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto 40px',
            minHeight: '450px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 1s ease-out'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${sustainabilityBg})`,
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
                background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
                zIndex: 2
            }}></div>

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 3,
                maxWidth: '1000px',
                padding: '0 40px',
                width: '100%',
                color: 'white'
            }}>
                <div style={{ maxWidth: '600px' }}>
                    <h2 style={{ 
                        fontSize: 'clamp(32px, 5vw, 42px)', 
                        fontWeight: '800', 
                        marginBottom: '24px',
                        fontFamily: 'var(--font-accent)',
                        lineHeight: '1.1',
                        wordBreak: 'break-word'
                    }}>
                        Sustainability & Quality
                    </h2>
                    <p style={{ 
                        fontSize: '18px', 
                        lineHeight: '1.8', 
                        marginBottom: '40px',
                        opacity: 0.9,
                        fontWeight: '400'
                    }}>
                        We source ingredients from local Sri Lankan farmers and produce under ISO 22000-certified standards, ensuring safe, sustainable, and premium-quality pasta.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        gap: '32px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '24px' }}>🌱</span>
                            <span style={{ fontSize: '15px', fontWeight: '600' }}>Local Sourcing</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '24px' }}>🛡️</span>
                            <span style={{ fontSize: '15px', fontWeight: '600' }}>Food Safety</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '24px' }}>🌍</span>
                            <span style={{ fontSize: '15px', fontWeight: '600' }}>Eco-friendly</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SustainabilityQuality;
