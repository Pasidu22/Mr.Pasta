import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBasket, Clock, User, Heart, Settings, LogOut, X, MessageSquare } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const checkUser = () => {
            const savedUser = localStorage.getItem('mr_pasta_user');
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
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

    const handleLogout = () => {
        localStorage.removeItem('mr_pasta_user');
        localStorage.removeItem('mr_pasta_cart');
        localStorage.removeItem('mr_pasta_favorites');
        window.location.reload();
    };

    const menuItems = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Products', path: '/products', icon: <ShoppingBasket size={20} /> },
        { name: 'Orders', path: '/orders', icon: <Clock size={20} /> },
        { name: 'Favorites', path: '/favorites', icon: <Heart size={20} /> },
        { name: 'Customer feedbacks', path: '/customer-feedbacks', icon: <MessageSquare size={20} /> },
        { name: 'About Us', path: '/about', icon: <User size={20} /> },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={logo} alt="Mr. Pasta Logo" style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <h2 style={{ color: 'var(--color-terracotta)', fontSize: '1.2rem', fontFamily: 'var(--font-brand)', margin: 0 }}>
                        MR. PASTA
                    </h2>
                </div>
                <button 
                    onClick={onClose} 
                    className="mobile-menu-btn"
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'none', // Hidden on desktop
                        color: '#666'
                    }}
                >
                    <X size={24} />
                </button>
            </div>

            <nav>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link 
                                to={item.path} 
                                onClick={onClose}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '12px', 
                                    padding: '12px 16px', 
                                    textDecoration: 'none', 
                                    color: location.pathname === item.path ? 'var(--color-terracotta)' : 'inherit',
                                    backgroundColor: location.pathname === item.path ? 'var(--color-gray-soft)' : 'transparent',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: location.pathname === item.path ? '600' : '400',
                                    transition: 'var(--transition)'
                                }}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-border)', margin: '24px 0' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                        {user ? (
                            <Link 
                                to="/profile" 
                                onClick={onClose}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '12px', 
                                    padding: '12px 16px', 
                                    textDecoration: 'none', 
                                    color: location.pathname === '/profile' ? 'var(--color-terracotta)' : 'inherit',
                                    backgroundColor: location.pathname === '/profile' ? 'var(--color-gray-soft)' : 'transparent',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: location.pathname === '/profile' ? '600' : '400',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <User size={20} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '14px', opacity: 0.7, marginBottom: '-2px' }}>Welcome,</span>
                                    <span style={{ fontWeight: '700' }}>{user.name || 'User'}</span>
                                </div>
                            </Link>
                        ) : (
                            <button 
                                onClick={() => {
                                    onClose();
                                    window.dispatchEvent(new CustomEvent('open-auth-modal'));
                                }}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '12px', 
                                    padding: '12px 16px', 
                                    width: '100%',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    color: 'inherit',
                                    borderRadius: 'var(--radius-md)',
                                    fontFamily: 'inherit',
                                    fontSize: '16px',
                                    textAlign: 'left',
                                    transition: 'var(--transition)'
                                }}
                                className="hover-scale"
                            >
                                <User size={20} />
                                <span>Sign Up / Login</span>
                            </button>
                        )}
                    </li>
                    <li>
                        <Link 
                            to="/settings" 
                            onClick={onClose}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px', 
                                padding: '12px 16px', 
                                textDecoration: 'none', 
                                color: location.pathname === '/settings' ? 'var(--color-terracotta)' : 'inherit',
                                backgroundColor: location.pathname === '/settings' ? 'var(--color-gray-soft)' : 'transparent',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: location.pathname === '/settings' ? '600' : '400',
                                transition: 'var(--transition)'
                            }}
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {user && (
                <div style={{ marginTop: 'auto', position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                    <button 
                        onClick={() => {
                            handleLogout();
                            onClose();
                        }}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            width: '100%', 
                            padding: '12px 16px', 
                            border: 'none', 
                            background: 'none', 
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        <LogOut size={20} />
                        <span>Log out</span>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
