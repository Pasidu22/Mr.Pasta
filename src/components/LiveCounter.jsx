import React, { useState, useEffect, useRef } from 'react';
import { Users, ShoppingBag } from 'lucide-react';

const CounterItem = ({ icon: Icon, target, label, suffix = "+" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) setIsVisible(true);
        });
        observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        
        let start = 0;
        const end = parseInt(target);
        if (start === end) return;

        let totalMiliseconds = 2000;
        let incrementTime = (totalMiliseconds / end) > 20 ? (totalMiliseconds / end) : 20;

        let timer = setInterval(() => {
            start += Math.ceil(end / 100);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
        <div ref={domRef} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
                width: '64px', height: '64px', borderRadius: '50%', 
                background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
            }}>
                <Icon size={28} />
            </div>
            <h3 style={{ fontSize: '38px', fontWeight: '800', margin: 0, fontFamily: 'var(--font-accent)', color: '#FFFFFF', lineHeight: '1.1' }}>
                {count}{suffix}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {label}
            </p>
        </div>
    );
};

const LiveCounter = () => {
    return (
        <section style={{ 
            padding: '100px 40px', 
            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5E00 100%)', 
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {/* Fine dot pattern overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 0)',
                backgroundSize: '28px 28px',
                pointerEvents: 'none',
                opacity: 0.6,
                zIndex: 0
            }}></div>

            {/* Glowing background highlights */}
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>

            <div style={{ 
                maxWidth: '600px', 
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '40px',
                position: 'relative',
                zIndex: 1
            }}>
                <CounterItem icon={Users} target="1000" label="Happy Customers" />
                <CounterItem icon={ShoppingBag} target="16" label="Premium Products" suffix="" />
            </div>
        </section>
    );
};

export default LiveCounter;
