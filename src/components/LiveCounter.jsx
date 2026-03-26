import React, { useState, useEffect, useRef } from 'react';
import { Users, ShoppingBag, Award, Truck } from 'lucide-react';

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
                width: '64px', height: '64px', borderRadius: '20px', 
                background: 'rgba(255, 92, 0, 0.1)', color: 'var(--color-terracotta)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px'
            }}>
                <Icon size={32} />
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', margin: 0, fontFamily: 'var(--font-accent)' }}>
                {count}{suffix}
            </h3>
            <p style={{ color: '#666', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {label}
            </p>
        </div>
    );
};

const LiveCounter = () => {
    return (
        <section style={{ 
            padding: '80px 20px', 
            background: 'var(--palette-white)', 
            borderTop: '1px solid var(--color-gray-border)',
            borderBottom: '1px solid var(--color-gray-border)'
        }}>
            <div style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '40px'
            }}>
                <CounterItem icon={Users} target="1000" label="Happy Customers" />
                <CounterItem icon={ShoppingBag} target="16" label="Premium Products" suffix="" />
            </div>
        </section>
    );
};

export default LiveCounter;
