import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Clock, ChevronRight, Package, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const savedUser = localStorage.getItem('mr_pasta_user');
            if (savedUser) {
                const userObj = JSON.parse(savedUser);
                const currentUserId = userObj.userId || userObj.uid;
                
                api.getOrders(currentUserId).then(dbOrders => {
                    if (dbOrders && dbOrders.length > 0) {
                        setOrders(dbOrders);
                    } else {
                        const savedOrders = JSON.parse(localStorage.getItem('mr_pasta_orders') || '[]');
                        setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
                    }
                    setLoading(false);
                }).catch(err => {
                    console.error("Failed to fetch orders from DB:", err);
                    const savedOrders = JSON.parse(localStorage.getItem('mr_pasta_orders') || '[]');
                    setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
                });
            } else {
                const savedOrders = JSON.parse(localStorage.getItem('mr_pasta_orders') || '[]');
                setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
            setLoading(false);
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Loader2 className="animate-spin" size={40} color="var(--color-terracotta)" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    background: 'var(--color-gray-soft)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                    color: '#ccc'
                }}>
                    <Package size={50} />
                </div>
                <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>No orders yet</h1>
                <p style={{ color: '#666', marginBottom: '32px' }}>Your delicious pasta journey starts here!</p>
                <button 
                    onClick={() => navigate('/products')}
                    style={{
                        padding: '14px 32px',
                        background: 'var(--color-terracotta)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '700',
                        cursor: 'pointer'
                    }}
                    className="hover-scale"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                    className="hover-scale"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-1.5px', flex: 1 }}>My Order History</h1>
                {orders.length > 0 && (
                    <button 
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear your local order history? This will not affect your account on our servers.')) {
                                localStorage.removeItem('mr_pasta_orders');
                                setOrders([]);
                            }
                        }}
                        style={{ 
                            padding: '10px 20px', 
                            background: '#fff', 
                            border: '1px solid #eee', 
                            borderRadius: '12px', 
                            fontSize: '13px', 
                            fontWeight: '700', 
                            color: '#ff4d4d',
                            cursor: 'pointer' 
                        }}
                        className="hover-scale"
                    >
                        Clear History
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {orders.map((order) => (
                    <div key={order.id} style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        border: '1px solid var(--color-gray-border)',
                        transition: 'var(--transition)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', borderBottom: '1px solid #f5f5f5', paddingBottom: '16px' }}>
                            <div>
                                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-deep-black)', marginBottom: '4px' }}>
                                    Order {order.id || order._id}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', color: '#888', fontSize: '13px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={14} /> {new Date(order.date || order.createdAt).toLocaleDateString()}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={14} /> {new Date(order.date || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                            <div style={{ 
                                background: '#e6f4ea', 
                                color: '#1e7e34', 
                                padding: '6px 14px', 
                                borderRadius: 'full', 
                                fontSize: '13px', 
                                fontWeight: '700',
                                textTransform: 'capitalize'
                            }}>
                                {order.status || 'Placed'}
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            {order.items && order.items.map((item, idx) => {
                                const displayItemTotal = item.itemTotal || (item.price * item.quantity);
                                return (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                        <span style={{ color: '#444' }}>
                                            <span style={{ fontWeight: '700', color: 'var(--color-terracotta)' }}>{item.quantity}x</span> {item.name}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>Rs. {displayItemTotal.toLocaleString()}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f5f5f5' }}>
                            <div style={{ color: '#666', fontSize: '14px' }}>Total Amount Paid</div>
                            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-terracotta)' }}>
                                Rs. {order.total.toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
