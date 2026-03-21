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
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

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
    return () => {
        window.removeEventListener('toggle-cart', handleToggleCart);
        window.removeEventListener('toggle-checkout', handleToggleCheckout);
        window.removeEventListener('open-auth-modal', handleOpenAuth);
    };
  }, []);

  return (
    <div className={`app-layout ${isAdminPage ? 'admin-layout' : ''}`}>
      <ScrollToTop />
      {!isAdminPage && <Sidebar />}
      {!isAdminPage && <Navbar onCartClick={() => setIsCartOpen(true)} />}
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
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
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
