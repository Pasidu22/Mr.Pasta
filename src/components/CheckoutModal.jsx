import React, { useState, useEffect } from 'react';
import { X, CreditCard, MapPin, Phone, User, CheckCircle2, AlertTriangle } from 'lucide-react';
import { api } from '../utils/api';
import { auth } from '../firebase';

const CheckoutModal = ({ isOpen, onClose }) => {
    const [isOrdered, setIsOrdered] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [settings, setSettings] = useState({ deliveryFee: 250, whatsappNumber: '94729280262' });

    useEffect(() => {
        api.getSettings().then(setSettings).catch(console.error);

        if (isOpen) {
            const userProfile = localStorage.getItem('mr_pasta_user');
            if (userProfile) {
                const data = JSON.parse(userProfile);
                setFormData({
                    name: data.name || '',
                    phone: data.phone || '',
                    address: data.address || ''
                });
            }
            setShowWarning(false);
            setIsOrdered(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePreOrder = (e) => {
        e.preventDefault();
        setShowWarning(true);
    };

    const handleConfirmOrder = async () => {
        const cart = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
        const orderItems = [];
        let total = 0;

        try {
            const products = await api.getProducts();
            
            Object.keys(cart).forEach(id => {
                const product = products.find(p => p.id === parseInt(id));
                if (product) {
                    const quantity = cart[id];
                    const itemPrice = parseInt(product.price);
                    const itemTotal = itemPrice * quantity;
                    orderItems.push({ 
                        id: product.id, 
                        name: product.name, 
                        price: itemPrice, 
                        quantity, 
                        itemTotal 
                    });
                    total += itemTotal;
                }
            });
        } catch (err) {
            console.error("Fetch products error in checkout:", err);
            alert("Error processing your order items. Please try again.");
            return;
        }

        const subtotal = total;
        const deliveryFee = settings.deliveryFee || 250;
        const grandTotal = subtotal + deliveryFee;

        const orderId = `MP-${Math.floor(1000 + Math.random() * 9000)}`;
        const orderDate = new Date().toISOString();

        const newOrder = {
            id: orderId,
            date: orderDate,
            items: orderItems,
            subtotal,
            delivery: deliveryFee,
            total: grandTotal,
            status: 'Placed',
            customer: formData
        };

        // Save to Order History (Local)
        const orders = JSON.parse(localStorage.getItem('mr_pasta_orders') || '[]');
        orders.push(newOrder);
        localStorage.setItem('mr_pasta_orders', JSON.stringify(orders));

        // Save to MongoDB
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (savedUser) {
            try {
                const userObj = JSON.parse(savedUser);
                const currentUserId = userObj.userId || userObj.uid;
                api.createOrder({
                    userId: currentUserId,
                    items: orderItems,
                    total: grandTotal,
                    customerInfo: {
                        name: formData.name,
                        phone: formData.phone,
                        address: formData.address,
                        email: userObj.email || ''
                    },
                    paymentMethod: 'Cash on Delivery',
                    transactionId: orderId
                }).catch(err => console.error("Order sync error:", err));
            } catch (e) {
                console.error("User parsing error during order sync:", e);
            }
        }

        // Generate WhatsApp Message
        const message = `*🍱 New Order from Mr. Pasta - ${orderId}*\n\n` +
            `*Customer:* ${formData.name}\n` +
            `*Phone:* +94${formData.phone.startsWith('0') ? formData.phone.substring(1) : formData.phone}\n` +
            `*Address:* ${formData.address}\n\n` +
            `*Items:*\n` +
            orderItems.map(item => `- ${item.quantity}x ${item.name} (Rs. ${item.itemTotal})`).join('\n') +
            `\n\n*Subtotal:* Rs. ${subtotal}\n` +
            `*Delivery:* Rs. ${deliveryFee}\n` +
            `*Total:* *Rs. ${grandTotal}*\n\n` +
            `_Please confirm my order. Thank you!_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = settings.whatsappNumber || "94729280262";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Clear Cart
        localStorage.setItem('mr_pasta_cart', '{}');
        window.dispatchEvent(new Event('storage'));

        // Redirection and UI Update
        setIsOrdered(true);
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            onClose();
            setIsOrdered(false);
        }, 3000);
    };

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
            zIndex: 10001,
            animation: 'fadeIn 0.3s ease-out'
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                width: '90%',
                maxWidth: '540px',
                borderRadius: '32px',
                padding: '32px',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                animation: 'slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }} onClick={e => e.stopPropagation()}>
                
                <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} className="hover-scale">
                    <X size={20} />
                </button>

                {isOrdered ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ color: '#4BB543', marginBottom: '20px' }}>
                            <CheckCircle2 size={80} style={{ margin: '0 auto' }} />
                        </div>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>Order Placed!</h2>
                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>Opening WhatsApp to send details...</p>
                        <div style={{ 
                            padding: '12px', 
                            background: '#f0fdf4', 
                            borderRadius: '12px', 
                            display: 'inline-block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#166534'
                        }}>
                           Redirecting in a moment!
                        </div>
                    </div>
                ) : showWarning ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ color: '#ff9800', marginBottom: '20px' }}>
                            <AlertTriangle size={64} style={{ margin: '0 auto' }} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Verify Details</h2>
                        <div style={{ 
                            background: '#fff9f0', 
                            border: '1px solid #ffe8cc', 
                            borderRadius: '16px', 
                            padding: '20px', 
                            textAlign: 'left',
                            marginBottom: '24px'
                        }}>
                            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>Please ensure your delivery information is correct before confirming:</p>
                            <div style={{ fontSize: '15px', fontWeight: '700', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', gap: '8px' }}><User size={16} /> {formData.name}</div>
                                <div style={{ display: 'flex', gap: '8px' }}><Phone size={16} /> {formData.phone}</div>
                                <div style={{ display: 'flex', gap: '8px' }}><MapPin size={16} /> {formData.address}</div>
                            </div>
                        </div>
                        <p style={{ color: '#ff4d4d', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
                            ⚠️ Incorrect details may lead to delivery delays.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                onClick={() => setShowWarning(false)}
                                style={{ flex: 1, padding: '16px', background: '#f5f5f5', border: 'none', borderRadius: '16px', fontWeight: '700', cursor: 'pointer' }}
                            >
                                Edit Information
                            </button>
                            <button 
                                onClick={handleConfirmOrder}
                                style={{ flex: 1, padding: '16px', background: 'var(--color-terracotta)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer' }}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px', letterSpacing: '-1px' }}>Checkout</h2>
                        
                        <form onSubmit={handlePreOrder} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: '700', color: '#444' }}>Delivery Information</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', fontSize: '15px' }} 
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <input 
                                        required 
                                        type="tel" 
                                        placeholder="Phone Number" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', fontSize: '15px' }} 
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <textarea 
                                        required 
                                        placeholder="Delivery Address" 
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', fontSize: '15px', minHeight: '80px', resize: 'none', fontFamily: 'inherit' }} 
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                                <label style={{ fontSize: '14px', fontWeight: '700', color: '#444' }}>Payment Method</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '2px solid var(--color-terracotta)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <CreditCard size={24} color="var(--color-terracotta)" />
                                        <span style={{ fontSize: '12px', fontWeight: '700' }}>Cash on Delivery</span>
                                    </div>
                                    <div style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'not-allowed', opacity: 0.5 }}>
                                        <CreditCard size={24} color="#999" />
                                        <span style={{ fontSize: '12px', fontWeight: '700' }}>Card Payment</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                style={{
                                    marginTop: '20px',
                                    padding: '18px',
                                    background: 'var(--color-deep-black)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '20px',
                                    fontWeight: '800',
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                }}
                                className="hover-scale"
                            >
                                Continue to Confirmation
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
