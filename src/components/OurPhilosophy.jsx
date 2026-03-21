import React from 'react';

const PhilosophyCard = ({ emoji, title, description }) => (
    <div style={{
        flex: 1,
        textAlign: 'center',
        padding: '32px 24px',
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-gray-border)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        transition: 'var(--transition)',
        minWidth: '250px',
        maxWidth: '100%'
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
    }}>
        <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            display: 'block'
        }}>
            {emoji}
        </div>
        <h3 style={{ 
            fontSize: '22px', 
            fontWeight: '800', 
            marginBottom: '12px',
            fontFamily: 'var(--font-accent)',
            letterSpacing: '-0.5px'
        }}>
            {title}
        </h3>
        <p style={{ 
            fontSize: '15px', 
            color: 'rgba(26, 26, 26, 0.7)', 
            lineHeight: '1.6',
            maxWidth: '240px',
            margin: '0 auto'
        }}>
            {description}
        </p>
    </div>
);

const OurPhilosophy = () => {
    return (
        <section style={{ 
            marginBottom: '64px',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '40px' 
            }}>
                <h2 style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: 'var(--color-deep-black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontFamily: 'var(--font-accent)'
                }}>
                    <span style={{ fontSize: '28px' }}>🌟</span> Our Philosophy
                </h2>
            </div>

            <div style={{ 
                display: 'flex', 
                gap: '24px', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <PhilosophyCard 
                    emoji="🍝" 
                    title="Tasty" 
                    description="Delicious flavors that make every meal enjoyable" 
                />
                <PhilosophyCard 
                    emoji="🥗" 
                    title="Healthy" 
                    description="Nutritionally enriched pasta for modern lifestyles" 
                />
                <PhilosophyCard 
                    emoji="😊" 
                    title="Happy" 
                    description="Food that brings families and friends together" 
                />
            </div>
        </section>
    );
};

export default OurPhilosophy;
