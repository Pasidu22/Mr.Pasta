import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../utils/api';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';
    const productId = searchParams.get('productId');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        api.getProducts().then(data => {
            setProducts(data);
            setLoading(false);
        }).catch(err => {
            console.error("Fetch products error:", err);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!loading && productId) {
            // Short delay to ensure the content is rendered
            const timer = setTimeout(() => {
                const element = document.getElementById(`product-${productId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add a temporary highlight effect
                    element.style.transition = 'all 0.5s ease';
                    element.style.outline = '2px solid var(--color-terracotta)';
                    element.style.boxShadow = '0 0 20px rgba(255, 92, 0, 0.3)';
                    
                    setTimeout(() => {
                        element.style.boxShadow = '';
                    }, 2000);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [productId, activeCategory]);
    
    // Group products by category
    const allCategories = ['All', ...new Set(products.map(p => p.category))];

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    const filteredCategories = activeCategory === 'All'
        ? [...new Set(products.map(p => p.category))]
        : [activeCategory];

    if (loading) {
        return (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="pulse" style={{ width: '60px', height: '60px', background: 'var(--color-terracotta)', borderRadius: '50%', margin: '0 auto' }}></div>
                <p style={{ marginTop: '20px', fontWeight: '600', color: '#666' }}>Loading Menu...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>No Products Found</h2>
                <p style={{ color: '#666' }}>Please check back later or contact admin.</p>
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out', padding: '20px 0' }}>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1.5px' }}>
                    Our Full Menu
                </h1>
                <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '32px' }}>
                    Explore our diverse range of premium pasta, from traditional wheat to healthy gluten-free options.
                </p>

                {/* Category Filter Bar */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '12px', 
                    flexWrap: 'wrap',
                    padding: '8px',
                    background: 'var(--color-gray-soft)',
                    borderRadius: '40px',
                    width: 'fit-content',
                    margin: '0 auto',
                    marginBottom: '40px'
                }}>
                    {allCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '30px',
                                border: 'none',
                                background: activeCategory === cat ? 'var(--color-terracotta)' : 'transparent',
                                color: activeCategory === cat ? 'white' : 'var(--color-deep-black)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                fontSize: '15px'
                            }}
                            className={activeCategory === cat ? '' : 'hover-scale'}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredCategories.map(category => (
                <section key={category} style={{ marginBottom: '64px', animation: 'fadeInUp 0.6s ease-out forwards' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '24px', 
                        marginBottom: '32px',
                        borderBottom: '1px solid var(--color-gray-border)',
                        paddingBottom: '16px'
                    }}>
                        <h2 style={{ 
                            fontSize: '28px', 
                            fontWeight: '700', 
                            margin: 0, 
                            color: 'var(--color-deep-black)',
                            letterSpacing: '-0.5px'
                        }}>
                            {category}
                        </h2>
                        <span style={{ 
                            background: 'var(--color-gray-soft)', 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            fontSize: '14px', 
                            fontWeight: '600',
                            color: '#666'
                        }}>
                            {products.filter(p => p.category === category).length} Items
                        </span>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                        gap: '32px' 
                    }}>
                        {products
                            .filter(p => p.category === category)
                            .map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Products;
