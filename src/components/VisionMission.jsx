import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

const VisionMission = () => {
    return (
        <section style={{ 
            padding: '100px 20px',
            background: 'var(--color-white)',
            borderTop: '1px solid var(--color-gray-border)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px'
            }}>
                {/* Vision Box */}
                <div style={{
                    padding: '48px 40px',
                    background: 'var(--color-gray-soft)',
                    borderRadius: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }} className="hover-scale">
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: 'white', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '32px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
                    }}>
                        <Target size={32} color="var(--color-terracotta)" />
                    </div>
                    <span style={{ 
                        fontSize: '13px', 
                        color: 'var(--color-terracotta)', 
                        fontWeight: '800', 
                        marginBottom: '16px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '3px' 
                    }}>Our Vision</span>
                    <p style={{ 
                        fontSize: '20px', 
                        lineHeight: '1.6', 
                        color: 'var(--color-deep-black)', 
                        fontWeight: '700', 
                        margin: 0,
                        letterSpacing: '-0.5px'
                    }}>
                        To lead the industry through excellence in value-added manufacturing, providing customers worldwide with superior, nutrient-rich solutions.
                    </p>
                </div>

                {/* Mission Box */}
                <div style={{
                    padding: '48px 40px',
                    background: 'var(--color-gray-soft)',
                    borderRadius: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }} className="hover-scale">
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: 'white', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '32px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
                    }}>
                        <Lightbulb size={32} color="var(--color-terracotta)" />
                    </div>
                    <span style={{ 
                        fontSize: '13px', 
                        color: 'var(--color-terracotta)', 
                        fontWeight: '800', 
                        marginBottom: '16px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '3px' 
                    }}>Our Mission</span>
                    <p style={{ 
                        fontSize: '20px', 
                        lineHeight: '1.6', 
                        color: 'var(--color-deep-black)', 
                        fontWeight: '700', 
                        margin: 0,
                        letterSpacing: '-0.5px'
                    }}>
                        To deliver exceptional value through innovative manufacturing processes and rigorous quality standards, ensuring our global partners receive nutrient-dense products that enhance lives and drive industry progress.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
