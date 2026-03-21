import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const categories = [
        { name: 'Regular Pasta', icon: '🌾' },
        { name: 'Rice Flour Pasta', icon: '🍚' },
        { name: 'Gluten-Free', icon: '🛡️' },
    ];

    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div style={{ 
            display: 'flex', 
            gap: '32px', 
            overflowX: 'auto', 
            padding: '20px 0', 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
        }} className="hide-scrollbar">
            {categories.map((cat) => (
                <div 
                    key={cat.name} 
                    onClick={() => handleCategoryClick(cat.name)}
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '8px', 
                        minWidth: '80px',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ 
                        fontSize: '32px', 
                        background: 'var(--color-gray-soft)', 
                        width: '64px', 
                        height: '64px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: '50%',
                        transition: 'var(--transition)'
                    }} className="hover-scale">
                        {cat.icon}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>{cat.name}</span>
                </div>
            ))}
        </div>
    );
};

export default CategoryCarousel;
