import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Loader2, ShoppingBasket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../utils/api';

const Favorites = () => {
    const navigate = useNavigate();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = async () => {
        const favoriteIds = JSON.parse(localStorage.getItem('mr_pasta_favorites') || '[]');
        try {
            const products = await api.getProducts();
            const favoritedItems = products.filter(p => favoriteIds.includes(p.id));
            setFavoriteProducts(favoritedItems);
        } catch (e) {
            console.error("Load favorites error:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavorites();

        // Listen for updates from other components
        window.addEventListener('storage', loadFavorites);
        return () => window.removeEventListener('storage', loadFavorites);
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Loader2 className="animate-spin" size={40} color="var(--color-terracotta)" />
            </div>
        );
    }

    return (
        <div style={{ padding: '40px', width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
                    className="hover-scale"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-1.5px' }}>My Favorites</h1>
            </div>

            {favoriteProducts.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '80px 20px', 
                    background: 'white', 
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                    border: '1px solid var(--color-gray-border)'
                }}>
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: 'var(--color-gray-soft)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto 24px auto',
                        color: '#999'
                    }}>
                        <Heart size={40} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Your favorites list is empty</h2>
                    <p style={{ color: '#666', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px auto' }}>
                        When you see something you like, tap the heart icon to save it for later.
                    </p>
                    <button 
                        onClick={() => navigate('/products')}
                        style={{
                            padding: '12px 32px',
                            background: 'var(--color-terracotta)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '700',
                            fontSize: '16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            margin: '0 auto'
                        }}
                        className="hover-scale"
                    >
                        <ShoppingBasket size={20} />
                        Explore Menu
                    </button>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                    gap: '32px' 
                }}>
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
