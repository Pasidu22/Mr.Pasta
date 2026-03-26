import React from 'react';

const PhilosophyCard = ({ emoji, title, description, delay, accentColor, bgColor }) => (
    <div style={{
        flex: 1,
        textAlign: 'center',
        padding: '32px 24px',
        background: bgColor || 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: `1px solid ${accentColor}22`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minWidth: '260px',
        maxWidth: '100%',
        animation: `fadeInUp 0.8s ease-out ${delay}s both`,
        position: 'relative',
        overflow: 'hidden'
    }}
    className="hover-card-premium"
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = `0 20px 40px ${accentColor}15`;
        e.currentTarget.style.borderColor = accentColor;
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.borderColor = `${accentColor}22`;
    }}>
        {/* Accent Bar */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            background: accentColor,
            opacity: 0.9
        }}></div>

        <div style={{
            width: '72px',
            height: '72px',
            background: `${accentColor}11`,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            marginBottom: '24px',
            margin: '0 auto 24px',
            transition: 'transform 0.4s ease'
        }}>
            {emoji}
        </div>
        <h3 style={{ 
            fontSize: '22px', 
            fontWeight: '800', 
            marginBottom: '12px',
            fontFamily: 'var(--font-accent)',
            letterSpacing: '-0.5px',
            color: 'var(--color-deep-black)'
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
            marginBottom: '60px',
            padding: '60px 24px',
            background: 'linear-gradient(135deg, #fff 0%, #FAF9F6 100%)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 92, 0, 0.05)',
            boxShadow: 'var(--shadow-premium)',
            margin: '0 0 60px 0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Soft decorative background circles */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255, 92, 0, 0.03)', borderRadius: '50%', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '250px', height: '250px', background: 'rgba(255, 92, 0, 0.02)', borderRadius: '50%', zIndex: 0 }}></div>

            <div style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                position: 'relative',
                zIndex: 1
            }}>
                <h2 style={{ 
                    fontSize: '38px', 
                    fontWeight: '800', 
                    color: 'var(--color-deep-black)',
                    textAlign: 'center',
                    width: '100%',
                    fontFamily: 'var(--font-accent)',
                    letterSpacing: '-1px',
                    margin: 0
                }}>
                    Our Philosophy
                </h2>
                <div style={{ width: '50px', height: '4px', background: 'var(--color-terracotta)', margin: '16px auto', borderRadius: '2px' }}></div>
            </div>

            <div style={{ 
                display: 'flex', 
                gap: '24px', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                <PhilosophyCard 
                    emoji="🍝" 
                    title="Tasty" 
                    description="Crafting authentic flavors that offer a truly gourmet dining experience." 
                    accentColor="#FF5C00"
                    bgColor="rgba(255, 92, 0, 0.02)"
                    delay={0.1}
                />
                <PhilosophyCard 
                    emoji="🥗" 
                    title="Healthy" 
                    description="Prioritizing clean ingredients and nutritional balance for a better lifestyle." 
                    accentColor="#2D6A4F"
                    bgColor="rgba(45, 106, 79, 0.02)"
                    delay={0.2}
                />
                <PhilosophyCard 
                    emoji="😊" 
                    title="Happy" 
                    description="Spreading joy and creating memorable connections through the love of pasta." 
                    accentColor="#FFB703"
                    bgColor="rgba(255, 183, 3, 0.02)"
                    delay={0.3}
                />
            </div>
        </section>
    );
};

export default OurPhilosophy;
