import React from 'react';
import apekshaImg from '../assets/apeksha.png';

const SocialImpact = () => {
    return (
        <section style={{ 
            margin: '80px 0', 
            background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF0F5 100%)',
            borderRadius: '40px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(255, 105, 180, 0.1)',
            border: '1px solid rgba(255, 192, 203, 0.3)',
            display: 'flex',
            flexDirection: window.innerWidth < 992 ? 'column' : 'row',
            alignItems: 'stretch',
            minHeight: '450px'
        }}>
            {/* Image Side with creative mask */}
            <div style={{
                flex: '1',
                position: 'relative',
                minHeight: '400px',
                overflow: 'hidden'
            }}>
                <img 
                    src={apekshaImg} 
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
                    background: window.innerWidth < 992 
                        ? 'linear-gradient(to bottom, transparent 70%, #FFF5F7 100%)'
                        : 'linear-gradient(to right, transparent 70%, #FFF5F7 100%)',
                    pointerEvents: 'none'
                }}></div>
                
            </div>

            {/* Content Side */}
            <div style={{ 
                flex: '1.2', 
                padding: '60px', 
                position: 'relative', 
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div style={{ marginBottom: '28px' }}>
                    <h2 style={{ 
                        fontSize: '38px', 
                        fontWeight: '800', 
                        color: '#C71585', 
                        margin: 0,
                        letterSpacing: '-1.5px',
                        lineHeight: '1.1'
                    }}>
                        Giving Back to Society
                    </h2>
                    <div style={{ 
                        height: '4px', 
                        width: '80px', 
                        background: '#DB7093', 
                        borderRadius: '2px',
                        marginTop: '12px'
                    }}></div>
                </div>

                <p style={{ 
                    fontSize: '19px', 
                    lineHeight: '1.7', 
                    color: '#444', 
                    marginBottom: '40px',
                    fontWeight: '500'
                }}>
                    Through our <span style={{ color: '#C71585', fontWeight: '800', fontStyle: 'italic' }}>"Golden hearts"</span> project, 
                    a portion of our profits supports patients at the 
                    <span style={{ color: '#C71585', fontWeight: '800', borderBottom: '2px solid rgba(199, 21, 133, 0.2)', marginLeft: '6px' }}>
                        Apeksha Hospital
                    </span>, 
                    contributing to critical cancer care in Sri Lanka. 
                    Your choice to buy Mr. Pasta helps bring hope, care, and vital support to those in their most challenging times.
                </p>

                <div style={{ 
                    background: 'white', 
                    padding: '24px 34px', 
                    borderRadius: '28px',
                    border: '1px solid rgba(255, 105, 180, 0.15)',
                    display: 'inline-block',
                    boxShadow: '0 15px 40px rgba(255, 105, 180, 0.08)',
                    width: 'fit-content'
                }} className="hover-lift">
                    <div style={{ 
                        fontSize: '18px', 
                        fontWeight: '700', 
                        color: '#C71585',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                    }}>
                        <div style={{ 
                            background: '#C71585', 
                            color: 'white', 
                            width: '32px', 
                            height: '32px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '16px'
                        }}>
                            🎗️
                        </div>
                        “Every Pack You Buy = A Small Contribution to Saving Lives”
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialImpact;
