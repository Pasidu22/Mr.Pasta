import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown, TrendingUp, LogOut, ArrowRight, X } from 'lucide-react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import logo from '../assets/logo.jpg';

const Navbar = ({ onCartClick, onMenuClick }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [location, setLocation] = useState(() => {
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                if (user.address) return user.address;
            } catch (e) {}
        }
        return 'Colombo, Sri Lanka';
    });
    const [tempLocation, setTempLocation] = useState('');
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const routerLocation = useLocation();
    const isHomePage = routerLocation.pathname === '/';
    const searchRef = useRef(null);

    useEffect(() => {
        const syncData = async () => {
            const cartList = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
            const total = Object.values(cartList).reduce((a, b) => {
                const qty = parseInt(b) || 0;
                return a + qty;
            }, 0);
            setCartCount(total);

            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (e) {}

            const savedUser = localStorage.getItem('mr_pasta_user');
            if (savedUser) {
                try {
                    const parsed = JSON.parse(savedUser);
                    setUser(parsed);
                    if (parsed.address) setLocation(parsed.address);
                } catch (e) {}
            } else {
                setUser(null);
            }
        };

        syncData();

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('storage', syncData);
        window.addEventListener('cart-updated', syncData);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', syncData);
            window.removeEventListener('cart-updated', syncData);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('mr_pasta_user');
        localStorage.removeItem('mr_pasta_cart');
        localStorage.removeItem('mr_pasta_favorites');
        window.location.reload();
    };

    const trendingProducts = products.filter(p => parseFloat(p.rating) >= 4.9).slice(0, 4);
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'is-scrolled' : ''} ${!isHomePage ? 'is-solid-page' : ''}`}>
            <div className="header-top">
                <div className="search-container" style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }} ref={searchRef}>
                    <button 
                        onClick={onMenuClick}
                        className="mobile-menu-btn"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '10px',
                            color: '#000000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '44px',
                            zIndex: 10
                        }}
                    >
                        <Menu size={24} style={{ color: '#000000' }} />
                    </button>
                    <Link to="/" className="navbar-logo-link">
                        <img src={logo} alt="Mr. Pasta" className="navbar-logo" />
                    </Link>
                    <div className="search-bar">
                        <Search size={20} color={isSearchFocused ? "var(--color-terracotta)" : "#666"} />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                        />
                    </div>

                    {isSearchFocused && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            left: 0,
                            width: '100%',
                            maxWidth: '400px',
                            background: 'var(--color-white)',
                            borderRadius: '12px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                            border: '1px solid var(--color-gray-border)',
                            padding: '16px',
                            zIndex: 3000,
                            animation: 'fadeIn 0.2s ease-out'
                        }}>
                            {searchQuery === '' ? (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#666' }}>
                                        <TrendingUp size={16} />
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Trending Creations</span>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {trendingProducts.map(p => (
                                            <div 
                                                key={p.id}
                                                onClick={() => setSearchQuery(p.name)}
                                                style={{
                                                    padding: '8px 16px',
                                                    background: 'var(--color-gray-soft)',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    transition: 'var(--transition)'
                                                }}
                                                className="hover-scale"
                                            >
                                                {p.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#999', marginBottom: '12px', textTransform: 'uppercase' }}>
                                        Search Results
                                    </div>
                                    {filteredProducts.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {filteredProducts.map(p => (
                                                <div 
                                                    key={p.id}
                                                    onClick={() => {
                                                        navigate(`/products?category=${encodeURIComponent(p.category)}&productId=${p.id}`);
                                                        setIsSearchFocused(false);
                                                        setSearchQuery('');
                                                    }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'var(--transition)'
                                                    }}
                                                    className="location-option"
                                                >
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', background: '#eee' }}>
                                                        <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{p.name}</div>
                                                        <div style={{ fontSize: '12px', color: '#666' }}>{p.category} • Rs. {p.price}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                            No pasta found for "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <nav className="desktop-nav">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Our Pasta</NavLink>
                    <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Orders</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Favorites</NavLink>
                    <NavLink to="/customer-feedbacks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Customer feedbacks</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink>
                </nav>

                <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <div style={{ position: 'relative' }}>
                        <div 
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--color-gray-soft)',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'var(--transition)'
                            }}
                        >
                            <MapPin size={22} color="var(--color-terracotta)" />
                            <span className="hide-mobile" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                Deliver to - {location}
                            </span>
                            <ChevronDown size={16} className="hide-mobile" />
                        </div>

                        {isLocationOpen && (
                            <div className="delivery-popup" style={{
                                position: 'absolute',
                                top: '120%',
                                right: 0,
                                background: 'var(--color-white)',
                                borderRadius: '24px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                                border: '1px solid var(--color-gray-border)',
                                padding: '32px',
                                minWidth: '340px',
                                zIndex: 2000,
                                animation: 'fadeIn 0.2s ease-out',
                                textAlign: 'center'
                            }}>
                                <button 
                                    onClick={() => setIsLocationOpen(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#666',
                                        padding: '4px'
                                    }}
                                    className="hover-scale"
                                >
                                    <X size={20} />
                                </button>
                                <div style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    background: '#FFF5F0', 
                                    color: 'var(--color-terracotta)', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    margin: '0 auto 20px auto'
                                }}>
                                    <MapPin size={28} />
                                </div>
                                <h4 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '800' }}>Current Delivery Location</h4>
                                <p style={{ 
                                    color: '#666', 
                                    fontSize: '15px', 
                                    lineHeight: '1.6', 
                                    marginBottom: '28px',
                                    background: 'var(--color-gray-soft)',
                                    padding: '16px',
                                    borderRadius: '16px',
                                    textAlign: 'left'
                                }}>
                                    {location}
                                </p>
                                
                                <button
                                    onClick={() => {
                                        setIsLocationOpen(false);
                                        navigate('/profile?edit=true');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        background: 'var(--color-deep-black)',
                                        color: 'white',
                                        border: 'none',
                                        fontWeight: '700',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                    className="hover-scale"
                                >
                                    Change Delivery Address
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div 
                        onClick={onCartClick}
                        className="cart-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--bg-cart-button)',
                            color: 'var(--text-cart-button)',
                            padding: '10px 20px',
                            borderRadius: 'var(--radius-full)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                        }}
                    >
                        <ShoppingCart size={18} />
                        <span>{cartCount}</span>
                    </div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Link to="/profile" className="profile-link-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'var(--color-terracotta)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    boxShadow: '0 2px 8px rgba(255, 92, 0, 0.2)'
                                }}>
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="hide-mobile" style={{ fontWeight: '600', fontSize: '14px' }}>{user.name || 'User'}</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="hide-mobile logout-btn"
                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', padding: '4px' }}
                                title="Log Out"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                            className="auth-trigger"
                        >
                            <User size={24} />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
