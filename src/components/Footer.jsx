import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { api } from '../utils/api';

const Footer = () => {
    const [settings, setSettings] = useState({
        contactPhone: '+94 11 234 5678',
        contactEmail: 'hello@mrpasta.com',
        address: 'Sri Lanka (Headquarters)'
    });

    useEffect(() => {
        api.getSettings().then(setSettings).catch(console.error);
    }, []);

    return (
        <footer className="full-bleed-v4" style={{
            background: 'var(--palette-black)',
            color: 'white',
            padding: '80px 0 40px',
            marginTop: 'auto',
            width: '100%',
            transition: 'background-color 0.3s'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '48px',
                marginBottom: '64px'
            }}>
                {/* Brand Info */}
                <div>
                    <h2 style={{ 
                        fontSize: '24px', 
                        fontWeight: '800', 
                        marginBottom: '20px',
                        color: 'var(--color-terracotta)',
                        fontFamily: 'var(--font-brand)'
                    }}>MR. PASTA</h2>
                    <p style={{ 
                        fontSize: '14px', 
                        lineHeight: '1.6', 
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginBottom: '24px'
                    }}>
                        Premium value-added pasta brand dedicated to creating delicious, healthy, and happy dining experiences.
                    </p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="#" style={{ color: 'white', opacity: 0.6, transition: '0.3s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.6}><Facebook size={20} /></a>
                        <a href="#" style={{ color: 'white', opacity: 0.6, transition: '0.3s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.6}><Instagram size={20} /></a>
                        <a href="#" style={{ color: 'white', opacity: 0.6, transition: '0.3s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.6}><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '12px' }}><Link to="/" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Home</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/products" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Our Pasta</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/orders" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>My Orders</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/favorites" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Favorites</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/settings" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Settings</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/profile" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Profile</Link></li>
                    </ul>
                </div>

                {/* About & Impact */}
                <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Learn More</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '12px' }}><Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Who We Are</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Vision & Mission</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Social Impact</Link></li>
                        <li style={{ marginBottom: '12px' }}><Link to="/#hero" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>Special Offers</Link></li>
                    </ul>
                </div>

                {/* Philosophy (Small) */}
                <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Our Philosophy</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>🍝</span>
                            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Tasty & Flavorful</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>🥗</span>
                            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Nutritious & Healthy</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>😊</span>
                            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Happy & Joyful</span>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Contact Us</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                            <MapPin size={18} color="var(--color-terracotta)" />
                            {settings.address || 'Sri Lanka (Headquarters)'}
                        </li>
                        <li style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                            <Phone size={18} color="var(--color-terracotta)" />
                            <a href={`tel:${settings.contactPhone}`} style={{ color: 'inherit', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>
                                {settings.contactPhone || '+94 11 234 5678'}
                            </a>
                        </li>
                        <li style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                            <Mail size={18} color="var(--color-terracotta)" />
                            <a href={`mailto:${settings.contactEmail}`} style={{ color: 'inherit', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>
                                {settings.contactEmail || 'hello@mrpasta.com'}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>


            {/* Bottom Bar */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '4px' }}>
                        © 2026 Mr. Pasta. All rights reserved. ISO 22000 Certified.
                    </p>
                    <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.25)', fontWeight: '500', letterSpacing: '0.5px' }}>
                        This creative product designed and developed by <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Smart AI Solutions</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <a href="#" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none' }}>Privacy Policy</a>
                    <a href="#" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none' }}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
