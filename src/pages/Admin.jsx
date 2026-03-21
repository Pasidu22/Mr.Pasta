import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Package, ShoppingBag, Settings as SettingsIcon, 
    Plus, Edit2, Trash2, CheckCircle, Clock, Truck, XCircle, CreditCard,
    Save, RefreshCcw, Phone, Mail, MapPin, MessageSquare, ArrowLeft,
    Upload, Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetch Initial Data
    useEffect(() => {
        if (isPasswordVerified) {
            fetchData();
        }
    }, [isPasswordVerified]);

    const fetchData = async () => {
        setLoading(true);
        setIsRefreshing(true);
        try {
            const [ordersData, productsData, settingsData] = await Promise.all([
                api.getAllOrders(),
                api.getProducts(),
                api.getSettings()
            ]);
            setOrders(ordersData);
            setProducts(productsData);
            setSettings(settingsData);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            if (err.message.includes('buffering timed out')) {
                alert('Database Connection Error: Could not connect to MongoDB Atlas. Please ensure your IP is whitelisted in Atlas or check your internet connection.');
            } else {
                alert('Failed to load dashboard data');
            }
        } finally {
            setLoading(false);
            // Artificial delay to show the animation (optional but satisfying)
            setTimeout(() => setIsRefreshing(false), 800);
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple check for now
            setIsPasswordVerified(true);
        } else {
            alert('Incorrect Password');
        }
    };

    if (!isPasswordVerified) {
        return (
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                    <LayoutDashboard size={48} color="var(--color-terracotta)" style={{ marginBottom: '20px' }} />
                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Admin Access</h2>
                    <p style={{ color: '#666', marginBottom: '24px' }}>Please enter the administrator password to continue.</p>
                    <form onSubmit={handleVerify}>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #eee', marginBottom: '16px', outline: 'none', textAlign: 'center' }}
                        />
                        <button type="submit" style={{ width: '100%', padding: '16px', background: 'var(--color-deep-black)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '700', cursor: 'pointer' }}>Login Dashboard</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--color-gray-soft)' }}>
            {/* Fixed Header & Tabs Container */}
            <div style={{ padding: '40px 20px 0 20px', maxWidth: '1200px', margin: '0 auto', width: '100%', flexShrink: 0 }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link to="/" style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        width: '40px', height: '40px', borderRadius: '12px', 
                        background: 'white', border: '1px solid #eee', color: '#666', 
                        transition: '0.3s',
                        textDecoration: 'none'
                    }} title="Back to Store">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Dashboard</h1>
                        <p style={{ color: '#666', margin: '4px 0 0 0' }}>Last updated: {lastUpdated.toLocaleTimeString()}</p>
                    </div>
                </div>
                <button onClick={fetchData} title="Sync Data" style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'white', border: '1px solid #eee', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer',
                    transition: 'all 0.3s'
                }} className="hover-scale">
                    <RefreshCcw size={18} className={isRefreshing ? 'spin' : ''} />
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>Sync</span>
                </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
                {[
                    { id: 'orders', label: 'Orders', icon: ShoppingBag },
                    { id: 'products', label: 'Products', icon: Package },
                    { id: 'settings', label: 'Site Settings', icon: SettingsIcon }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                            background: activeTab === tab.id ? 'var(--color-terracotta)' : 'white',
                            color: activeTab === tab.id ? 'white' : '#666',
                            fontWeight: '700', fontSize: '15px', transition: 'all 0.3s ease',
                            boxShadow: activeTab === tab.id ? '0 10px 20px rgba(255, 92, 0, 0.2)' : 'none'
                        }}
                    >
                        <tab.icon size={18} /> {tab.label}
                    </button>
                ))}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="hide-scrollbar" style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '0 20px 40px 20px', 
                maxWidth: '1200px', 
                margin: '0 auto', 
                width: '100%',
                scrollBehavior: 'smooth'
            }}>
                <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                    {activeTab === 'orders' && <OrdersTab orders={orders} onUpdate={fetchData} />}
                    {activeTab === 'products' && <ProductsTab products={products} onUpdate={fetchData} />}
                    {activeTab === 'settings' && <SettingsTab settings={settings} onUpdate={fetchData} />}
                </div>
            </div>
        </div>
    );
};

