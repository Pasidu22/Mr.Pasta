import React from 'react';

const PhilosophyCard = ({ emoji, title, description, delay }) => (
    <div style={{
        flex: 1,
        textAlign: 'center',
        padding: '40px 32px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 92, 0, 0.1)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minWidth: '280px',
        maxWidth: '100%',
        animation: `fadeInUp 0.8s ease-out ${delay}s both`,
        position: 'relative',
        overflow: 'hidden'
    }}
    className="hover-card-premium"
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 92, 0, 0.1)';
        e.currentTarget.style.borderColor = 'var(--color-terracotta)';
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 92, 0, 0.1)';
    }}>
        {/* Accent Bar */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'var(--color-terracotta)',
            opacity: 0.8
        }}></div>

        <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255, 92, 0, 0.05)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '42px',
            marginBottom: '28px',
            margin: '0 auto 28px',
            transition: 'transform 0.4s ease'
        }}>
            {emoji}
        </div>
        <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            marginBottom: '16px',
            fontFamily: 'var(--font-accent)',
            letterSpacing: '-0.5px',
            color: 'var(--color-deep-black)'
        }}>
            {title}
        </h3>
        <p style={{ 
            fontSize: '16px', 
            color: 'rgba(26, 26, 26, 0.7)', 
            lineHeight: '1.7',
            maxWidth: '260px',
            margin: '0 auto'
        }}>
            {description}
        </p>
    </div>
);

const OurPhilosophy = () => {
    return (
        <section style={{ 
            marginBottom: '80px',
            padding: '100px 60px',
            background: 'linear-gradient(135deg, #fff 0%, #FAF9F6 100%)',
            borderRadius: '40px',
            border: '1px solid rgba(255, 92, 0, 0.05)',
            boxShadow: 'var(--shadow-premium)',
            margin: '0 0 80px 0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Soft decorative background circles */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255, 92, 0, 0.03)', borderRadius: '50%', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '250px', height: '250px', background: 'rgba(255, 92, 0, 0.02)', borderRadius: '50%', zIndex: 0 }}></div>

            <div style={{ 
                textAlign: 'center', 
                marginBottom: '60px',
                position: 'relative',
                zIndex: 1
            }}>
                <span style={{ 
                    color: 'var(--color-terracotta)', 
                    fontSize: '14px', 
                    fontWeight: '800', 
                    textTransform: 'uppercase', 
                    letterSpacing: '6px',
                    marginBottom: '16px',
                    display: 'block'
                }}>OUR VALUES</span>
                <h2 style={{ 
                    fontSize: '42px', 
                    fontWeight: '800', 
                    color: 'var(--color-deep-black)',
                    textAlign: 'center',
                    width: '100%',
                    fontFamily: 'var(--font-accent)',
                    letterSpacing: '-1px'
                }}>
                    The Core Philosophy
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--color-terracotta)', margin: '20px auto', borderRadius: '2px' }}></div>
            </div>

            <div style={{ 
                display: 'flex', 
                gap: '32px', 
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
                    delay={0.1}
                />
                <PhilosophyCard 
                    emoji="🥗" 
                    title="Healthy" 
                    description="Prioritizing clean ingredients and nutritional balance for a better lifestyle." 
                    delay={0.2}
                />
                <PhilosophyCard 
                    emoji="😊" 
                    title="Happy" 
                    description="Spreading joy and creating memorable connections through the love of pasta." 
                    delay={0.3}
                />
            </div>
        </section>
    );
};

export default OurPhilosophy;
