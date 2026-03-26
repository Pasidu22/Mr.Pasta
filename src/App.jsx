import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import CartNotification from './components/CartNotification';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import About from './pages/About';
import TestimonialsPage from './pages/TestimonialsPage';
import Footer from './components/Footer';
import LiveCounter from './components/LiveCounter';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith('/admin'));
    // Close sidebar on mobile when navigating
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleToggleCart = () => setIsCartOpen(true);
    const handleToggleCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };
    const handleOpenAuth = () => setIsAuthOpen(true);

    window.addEventListener('toggle-cart', handleToggleCart);
    window.addEventListener('toggle-checkout', handleToggleCheckout);
    window.addEventListener('open-auth-modal', handleOpenAuth);

    // Session Expiration Check (1 hour)
    const checkSession = () => {
        const user = localStorage.getItem('mr_pasta_user');
        const loginTime = localStorage.getItem('mr_pasta_login_time');
        
        if (user && loginTime) {
            const now = Date.now();
            const ONE_HOUR = 1 * 60 * 60 * 1000;
            
            if (now - parseInt(loginTime) > ONE_HOUR) {
                console.log("Session expired. Logging out...");
                localStorage.removeItem('mr_pasta_user');
                localStorage.removeItem('mr_pasta_login_time');
                window.location.reload();
            }
        }
    };
    checkSession();

    return () => {
        window.removeEventListener('toggle-cart', handleToggleCart);
        window.removeEventListener('toggle-checkout', handleToggleCheckout);
        window.removeEventListener('open-auth-modal', handleOpenAuth);
    };
  }, []);

  return (
    <div className={`app-layout ${isAdminPage ? 'admin-layout' : ''}`}>
      <ScrollToTop />
      {!isAdminPage && (
        <>
          <div 
            className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
            onClick={() => setIsSidebarOpen(false)}
          />
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
      )}
      {!isAdminPage && <Navbar onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsSidebarOpen(true)} />}
      <CartNotification />
      
      <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
          }} 
      />
      
      <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
      />

      <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<div className="main-container"><Products /></div>} />
          <Route path="/profile" element={<div className="main-container"><Profile /></div>} />
          <Route path="/favorites" element={<div className="main-container"><Favorites /></div>} />
          <Route path="/orders" element={<div className="main-container"><Orders /></div>} />
          <Route path="/settings" element={<div className="main-container"><Settings /></div>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<div className="main-container"><About /></div>} />
          <Route path="/customer-feedbacks" element={<div className="main-container"><TestimonialsPage /></div>} />
        </Routes>
        {!isAdminPage && <LiveCounter />}
        {!isAdminPage && <Footer />}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
