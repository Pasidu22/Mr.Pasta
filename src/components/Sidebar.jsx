import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBasket, Clock, User, Heart, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Sidebar = () => {
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
    ];

    return (
        <aside className="sidebar">
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={logo} alt="Mr. Pasta Logo" style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <h2 style={{ color: 'var(--color-terracotta)', fontSize: '1.2rem', fontFamily: 'var(--font-accent)', margin: 0 }}>
                    MR. PASTA
                </h2>
            </div>

            <nav>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link 
                                to={item.path} 
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
                        <Link 
                            to="/profile" 
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
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/settings" 
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
                        onClick={handleLogout}
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
