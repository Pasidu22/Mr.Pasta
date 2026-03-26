import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Soup, ShieldCheck } from 'lucide-react';

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const categories = [
        { name: 'Regular Pasta', icon: <Sprout size={28} />, color: '#4CAF50' },
        { name: 'Rice Flour Pasta', icon: <Soup size={28} />, color: '#FF9800' },
        { name: 'Gluten-Free', icon: <ShieldCheck size={28} />, color: '#2196F3' },
    ];

    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div className="category-container-v4 hide-scrollbar" style={{ 
            display: 'flex', 
            gap: '32px', 
            overflowX: 'auto', 
            padding: '40px 20px', 
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