/* --- Sub-Components --- */

const OrdersTab = ({ orders, onUpdate }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');

    const updateStatus = async (id, status) => {
        try {
            await api.updateOrderStatus(id, status);
            onUpdate();
        } catch (err) { alert('Update failed'); }
    };

    const filteredOrders = orders.filter(order => {
        const matchesName = order.customerInfo?.name?.toLowerCase().includes(nameFilter.toLowerCase());
        
        let matchesMonth = true;
        if (monthFilter) {
            const orderDate = new Date(order.createdAt);
            const monthYear = `${orderDate.getFullYear()}-${(orderDate.getMonth() + 1).toString().padStart(2, '0')}`;
            matchesMonth = monthYear === monthFilter;
        }
        
        return matchesName && matchesMonth;
    });

    // Generate month options from available orders
    const monthOptions = [...new Set(orders.map(order => {
        const d = new Date(order.createdAt);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    }))].sort().reverse();

    const formatMonthDisplay = (monthStr) => {
        const [year, month] = monthStr.split('-');
        return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Filter Bar */}
            <div style={{ 
                display: 'flex', 
                gap: '16px', 
                padding: '16px 20px', 
                background: 'white', 
                borderRadius: '20px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'sticky',
                top: '0',
                zIndex: 10,
                border: '1px solid var(--color-gray-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#888', whiteSpace: 'nowrap' }}>Search Customer:</label>
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        style={{ flex: 1, padding: '10px 16px', borderRadius: '12px', border: '1px solid #eee', outline: 'none', fontSize: '14px' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '200px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#888', whiteSpace: 'nowrap' }}>Filter by Month:</label>
                    <select 
                        value={monthFilter}
                        onChange={(e) => setMonthFilter(e.target.value)}
                        style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #eee', outline: 'none', fontSize: '14px', cursor: 'pointer', flex: 1 }}
                    >
                        <option value="">All Months</option>
                        {monthOptions.map(m => (
                            <option key={m} value={m}>{formatMonthDisplay(m)}</option>
                        ))}
                    </select>
                </div>
                {(nameFilter || monthFilter) && (
                    <button 
                        onClick={() => { setNameFilter(''); setMonthFilter(''); }}
                        style={{ padding: '10px 16px', borderRadius: '12px', border: 'none', background: '#f5f5f5', color: '#666', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                        Clear
                    </button>
                )}
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-terracotta)', marginLeft: 'auto' }}>
                    {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'} Found
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div style={{ padding: '80px', textAlign: 'center', background: 'white', borderRadius: '32px' }}>
                    <ShoppingBag size={48} color="#eee" style={{ marginBottom: '16px' }} />
                    <p style={{ color: '#999' }}>No orders matching filters found</p>
                </div>
            ) : filteredOrders.map(order => (
                <div key={order._id} style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-terracotta)' }}>{new Date(order.createdAt).toLocaleString()}</span>
                            <h3 style={{ margin: '4px 0', fontSize: '18px' }}>Order #{order.transactionId || order._id.slice(-6).toUpperCase()}</h3>
                        </div>
                        <select 
                            value={order.status}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #eee', fontWeight: '700', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Customer Info</p>
                            <p style={{ margin: 0, fontWeight: '700' }}>{order.customerInfo?.name}</p>
                            <p style={{ margin: '4px 0', fontSize: '14px' }}>{order.customerInfo?.phone}</p>
                            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{order.customerInfo?.address}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Order Items</p>
                            {order.items.map((item, i) => (
                                <div key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: '700' }}>{item.quantity}x</span> {item.name}
                                </div>
                            ))}
                            <div style={{ marginTop: '12px', borderTop: '1px solid #f5f5f5', paddingTop: '8px' }}>
                                <span style={{ fontWeight: '800' }}>Total: Rs. {order.total?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ProductsTab = ({ products, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ id: Date.now(), name: '', price: '', rating: '5.0', category: 'Regular Pasta', desc: '', image: '/assets/smaple_product.png' });
    const fileInputRef = React.useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Limit size (e.g., 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target.result;
            if (editingProduct) {
                setEditingProduct({ ...editingProduct, image: result });
            } else {
                setNewProduct({ ...newProduct, image: result });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.updateProduct(editingProduct.id, editingProduct);
                setEditingProduct(null);
            } else {
                await api.addProduct(newProduct);
                setNewProduct({ id: Date.now(), name: '', price: '', rating: '5.0', category: 'Regular Pasta', desc: '', image: '/assets/sample_product.png' });
            }
            onUpdate();
        } catch (err) { 
            console.error("Save product error:", err);
            alert(err.message); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product?')) {
            await api.deleteProduct(id);
            onUpdate();
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Search Bar - Sticky at Top of Tab */}
            <div style={{ position: 'sticky', top: '0px', background: 'var(--color-gray-soft)', paddingBottom: '20px', zIndex: 10, margin: '0 0 10px 0' }}>
                <input 
                    placeholder="Search products by name or category..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    style={{ width: '100%', padding: '14px 20px', borderRadius: '18px', border: '1px solid #eee', background: 'white', fontWeight: '600', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }} 
                />
            </div>

            <div className="admin-products-layout">
                {/* List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredProducts.map(p => (
                        <div key={p.id} title={p.desc} style={{ background: 'white', padding: '16px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#f5f5f5', overflow: 'hidden' }}>
                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: '700' }}>{p.name}</p>
                                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-terracotta)', fontWeight: '700' }}>Rs. {p.price}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => {
                                    setEditingProduct(p);
                                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to see the form
                                }} style={{ padding: '8px', borderRadius: '10px', border: '1px solid #eee', background: 'none', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(p.id)} style={{ padding: '8px', borderRadius: '10px', border: '1px solid #fee2e2', background: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>

            {/* Form */}
            <div style={{ 
                background: 'white', 
                padding: '16px 20px', // Tightened padding
                borderRadius: '24px', 
                position: 'sticky', 
                top: '0px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input required placeholder="Product Name" value={editingProduct?.name || newProduct.name} onChange={e => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})} style={{ flex: 1.5, padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} />
                        <select value={editingProduct?.category || newProduct.category} onChange={e => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value}) : setNewProduct({...newProduct, category: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <option>Regular Pasta</option>
                            <option>Rice Flour Pasta</option>
                            <option>Gluten-Free</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input required type="number" placeholder="Price (Rs.)" value={editingProduct?.price || newProduct.price} onChange={e => editingProduct ? setEditingProduct({...editingProduct, price: e.target.value}) : setNewProduct({...newProduct, price: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} />
                        <input required type="number" step="0.1" min="1" max="5" placeholder="Rating (1-5)" value={editingProduct?.rating || newProduct.rating} onChange={e => editingProduct ? setEditingProduct({...editingProduct, rating: e.target.value}) : setNewProduct({...newProduct, rating: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} />
                    </div>
                    
                    {/* Image Upload Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '800', marginBottom: '2px' }}>Product Image</label>
                        <div style={{ 
                            display: 'flex', 
                            gap: '10px', 
                            alignItems: 'center',
                            padding: '8px 12px',
                            border: '1px solid #eee',
                            borderRadius: '12px'
                        }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: '#f5f5f5', overflow: 'hidden', flexShrink: 0 }}>
                                <img src={editingProduct?.image || newProduct.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    style={{ display: 'none' }} 
                                    ref={fileInputRef} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current.click()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 16px',
                                        background: '#f5f5f5',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Upload size={16} /> Choose Image
                                </button>
                                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#888' }}>Phone gallery or PC storage</p>
                            </div>
                        </div>
                        <input 
                            placeholder="Or enter Image URL" 
                            value={editingProduct?.image || newProduct.image} 
                            onChange={e => editingProduct ? setEditingProduct({...editingProduct, image: e.target.value}) : setNewProduct({...newProduct, image: e.target.value})} 
                            style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #eee', fontSize: '12px' }} 
                        />
                    </div>

                    <textarea placeholder="Description" value={editingProduct?.desc || newProduct.desc} onChange={e => editingProduct ? setEditingProduct({...editingProduct, desc: e.target.value}) : setNewProduct({...newProduct, desc: e.target.value})} style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #eee', minHeight: '60px', fontSize: '13px' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {editingProduct && <button type="button" onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>}
                        <button type="submit" style={{ flex: 2, padding: '12px', background: 'var(--color-deep-black)', color: 'white', borderRadius: '12px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '14px' }}>{editingProduct ? 'Update Product' : 'Add Product'}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
};

const SettingsTab = ({ settings, onUpdate }) => {
    const [formData, setFormData] = useState({
        deliveryFee: settings?.deliveryFee || 250,
        deliveryChargesEnabled: settings?.deliveryChargesEnabled !== false, // Default to true
        whatsappNumber: settings?.whatsappNumber || '94729280262',
        bankDetails: settings?.bankDetails || '',
        contactPhone: settings?.contactPhone || '+94 72 928 0262',
        contactEmail: settings?.contactEmail || 'info@mrpasta.lk',
        address: settings?.address || 'Colombo, Sri Lanka'
    });

    useEffect(() => { 
        if (settings && Object.keys(settings).length > 0) {
            setFormData(prev => ({
                ...prev,
                ...settings,
                // Ensure boolean fields are correctly handled if missing in server data
                deliveryChargesEnabled: settings.deliveryChargesEnabled !== false
            }));
        }
    }, [settings]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.updateSettings(formData);
            onUpdate();
            alert('Settings saved!');
        } catch (err) { alert('Save failed'); }
    };

    const handleSeed = async () => {
        if (window.confirm('Reset database with initial products? Current data will be lost.')) {
            await api.seedDatabase();
            onUpdate();
        }
    };

    return (
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: 'white', padding: '32px', borderRadius: '32px' }}>
                <h3 style={{ margin: '0 0 24px 0' }}>Store Configuration</h3>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={16} /> Delivery Fee (Rs.)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                <input 
                    type="checkbox" 
                    id="deliveryToggle"
                    checked={formData.deliveryChargesEnabled} 
                    onChange={e => setFormData({...formData, deliveryChargesEnabled: e.target.checked})} 
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <label htmlFor="deliveryToggle" style={{ fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>Enable Delivery Charges</label>
            </div>

            {formData.deliveryChargesEnabled && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#666' }}>Delivery Fee (Rs.)</label>
                    <input 
                        placeholder="Delivery Fee" 
                        type="number" 
                        value={formData.deliveryFee} 
                        onChange={e => setFormData({...formData, deliveryFee: e.target.value})} 
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} 
                    />
                </div>
            )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><CreditCard size={16} /> Bank Details (Shown at Checkout)</label>
                        <textarea placeholder="Bank Name, Account Number, Branch..." value={formData.bankDetails || ''} onChange={e => setFormData({...formData, bankDetails: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee', minHeight: '80px', resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={16} /> WhatsApp Number (94XXXXXXXXX)</label>
                        <input type="text" value={formData.whatsappNumber || ''} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} />
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #f5f5f5', margin: '8px 0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> Contact Phone</label>
                        <input type="text" value={formData.contactPhone || ''} onChange={e => setFormData({...formData, contactPhone: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Contact Email</label>
                        <input type="email" value={formData.contactEmail || ''} onChange={e => setFormData({...formData, contactEmail: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Business Address</label>
                        <textarea value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee', minHeight: '80px' }} />
                    </div>
                    <button type="submit" style={{ marginTop: '12px', padding: '16px', background: 'var(--color-terracotta)', color: 'white', borderRadius: '16px', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Save size={20} /> Save Configuration
                    </button>
                </form>
            </div>

            <div style={{ background: '#fff1f2', padding: '24px', borderRadius: '24px', border: '1px solid #fecaca' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#991b1b' }}>Danger Zone</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#b91c1c' }}>Re-seed the database to the 16 original products. This will delete all custom changes!</p>
                <button onClick={handleSeed} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Restore 16 Default Products</button>
            </div>
        </div>
    );
};

export default Admin;
