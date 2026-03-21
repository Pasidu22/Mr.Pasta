import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, X, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';

const CartNotification = () => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [addedItem, setAddedItem] = useState(null);
    const [cartTotals, setCartTotals] = useState({ count: 0, price: 0 });
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const calculateTotals = (productList) => {
        const cart = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
        let totalCount = 0;
        let totalPrice = 0;

        if (!Array.isArray(productList)) return { count: 0, price: 0 };

        Object.keys(cart).forEach(cartItemId => {
            const product = productList.find(p => p.id === parseInt(cartItemId));
            if (product) {
                totalCount += cart[cartItemId];
                totalPrice += parseInt(product.price) * cart[cartItemId];
            }
        });
        return { count: totalCount, price: totalPrice };
    };

    useEffect(() => {
        // Initial load
        api.getProducts().then(data => {
            setProducts(data);
            setCartTotals(calculateTotals(data));
        }).catch(console.error);

        const handleCartAdded = (event) => {
            const { product } = event.detail;
            setAddedItem(product);
            
            // Re-calculate totals using the cached products
            setCartTotals(prev => {
                const newTotals = calculateTotals(products);
                // If products were empty (first load issue), help it out with the added item
                if (newTotals.count === 0 && product) {
                    return { count: 1, price: parseInt(product.price) };
                }
                return newTotals;
            });

            setMessageVisible(true);
            const timer = setTimeout(() => setMessageVisible(false), 3000);
            return () => clearTimeout(timer);
        };

        const handleStorageChange = () => {
            setCartTotals(calculateTotals(products));
        };

        window.addEventListener('cart-added', handleCartAdded);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('cart-added', handleCartAdded);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Don't show the persistent bar on cart or checkout pages
    const isCartOrCheckout = location.pathname === '/cart' || location.pathname === '/checkout';

    if (isCartOrCheckout || cartTotals.count === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9000,
            width: '95%',
            maxWidth: '540px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'none' // Allow clicking through the container
        }}>
            {/* Temporary Message Label */}
            {messageVisible && (
                <div style={{
                    background: 'rgba(255, 92, 0, 0.95)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: '700',
                    boxShadow: '0 8px 16px rgba(255, 92, 0, 0.2)',
                    animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    pointerEvents: 'auto',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    {addedItem?.name} added to your basket!
                </div>
            )}

            {/* Persistent Cart Summary Bar */}
            <div style={{
                width: '100%',
                background: 'var(--color-deep-black)',
                borderRadius: '24px',
                padding: '12px 16px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pointerEvents: 'auto',
                animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: '8px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-terracotta)'
                    }}>
                        <ShoppingBag size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                        <div style={{ color: 'white', fontSize: '15px', fontWeight: '700', lineHeight: 1.2 }}>
                            {cartTotals.count} {cartTotals.count === 1 ? 'Item' : 'Items'} Ready
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '500' }}>
                            Subtotal: Rs. {cartTotals.price.toLocaleString()}
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => window.dispatchEvent(new Event('toggle-cart'))}
                    style={{
                        background: 'var(--color-terracotta)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '18px',
                        fontWeight: '800',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'var(--transition)',
                        boxShadow: '0 4px 15px rgba(255, 92, 0, 0.3)'
                    }}
                    className="hover-scale"
                >
                    View Cart
                    <ChevronRight size={18} strokeWidth={3} />
                </button>
            </div>

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default CartNotification;
