import React, { useState, useEffect } from 'react';
import { Bell, Globe, Info, Shield, ChevronRight, Share2, Star } from 'lucide-react';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false); // Force light mode
    const [notifications, setNotifications] = useState(localStorage.getItem('notifications') !== 'false');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

    useEffect(() => {
        // Force light mode on this page for now
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }, []);

    const toggleNotification = () => {
        setNotifications(!notifications);
        localStorage.setItem('notifications', (!notifications).toString());
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const sections = [
        {
            id: 'notifications',
            title: 'Notifications',
            icon: <Bell size={20} />,
            items: [
                {
                    label: 'WhatsApp Updates',
                    desc: 'Receive order confirmations and delivery alerts.',
                    icon: <Bell size={18} />,
                    action: (
                        <div 
                            onClick={toggleNotification}
                            style={{
                                width: '44px',
                                height: '22px',
                                background: notifications ? '#25D366' : '#E2E2E2',
                                borderRadius: '20px',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: '0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            <div style={{
                                width: '16px',
                                height: '16px',
                                background: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '3px',
                                left: notifications ? '25px' : '3px',
                                transition: '0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }} />
                        </div>
                    )
                }
            ]
        },
        {
            id: 'language',
            title: 'Localization',
            icon: <Globe size={20} />,
            items: [
                {
                    label: 'App Language',
                    desc: 'Select your preferred language.',
                    icon: <Globe size={18} />,
                    action: (
                        <select 
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '10px',
                                border: '1px solid var(--color-gray-border)',
                                background: 'var(--color-white)',
                                color: 'var(--color-deep-black)',
                                fontSize: '13px',
                                fontWeight: '600',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="English">English</option>
                            <option value="Sinhala">Sinhala (coming soon)</option>
                        </select>
                    )
                }
            ]
        },
        {
            id: 'about',
            title: 'About',
            icon: <Info size={20} />,
            items: [
                { label: 'Application Version', desc: 'v1.0.0 (Building Beta)', icon: <Info size={18} /> },
                { label: 'Terms of Service', desc: 'Read our legal guidelines.', icon: <Shield size={18} />, hasArrow: true },
                { label: 'Share App', desc: 'Tell your friends about Mr. Pasta.', icon: <Share2 size={18} />, hasArrow: true }
            ]
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '8px' }}>Settings</h1>
                <p style={{ color: '#666', fontSize: '15px' }}>Manage your account preferences and application experience.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {sections.map(section => (
                    <div key={section.id} style={{
                        background: 'var(--color-white)',
                        borderRadius: '24px',
                        padding: '24px',
                        border: '1px solid var(--color-gray-border)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--color-terracotta)' }}>
                            {section.icon}
                            <h3 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{section.title}</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {section.items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            borderRadius: '12px', 
                                            background: 'var(--color-gray-soft)', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: 'var(--color-deep-black)'
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-deep-black)' }}>{item.label}</div>
                                            <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>{item.desc}</div>
                                        </div>
                                    </div>
                                    {item.action ? item.action : (item.hasArrow && <ChevronRight size={18} color="#999" />)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div style={{ textAlign: 'center', padding: '24px', opacity: 0.5 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>MR. PASTA FACTORY</div>
                    <div style={{ fontSize: '12px' }}>Hand-crafted in Sri Lanka with ❤️</div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
