import React, { useState, useEffect } from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { api } from '../utils/api';

const ProductCard = ({ id, name, price, rating: initialRating, reviewCount, time, image, desc }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentRating, setCurrentRating] = useState(parseFloat(initialRating) || 5.0);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        setCurrentRating(parseFloat(initialRating));
    }, [initialRating]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('mr_pasta_favorites') || '[]');
        setIsFavorite(favorites.includes(id));

        const handleStorageChange = () => {
            const updatedFavorites = JSON.parse(localStorage.getItem('mr_pasta_favorites') || '[]');
            setIsFavorite(updatedFavorites.includes(id));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [id]);

    const handleRate = async (score) => {
        try {
            const updated = await api.rateProduct(id, score);
            if (updated) {
                setCurrentRating(updated.rating);
                // Optional: show a small toast or success msg
            }
            setIsRatingOpen(false);
        } catch (err) {
            console.error("Rating Error:", err);
            setIsRatingOpen(false);
        }
    };

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        let favorites = JSON.parse(localStorage.getItem('mr_pasta_favorites') || '[]');
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
        } else {
            favorites.push(id);
        }
        
        localStorage.setItem('mr_pasta_favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
        window.dispatchEvent(new Event('storage'));

        // Background sync with MongoDB
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (savedUser) {
            try {
                const userObj = JSON.parse(savedUser);
                const currentUserId = userObj.userId || userObj.uid;
                api.updateFavorites(currentUserId, favorites).catch(err => console.error("Favorite sync error:", err));
            } catch (e) {}
        }
    };

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const cart = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
        cart[id] = (cart[id] || 0) + 1;
        localStorage.setItem('mr_pasta_cart', JSON.stringify(cart));

        // Background sync with MongoDB
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (savedUser) {
            try {
                const userObj = JSON.parse(savedUser);
                const currentUserId = userObj.userId || userObj.uid;
                // Convert cart format for API
                const cartArray = Object.keys(cart).map(itemId => ({
                    productId: parseInt(itemId),
                    quantity: cart[itemId]
                }));
                api.updateCart(currentUserId, cartArray).catch(err => console.error("Cart sync error:", err));
            } catch (e) {}
        }

        // Trigger notification
        window.dispatchEvent(new CustomEvent('cart-added', {
            detail: {
                product: { id, name, price }
            }
        }));

        // Sync Navbar count
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div id={`product-${id}`} className="product-card hover-lift" title={desc} style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '16px',
            transition: 'var(--transition)',
            position: 'relative',
            overflow: 'visible', // Allow rating overlay to pop out
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
            zIndex: isRatingOpen ? 100 : 1
        }}>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                    style={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        borderRadius: '16px',
                        transition: 'transform 0.5s ease'
                    }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' }}
                />
                <button 
                    onClick={toggleFavorite}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: isFavorite ? 'rgba(255, 92, 0, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isFavorite ? '#FF5C00' : '#666',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transition: 'var(--transition)'
                    }} className="hover-scale"
                >
                    <Heart size={20} fill={isFavorite ? "#FF5C00" : "none"} />
                </button>
            </div>

            <div style={{ padding: '0 4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--color-deep-black)', letterSpacing: '-0.3px' }}>{name}</h3>
                    <div 
                        onClick={(e) => { e.stopPropagation(); setIsRatingOpen(!isRatingOpen); }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.05)',
                            padding: '4px 8px',
                            borderRadius: 'full',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>
                            <span>{currentRating ? currentRating.toFixed(1) : '5.0'}</span>
                            <Star size={14} fill="black" />
                        </div>

                        {isRatingOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: 'white',
                                padding: '12px',
                                borderRadius: '16px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                display: 'flex',
                                gap: '4px',
                                zIndex: 10,
                                marginTop: '8px',
                                border: '1px solid #f0f0f0',
                                animation: 'fadeIn 0.2s ease-out'
                            }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star 
                                        key={star}
                                        size={18}
                                        style={{ cursor: 'pointer', transition: '0.2s' }}
                                        fill={(hoverRating || 0) >= star ? '#FF5C00' : 'none'}
                                        color={(hoverRating || 0) >= star ? '#FF5C00' : '#ccc'}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => handleRate(star)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ 
                            fontSize: '18px', 
                            fontWeight: '800', 
                            color: 'var(--color-terracotta)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <span style={{ fontSize: '13px', fontWeight: '600' }}>Rs.</span>
                            {price}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>
                            Delivery in {time}
                        </div>
                    </div>

                    <button 
                        onClick={addToCart}
                        style={{
                            background: '#FF5C00',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255, 92, 0, 0.3)',
                            transition: 'var(--transition)'
                        }} className="hover-scale">
                        <Plus size={24} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
