import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, X, Lock } from 'lucide-react';
import { api } from '../utils/api';

const CartModal = ({ isOpen, onClose, onCheckout }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({ subtotal: 0, delivery: 250, total: 0 });
    const [user, setUser] = useState(null);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [settings, setSettings] = useState({ deliveryFee: 250 });

    const loadCart = async () => {
        const cart = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
        const items = [];
        let subtotal = 0;

        try {
            const [products, fetchedSettings] = await Promise.all([
                api.getProducts(),
                api.getSettings()
            ]);
            setSettings(fetchedSettings);

            const validCart = { ...cart };
            let hasChanges = false;

            Object.keys(cart).forEach(id => {
                const product = products.find(p => p.id === parseInt(id));
                if (product) {
                    const quantity = cart[id];
                    const itemTotal = parseInt(product.price) * quantity;
                    items.push({ ...product, quantity, itemTotal });
                    subtotal += itemTotal;
                } else {
                    delete validCart[id];
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                localStorage.setItem('mr_pasta_cart', JSON.stringify(validCart));
                window.dispatchEvent(new Event('storage'));
            }

            setCartItems(items);
            const delivery = (subtotal > 0 && fetchedSettings.deliveryChargesEnabled !== false) ? (fetchedSettings.deliveryFee || 250) : 0;
            setTotals({ subtotal, delivery, total: subtotal + delivery });
        } catch (err) {
            console.error("Cart load error:", err);
        }
    };

    useEffect(() => {
        const checkUser = () => {
            const savedUser = localStorage.getItem('mr_pasta_user');
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                    setShowAuthPrompt(false);
                } catch (e) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadCart();
            // Re-check user when opening to be sure
            const savedUser = localStorage.getItem('mr_pasta_user');
            if (savedUser) {
                setShowAuthPrompt(false);
                try { setUser(JSON.parse(savedUser)); } catch(e) {}
            }
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        window.addEventListener('storage', loadCart);
        return () => window.removeEventListener('storage', loadCart);
    }, [isOpen]);

    const updateQuantity = (id, delta) => {
        const cart = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
        const newQty = (cart[id] || 0) + delta;
        if (newQty <= 0) delete cart[id];
        else cart[id] = newQty;
        localStorage.setItem('mr_pasta_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
        loadCart();

        // Background sync with MongoDB
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (savedUser) {
            const userObj = JSON.parse(savedUser);
            const currentUserId = userObj.userId || userObj.uid;
            
            const cartArray = Object.keys(cart).map(itemId => ({
                productId: parseInt(itemId),
                quantity: cart[itemId]
            }));
            
            api.updateCart(currentUserId, cartArray).catch(err => console.log(err));
        }
    };

    const handleCheckoutClick = () => {
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (!savedUser) {
            setShowAuthPrompt(true);
        } else {
            onCheckout();
        }
    };

    const handleLoginRedirect = () => {
        onClose();
        window.dispatchEvent(new CustomEvent('open-auth-modal'));
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease-out'
        }} onClick={onClose}>
            <div style={{
                background: 'var(--color-white)',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '85vh',
                borderRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                animation: 'slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-gray-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>{showAuthPrompt ? 'Login Required' : 'My Pasta cart'}</h2>
                    <button onClick={onClose} style={{ background: 'var(--color-gray-soft)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }} className="hover-scale">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
                    {showAuthPrompt ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                background: '#fff5f5', 
                                color: 'var(--color-terracotta)', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                margin: '0 auto 24px auto'
                            }}>
                                <Lock size={32} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>Authentication Required</h3>
                            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>
                                You need to login or sign up to complete your order. This helps us track your delivery and save your order history.
                            </p>
                            <button 
                                onClick={handleLoginRedirect}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: 'var(--color-deep-black)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)'
                                }}
                                className="hover-scale"
                            >
                                Login or Sign Up
                            </button>
                            <button 
                                onClick={() => setShowAuthPrompt(false)}
                                style={{
                                    marginTop: '12px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#888',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Back to Basket
                            </button>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <ShoppingBag size={48} color="#ccc" style={{ marginBottom: '16px' }} />
                            <p style={{ color: '#666', fontWeight: '600' }}>Your basket is empty</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0' }}>{item.name}</h4>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-terracotta)' }}>Rs. {item.price}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--color-gray-soft)', padding: '4px 10px', borderRadius: 'full' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                                        <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '15px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && !showAuthPrompt && (
                    <div style={{ padding: '24px 32px', background: 'var(--color-deep-black)', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', opacity: 0.8, fontWeight: '600' }}>
                            <span>Subtotal</span>
                            <span>Rs. {totals.subtotal.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', opacity: 0.8, fontWeight: '600' }}>
                            <span>Delivery Fee</span>
                            <span style={{ color: totals.delivery === 0 ? '#10b981' : 'white' }}>
                                {totals.delivery === 0 ? 'FREE' : `Rs. ${totals.delivery.toLocaleString()}`}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '20px', fontWeight: '800', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--color-terracotta)' }}>Rs. {totals.total.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={handleCheckoutClick}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'var(--color-terracotta)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '800',
                                fontSize: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                            className="hover-scale"
                        >
                            Go to Checkout
                            <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideUpModal {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .hover-scale:hover {
                    transform: scale(1.02);
                }
                .hover-scale:active {
                    transform: scale(0.98);
                }
            `}</style>
        </div>
    );
};

export default CartModal;
