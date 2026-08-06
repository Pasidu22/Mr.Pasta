"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, Soup, ShieldCheck } from 'lucide-react';
import { api } from '../utils/api';

const CategoryCarousel = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getSettings().then(settings => {
            const catStrings = settings.categories || ['Regular Pasta', 'Rice Flour Pasta', 'Gluten-Free'];
            const mapped = catStrings.map(name => {
                if (name === 'Regular Pasta') {
                    return { name, icon: <Sprout size={28} />, color: '#4CAF50' };
                } else if (name === 'Rice Flour Pasta') {
                    return { name, icon: <Soup size={28} />, color: '#FF9800' };
                } else if (name === 'Gluten-Free') {
                    return { name, icon: <ShieldCheck size={28} />, color: '#2196F3' };
                } else {
                    return { name, icon: <Soup size={28} />, color: '#FF5E00' };
                }
            });
            setCategories(mapped);
            setLoading(false);
        }).catch(err => {
            console.error("Error loading categories:", err);
            setCategories([
                { name: 'Regular Pasta', icon: <Sprout size={28} />, color: '#4CAF50' },
                { name: 'Rice Flour Pasta', icon: <Soup size={28} />, color: '#FF9800' },
                { name: 'Gluten-Free', icon: <ShieldCheck size={28} />, color: '#2196F3' },
            ]);
            setLoading(false);
        });
    }, []);

    const handleCategoryClick = (categoryName) => {
        router.push(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', gap: '16px', padding: '24px 10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ height: '50px', width: '150px', borderRadius: '15px', background: '#f5f5f5', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '50px', width: '150px', borderRadius: '15px', background: '#f5f5f5', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '50px', width: '150px', borderRadius: '15px', background: '#f5f5f5', animation: 'pulse 1.5s infinite' }} />
            </div>
        );
    }

    return (
        <div className="category-container-v4 hide-scrollbar" style={{ 
            display: 'flex', 
            gap: '16px', 
            overflowX: 'auto', 
            padding: '24px 10px', 
            justifyContent: 'center',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flexWrap: 'wrap'
        }}>
            {categories.map((cat, index) => (
                <div 
                    key={cat.name} 
                    onClick={() => handleCategoryClick(cat.name)}
                    className="category-card-v4 hover-scale animate-staggered"
                    style={{ 
                        animationDelay: `${index * 0.15}s`
                    }}
                >
                    <div 
                        className="category-icon-wrapper-v4"
                        style={{ 
                            background: `${cat.color}15`, 
                            color: cat.color
                        }}
                    >
                        {cat.icon}
                    </div>
                    <span className="category-name-v4">
                        {cat.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CategoryCarousel;
