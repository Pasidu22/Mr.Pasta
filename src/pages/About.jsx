import React from 'react';
import WhoWeAre from '../components/WhoWeAre';
import VisionMission from '../components/VisionMission';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out', width: '100%' }}>
            <SEO 
                title="About Our Journey" 
                description="Learn about Mr. Pasta's mission to provide premium, healthy, and accessible pasta while supporting social causes like cancer care at Apeksha Hospital."
                keywords="Mr. Pasta Story, History, Vision, Mission, Social Impact, Sri Lanka, Healthy Dining"
            />
            {/* Hero Section */}
            <section style={{ 
                padding: '120px 20px 80px',
                background: 'linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0))',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span style={{
                        color: 'var(--color-terracotta)',
                        fontSize: '14px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        display: 'block',
                        marginBottom: '16px'
                    }}>Our Journey</span>
                    <h1 style={{ 
                        fontSize: '48px', 
                        fontWeight: '800', 
                        fontFamily: 'var(--font-accent)',
                        marginBottom: '24px',
                        color: 'var(--color-deep-black)'
                    }}>About Mr. Pasta</h1>
                    <div style={{
                        width: '80px',
                        height: '4px',
                        background: 'var(--color-terracotta)',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }}></div>
                </div>
            </section>

            <WhoWeAre />
            <VisionMission />
        </div>
    );
};

export default About;
