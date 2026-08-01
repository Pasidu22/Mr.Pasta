import React from 'react';
import tastyImg from '../assets/tasty.png';
import healthyImg from '../assets/healthy.png';
import happyImg from '../assets/happy.png';

const PhilosophyCard = ({ image, title, description, animationClass }) => (
    <div 
        style={{
            flex: 1,
            textAlign: 'center',
            padding: '48px 32px',
            minWidth: '280px',
            maxWidth: '100%',
            minHeight: '420px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
            opacity: 0
        }}
        className={`philosophy-card-v4 ${animationClass}`}
    >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flexGrow: 1 }}>
            {/* White circular icon container */}
            <div 
                className="phi-icon-circle-v4"
                style={{
                    width: '96px',
                    height: '96px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                <img 
                    src={image.src || image} 
                    alt={title} 
                    className="phi-icon-img-v4"
                    style={{ width: '52px', height: '52px', objectFit: 'contain', transition: 'all 0.4s ease' }}
                />
            </div>
            
            <h3 style={{ 
                fontSize: '26px', 
                fontWeight: '800', 
                marginBottom: '16px',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '-0.5px',
                color: '#FFFFFF'
            }}>
                {title}
            </h3>
            
            <p style={{ 
                fontSize: '15px', 
                color: 'rgba(255, 255, 255, 0.95)', 
                lineHeight: '1.7',
                maxWidth: '260px',
                margin: '0 auto 28px',
                fontWeight: '500'
            }}>
                {description}
            </p>
        </div>

        {/* Small arrow indicator → Learn More */}
        <div 
            className="phi-arrow-link-v4"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
        >
            <span>Learn More</span>
            <span style={{ fontSize: '16px', transition: 'transform 0.3s ease' }}>→</span>
        </div>
    </div>
);

const OurPhilosophy = () => {
    return (
        <section style={{ 
            width: '100%',
            padding: '140px 40px',
            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5E00 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
            margin: '40px 0 0 0'
        }}>
            {/* Fine grid overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 0)',
                backgroundSize: '28px 28px',
                pointerEvents: 'none',
                opacity: 0.6,
                zIndex: 0
            }}></div>

            {/* Elegant organic glow overlays */}
            <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: '450px', height: '450px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '450px', height: '450px', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}></div>

            <div style={{ 
                textAlign: 'center', 
                marginBottom: '68px',
                position: 'relative',
                zIndex: 1
            }}>
                <span style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    display: 'block',
                    marginBottom: '16px'
                }}>Core Values</span>
                <h2 style={{ 
                    fontSize: '60px', 
                    fontWeight: '800', 
                    color: '#FFFFFF',
                    textAlign: 'center',
                    width: '100%',
                    fontFamily: 'var(--font-accent)',
                    letterSpacing: '-1.5px',
                    lineHeight: '1.1',
                    margin: '0 0 20px 0'
                }}>
                    Our Philosophy
                </h2>
                
                {/* Subheading tagline */}
                <p style={{
                    fontSize: '18px',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    margin: '0 auto 24px',
                    maxWidth: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                }}>
                    <span>Fresh Ingredients.</span>
                    <span style={{ opacity: 0.7 }}>•</span>
                    <span>Healthy Living.</span>
                    <span style={{ opacity: 0.7 }}>•</span>
                    <span>Happy Moments.</span>
                </p>
                <div style={{ width: '48px', height: '4px', background: 'white', margin: '24px auto 0', borderRadius: '2px' }}></div>
            </div>

            {/* Philosophy Cards Grid */}
            <div style={{ 
                display: 'flex', 
                gap: '40px', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                <PhilosophyCard 
                    image={tastyImg} 
                    title="Tasty" 
                    description="Crafting authentic flavors that offer a truly gourmet dining experience." 
                    animationClass="animate-left-v4"
                />
                <PhilosophyCard 
                    image={healthyImg} 
                    title="Healthy" 
                    description="Prioritizing clean ingredients and nutritional balance for a better lifestyle." 
                    animationClass="animate-bottom-v4"
                />
                <PhilosophyCard 
                    image={happyImg} 
                    title="Happy" 
                    description="Spreading joy and creating memorable connections through the love of pasta." 
                    animationClass="animate-right-v4"
                />
            </div>

            {/* Embedded styles for modern premium layout animations and hovers */}
            <style>{`
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInBottom {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-left-v4 {
                    animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
                }
                .animate-bottom-v4 {
                    animation: slideInBottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
                }
                .animate-right-v4 {
                    animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
                }
                .philosophy-card-v4 {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }
                .philosophy-card-v4:hover {
                    transform: translateY(-10px) scale(1.03) !important;
                    border-color: rgba(255, 255, 255, 0.5) !important;
                    background: rgba(255, 255, 255, 0.12) !important;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
                }
                .philosophy-card-v4:hover .phi-icon-circle-v4 {
                    background-color: #FF5E00 !important;
                    transform: rotate(10deg) scale(1.05) !important;
                    box-shadow: 0 10px 25px rgba(255, 94, 0, 0.25) !important;
                }
                .philosophy-card-v4:hover .phi-icon-img-v4 {
                    filter: brightness(0) invert(1) !important;
                }
                .philosophy-card-v4:hover .phi-arrow-link-v4 {
                    color: white !important;
                }
                .philosophy-card-v4:hover .phi-arrow-link-v4 span:last-child {
                    transform: translateX(4px) !important;
                }
            `}</style>
        </section>
    );
};

export default OurPhilosophy;
