import React from 'react';
import { CheckCircle, Globe, Leaf } from 'lucide-react';

const WhoWeAre = () => {
    return (
        <section style={{ 
            marginTop: '80px', 
            marginBottom: '80px',
            animation: 'fadeIn 0.8s ease-out',
            borderTop: '1px solid var(--color-gray-border)',
            paddingTop: '80px'
        }}>
            <div style={{ 
                textAlign: 'center', 
                maxWidth: '900px', 
                margin: '0 auto 56px' 
            }}>
                <span style={{
                    color: 'var(--color-terracotta)',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    marginBottom: '12px',
                    display: 'block'
                }}>Brand Story</span>
                <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    marginBottom: '24px',
                    fontFamily: 'var(--font-accent)',
                    lineHeight: '1.2'
                }}>Quality You Can Trust</h2>
                <div style={{
                    width: '60px',
                    height: '4px',
                    background: 'var(--color-terracotta)',
                    margin: '0 auto 32px',
                    borderRadius: '2px'
                }}></div>
                <p style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.8', 
                    color: 'rgba(26, 26, 26, 0.9)',
                    fontWeight: '500',
                    marginBottom: '32px'
                }}>
                    We are a premium pasta brand dedicated to creating value-added pasta products that combine delicious taste, better nutrition, and joy at the table. <br/>
                    Guided by our philosophy — <strong>Tasty • Healthy • Happy</strong> — we craft pasta that meets the needs of modern, health-conscious consumers locally and internationally.
                </p>
                <p style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.8', 
                    color: 'rgba(26, 26, 26, 0.7)',
                    fontWeight: '400',
                    marginBottom: '24px'
                }}>
                    Our ingredients are carefully selected from trusted sources, and every product is produced under ISO 22000-certified food safety standards, ensuring premium quality, safety, and global trust.
                </p>
                <p style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.8', 
                    color: 'rgba(26, 26, 26, 0.7)',
                    fontWeight: '400'
                }}>
                    By blending Sri Lanka’s rich agricultural heritage with modern food innovation, we deliver pasta that is nutritious, flavorful, and responsibly produced, bringing a world-class dining experience to every table.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                background: 'var(--color-creamy-neutral)',
                padding: '48px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(0,0,0,0.03)'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ color: 'var(--color-terracotta)', marginTop: '4px' }}>
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>ISO 22000 Certified</h4>
                        <p style={{ fontSize: '15px', color: 'rgba(26, 26, 26, 0.7)', lineHeight: '1.6' }}>
                            Every product is produced under ISO 22000-certified food safety standards, ensuring premium quality, safety, and global trust.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ color: 'var(--color-terracotta)', marginTop: '4px' }}>
                        <Globe size={24} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Global Innovation</h4>
                        <p style={{ fontSize: '15px', color: 'rgba(26, 26, 26, 0.7)', lineHeight: '1.6' }}>
                            By blending Sri Lanka’s rich agricultural heritage with modern food innovation, we deliver pasta that is nutritious, flavorful, and responsibly produced.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ color: 'var(--color-terracotta)', marginTop: '4px' }}>
                        <Leaf size={24} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>World-Class Dining</h4>
                        <p style={{ fontSize: '15px', color: 'rgba(26, 26, 26, 0.7)', lineHeight: '1.6' }}>
                            Our ingredients are carefully selected from trusted sources, bringing a world-class dining experience to every table.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
