"use client";

import React, { useState, useEffect } from 'react';
import { HeartHandshake } from 'lucide-react';
import apekshaImg from '../assets/apeksha.png';

const SocialImpact = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 992);
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const burgundyTheme = {
        primary: '#9B1C31',
        secondary: '#722F37',
        bg: '#FDFBFB',
        accent: '#D9A0A8',
        lightBg: '#F9F1F2'
    };

    return (
        <section style={{ 
            margin: '0', 
            background: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'stretch',
            minHeight: '600px',
            width: '100%'
        }}>
            {/* Image Column */}
            <div style={{
                flex: '1',
                position: 'relative',
                minHeight: isMobile ? '350px' : '600px',
                overflow: 'hidden'
            }} className="animate-social-img">
                <img 
                    src={apekshaImg.src || apekshaImg} 
                    alt="Supporting Apeksha Hospital" 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%'
                    }}
                />
                {/* Creative gradient overlay to blend with content side */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isMobile 
                        ? `linear-gradient(to bottom, rgba(0,0,0,0.15) 50%, ${burgundyTheme.bg} 100%)`
                        : `linear-gradient(to right, rgba(0,0,0,0.15) 50%, ${burgundyTheme.bg} 100%)`,
                    pointerEvents: 'none'
                }}></div>
            </div>

            {/* Content Column */}
            <div style={{ 
                flex: '1.2', 
                background: `linear-gradient(135deg, ${burgundyTheme.bg} 0%, ${burgundyTheme.lightBg} 100%)`,
                padding: isMobile ? '48px 24px' : '100px 80px', 
                position: 'relative', 
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }} className="animate-social-text">
                <div style={{ marginBottom: '28px' }}>
                    <span style={{
                        color: burgundyTheme.primary,
                        fontSize: '14px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        display: 'block',
                        marginBottom: '12px'
                    }}>
                        Golden Hearts Project
                    </span>
                    <h2 style={{ 
                        fontSize: 'clamp(36px, 5vw, 48px)', 
                        fontWeight: '800', 
                        color: burgundyTheme.primary, 
                        margin: 0,
                        letterSpacing: '-1.5px',
                        lineHeight: '1.1',
                        fontFamily: 'var(--font-accent)'
                    }}>
                        Giving Back to Society
                    </h2>
                    <div style={{ 
                        height: '4px', 
                        width: '60px', 
                        background: burgundyTheme.primary, 
                        borderRadius: '2px',
                        marginTop: '16px'
                    }}></div>
                </div>

                <p style={{ 
                    fontSize: '19px', 
                    lineHeight: '1.8', 
                    color: '#444', 
                    marginBottom: '40px',
                    fontWeight: '400',
                    maxWidth: '620px'
                }}>
                    Through our <span style={{ color: burgundyTheme.primary, fontWeight: '800', fontStyle: 'italic' }}>"Golden hearts"</span> project, 
                    a portion of our profits directly supports patients at the 
                    <span style={{ color: burgundyTheme.primary, fontWeight: '800', borderBottom: '2px solid rgba(155, 28, 49, 0.2)', marginLeft: '6px' }}>
                        Apeksha Hospital
                    </span>, 
                    contributing to critical cancer care in Sri Lanka. 
                    Your choice to buy Mr. Pasta helps bring hope, care, and vital support to those in their most challenging times.
                </p>

                <div style={{ 
                    background: 'white', 
                    padding: '20px 28px', 
                    borderRadius: '100px',
                    border: '1px solid rgba(155, 28, 49, 0.12)',
                    display: 'inline-block',
                    boxShadow: '0 12px 30px rgba(155, 28, 49, 0.04)',
                    width: 'fit-content'
                }} className="hover-lift">
                    <div style={{ 
                        fontSize: '15px', 
                        fontWeight: '700', 
                        color: burgundyTheme.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{ 
                            background: burgundyTheme.primary, 
                            color: 'white', 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(155, 28, 49, 0.2)'
                        }}>
                            <HeartHandshake size={18} />
                        </div>
                        <span>Every Pack You Buy = A Small Contribution to Saving Lives</span>
                    </div>
                </div>
            </div>

            {/* Scope styles for animations */}
            <style>{`
                .animate-social-img {
                    opacity: 0;
                    transform: translateX(-40px);
                    animation: slideInSocialImg 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-social-text {
                    opacity: 0;
                    transform: translateX(40px);
                    animation: slideInSocialText 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
                }
                @keyframes slideInSocialImg {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInSocialText {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default SocialImpact;
