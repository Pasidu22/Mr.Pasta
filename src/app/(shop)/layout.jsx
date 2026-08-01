"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import CartNotification from '../../components/CartNotification';
import CartModal from '../../components/CartModal';
import CheckoutModal from '../../components/CheckoutModal';
import AuthModal from '../../components/AuthModal';
import Footer from '../../components/Footer';
import LiveCounter from '../../components/LiveCounter';

export default function ShopLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="app-layout">
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsSidebarOpen(true)} />
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
        {children}
        <LiveCounter />
        <Footer />
      </main>
    </div>
  );
}
