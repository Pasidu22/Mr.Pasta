import React, { useState } from 'react';
import { X, Phone, Mail, Github, ChevronLeft } from 'lucide-react';
import { auth } from '../firebase';
import { api } from '../utils/api';

const AuthModal = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [authMethod, setAuthMethod] = useState('phone');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [isVerifyStep, setIsVerifyStep] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        
        // Normalize Phone: Prevent leading zero and non-digits
        if (name === 'phone') {
            value = value.replace(/\D/g, ''); // Numbers only
            if (value.startsWith('0')) value = value.substring(1); // Remove leading 0
            if (value.length > 9) value = value.substring(0, 9); // Max 9 digits
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        
        // If phone changes, reset verification
        if (name === 'phone') {
            setIsPhoneVerified(false);
            setOtp(['', '', '', '', '', '']);
        }
        
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling && element.value) element.nextSibling.focus();
    };

    const validate = () => {
        const newErrors = {};
        if (isSignUp) {
            if (!formData.name.trim()) newErrors.name = 'Full name is required';
            if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
            const phoneRegex = /^\d{9,10}$/;
            if (!formData.phone) newErrors.phone = 'Phone is required';
            else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone';
            
            if (!isPhoneVerified) newErrors.phone = 'Please verify your phone number first';
        } else {
            if (authMethod === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!formData.email) newErrors.email = 'Email is required';
                else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
            } else {
                if (!formData.phone) newErrors.phone = 'Phone is required';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleVerifyPhone = async () => {
        const cleanPhone = formData.phone.replace(/\s/g, ''); // Normalize
        const phoneRegex = /^\d{9,10}$/;
        if (!phoneRegex.test(cleanPhone)) {
            setErrors({ phone: 'Valid phone number required for verification' });
            return;
        }
        
        setIsLoading(true);
        setOtp(['', '', '', '', '', '']);
        try {
            // For Sign-Up, we want to PREVENT duplicates
            const response = await api.sendOTP(cleanPhone, 'phone', false, true);
            if (response.success) {
                setShowOtpPopup(true);
                setErrors({});
            } else {
                setErrors({ phone: response.message || "Failed to send OTP" });
            }
        } catch (error) {
            setErrors({ submit: "Connection error" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmOTP = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length < 6) return;
        setIsLoading(true);
        const cleanPhone = formData.phone.replace(/\s/g, ''); // Normalize
        try {
            const response = await api.verifyOTP(cleanPhone, fullOtp, null);
            if (response.success) {
                setIsPhoneVerified(true);
                setShowOtpPopup(false);
                setErrors({});
            } else {
                setErrors({ otp: response.message || "Invalid OTP" });
            }
        } catch (error) {
            setErrors({ otp: "Verification failed" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        
        if (isSignUp) {
            // Final Sign Up - Profile is already verified, just sync settings
            setIsLoading(true);
            try {
                // 2. Finalize registration in our MongoDB
                const result = await api.syncUser({
                    userId: `u_${Date.now()}`,
                    displayName: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    location: formData.address
                });

                if (result && (result._id || result.firebaseId)) {
                    // Registration Success!
                    setErrors({ success: "Registration successful! Please sign in to continue." });
                    
                    // Redirect to Login after 2 seconds
                    setTimeout(() => {
                        setIsSignUp(false);
                        setIsVerifyStep(false);
                        setIsPhoneVerified(false);
                        setFormData({ name: '', email: '', phone: '', address: '' });
                        setErrors({});
                    }, 2000);
                } else {
                    setErrors({ submit: result.message || "Failed to create profile record" });
                }
            } catch (err) {
                setErrors({ submit: "Failed to create profile" });
            } finally {
                setIsLoading(false);
            }
        } else {
            // Log In flow (existing)
            setIsLoading(true);
            const identifier = authMethod === 'email' ? formData.email : formData.phone;
            try {
                // For Login, we REQUIRE the user to exist
                const response = await api.sendOTP(identifier, authMethod, true);
                if (response.success) {
                    setIsVerifyStep(true);
                } else {
                    setErrors({ submit: response.message || "User not found or error" });
                }
            } catch (error) {
                setErrors({ submit: "Connection error" });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleVerify = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length < 6) return;
        setIsLoading(true);
        const identifier = authMethod === 'email' ? formData.email : formData.phone;

        try {
            const profileData = isSignUp ? {
                uid: `u_${Date.now()}`,
                userId: `u_${Date.now()}`,
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phone,
                location: formData.address
            } : null;

            const response = await api.verifyOTP(identifier, fullOtp, profileData);
            if (response.success) {
                const user = response.user;
                // Save Profile to LocalStorage
                localStorage.setItem('mr_pasta_user', JSON.stringify({
                    userId: user.userId,
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    address: user.location
                }));
                
                // Save for future profile page lookups
                localStorage.setItem(`user_profile_${user.userId}`, JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    address: user.location
                }));

                // 1. Sync & Merge Cart
                const localCart = JSON.parse(localStorage.getItem('mr_pasta_cart') || '{}');
                const backendCart = user.cart || [];
                const mergedCart = { ...localCart };
                
                backendCart.forEach(item => {
                    // Backend quantity takes preference or we combine? 
                    // Let's take the max of both for a better user experience
                    mergedCart[item.productId] = Math.max(mergedCart[item.productId] || 0, item.quantity);
                });
                
                localStorage.setItem('mr_pasta_cart', JSON.stringify(mergedCart));

                // 2. Sync & Merge Favorites
                const localFavorites = JSON.parse(localStorage.getItem('mr_pasta_favorites') || '[]');
                const backendFavorites = user.favorites || [];
                const mergedFavorites = Array.from(new Set([...localFavorites, ...backendFavorites]));
                
                localStorage.setItem('mr_pasta_favorites', JSON.stringify(mergedFavorites));

                // 3. Push merged data back to backend immediately
                const cartArray = Object.keys(mergedCart).map(itemId => ({
                    productId: parseInt(itemId),
                    quantity: mergedCart[itemId]
                }));
                
                Promise.all([
                    api.updateCart(user.firebaseId, cartArray),
                    api.updateFavorites(user.firebaseId, mergedFavorites)
                ]).catch(err => console.error("Initial sync error:", err));

                window.dispatchEvent(new Event('storage'));
                window.dispatchEvent(new Event('cart-updated'));
                onClose();
                setTimeout(() => window.location.reload(), 500); // Small delay for sync promises
            } else {
                setErrors({ submit: response.message || "Invalid OTP" });
            }
        } catch (error) {
            setErrors({ submit: "Verification failed" });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setIsVerifyStep(false);
        setErrors({});
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease-out'
        }} onClick={onClose}>
            <div
                style={{
                    background: 'var(--color-white)',
                    width: '100%',
                    maxWidth: '480px',
                    borderRadius: '24px',
                    padding: '40px',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '24px',
                        right: '24px',
                        background: 'var(--color-gray-soft)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#000',
                        transition: 'var(--transition)'
                    }}
                    className="hover-scale"
                >
                    <X size={18} />
                </button>

                {isVerifyStep && (
                    <button
                        onClick={() => setIsVerifyStep(false)}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            left: '24px',
                            background: 'var(--color-gray-soft)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#000',
                            transition: 'var(--transition)'
                        }}
                        className="hover-scale"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}

                {isVerifyStep ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>Verify Account</h2>
                        <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
                            We've sent a code to <br />
                            <strong>{(isSignUp || authMethod === 'phone') ? `+94 ${formData.phone}` : formData.email}</strong>
                        </p>

                        {errors.submit && (
                            <div style={{
                                background: '#fff5f5',
                                border: '1px solid #feb2b2',
                                color: '#c53030',
                                padding: '12px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                {errors.submit}
                            </div>
                        )}
                        {errors.success && (
                            <div style={{
                                background: '#f6ffed',
                                border: '1px solid #b7eb8f',
                                color: '#52c41a',
                                padding: '12px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'center'
                            }}>
                                {errors.success}
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                    style={{
                                        width: '48px',
                                        height: '56px',
                                        borderRadius: '12px',
                                        border: '2px solid #eee',
                                        textAlign: 'center',
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        outline: 'none',
                                        background: '#f9f9f9',
                                        transition: 'border-color 0.2s'
                                    }}
                                />
                            ))}
                        </div>

                        <button 
                            disabled={isLoading}
                            onClick={handleVerify} 
                            style={{...primaryBtnStyle, opacity: isLoading ? 0.7 : 1}}
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Continue'}
                        </button>

                        <p style={{ marginTop: '24px', fontSize: '14px', color: '#666' }}>
                            Didn't receive the code? <br />
                            <button 
                                onClick={handleSubmit}
                                style={{ background: 'none', border: 'none', color: 'var(--color-terracotta)', fontWeight: '700', cursor: 'pointer', marginTop: '8px' }}
                            >
                                Resend OTP
                            </button>
                        </p>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center', letterSpacing: '-0.5px' }}>
                            {isSignUp ? 'Create Profile' : 'Sign In'}
                        </h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '32px', fontSize: '15px' }}>
                            {isSignUp ? 'Join the MR. PASTA community' : 'Welcome back to MR. PASTA'}
                        </p>

                        {errors.submit && (
                            <div style={{
                                background: '#fff5f5',
                                border: '1px solid #feb2b2',
                                color: '#c53030',
                                padding: '12px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'center'
                            }}>
                                {errors.submit}
                            </div>
                        )}
                        {errors.success && (
                            <div style={{
                                background: '#f6ffed',
                                border: '1px solid #b7eb8f',
                                color: '#52c41a',
                                padding: '12px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'center'
                            }}>
                                {errors.success}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {isSignUp ? (
                                <>
                                    <div style={inputContainer}>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            style={{ ...inputStyle, borderColor: errors.name ? '#ff3b30' : '#ddd' }}
                                        />
                                        {errors.name && <span style={errorText}>{errors.name}</span>}
                                    </div>

                                    <div style={inputContainer}>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            style={{ ...inputStyle, borderColor: errors.email ? '#ff3b30' : '#ddd' }}
                                        />
                                        {errors.email && <span style={errorText}>{errors.email}</span>}
                                    </div>

                                    <div style={inputContainer}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <div style={{ ...prefixStyle, height: '56px' }}>🇱🇰 +94</div>
                                                    <input
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="7XXXXXXXX"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        style={{ ...inputStyle, borderColor: errors.phone ? '#ff3b30' : (isPhoneVerified ? '#4caf50' : '#ddd') }}
                                                    />
                                                </div>
                                                <span style={{ fontSize: '11px', color: '#888', marginLeft: '4px' }}>Exclude leading '0' (e.g., 771234567)</span>
                                                {errors.phone && <span style={errorText}>{errors.phone}</span>}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleVerifyPhone}
                                                disabled={isPhoneVerified || isLoading}
                                                style={{
                                                    padding: '0 20px',
                                                    height: '56px',
                                                    borderRadius: '12px',
                                                    background: isPhoneVerified ? '#4caf50' : 'var(--color-terracotta)',
                                                    color: 'white',
                                                    border: 'none',
                                                    fontSize: '14px',
                                                    fontWeight: '700',
                                                    cursor: isPhoneVerified ? 'default' : 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {isPhoneVerified ? 'Verified ✓' : (isLoading ? '...' : 'Verify')}
                                            </button>
                                        </div>
                                    </div>

                                    <div style={inputContainer}>
                                        <textarea
                                            name="address"
                                            placeholder="Full Delivery Address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            style={{
                                                ...inputStyle,
                                                minHeight: '80px',
                                                resize: 'none',
                                                borderColor: errors.address ? '#ff3b30' : '#ddd'
                                            }}
                                        />
                                        {errors.address && <span style={errorText}>{errors.address}</span>}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {authMethod === 'phone' ? (
                                        <div style={inputContainer}>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <div style={prefixStyle}>🇱🇰 +94</div>
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="7XXXXXXXX"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    style={{ ...inputStyle, borderColor: errors.phone ? '#ff3b30' : '#ddd' }}
                                                    autoFocus
                                                />
                                            </div>
                                            <span style={{ fontSize: '11px', color: '#888', marginLeft: '4px' }}>Exclude leading '0' (e.g., 771234567)</span>
                                            {errors.phone && <span style={errorText}>{errors.phone}</span>}
                                        </div>
                                    ) : (
                                        <div style={inputContainer}>
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, borderColor: errors.email ? '#ff3b30' : '#ddd' }}
                                                autoFocus
                                            />
                                            {errors.email && <span style={errorText}>{errors.email}</span>}
                                        </div>
                                    )}
                                </>
                            )}

                            <button
                                disabled={isLoading}
                                onClick={handleSubmit}
                                style={{...primaryBtnStyle, opacity: isLoading ? 0.7 : 1}}
                                className="hover-scale"
                            >
                                {isLoading ? 'Sending code...' : (isSignUp ? 'Sign Up' : 'Continue')}
                            </button>

                            {!isSignUp && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
                                        <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                                        <span style={{ fontSize: '13px', color: '#999', fontWeight: '500' }}>OR</span>
                                        <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setAuthMethod(authMethod === 'phone' ? 'email' : 'phone');
                                            setErrors({});
                                        }}
                                        style={secondaryBtnStyle}
                                        className="hover-scale"
                                    >
                                        {authMethod === 'phone' ? <Mail size={20} /> : <Phone size={20} />}
                                        Continue with {authMethod === 'phone' ? 'Email' : 'Phone'}
                                    </button>
                                </>
                            )}

                            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                                <span style={{ fontSize: '14px', color: '#666' }}>
                                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                                </span>
                                <button
                                    onClick={toggleMode}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-terracotta)',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        paddingLeft: '6px',
                                        fontSize: '14px'
                                    }}
                                >
                                    {isSignUp ? 'Sign In' : 'Sign Up'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {/* OTP Verification Popup */}
                {showOtpPopup && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        zIndex: 10,
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Verify Number</h3>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                            We sent a 6-digit code to <br />
                            <strong>+94 {formData.phone}</strong>
                        </p>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    style={{
                                        width: '40px',
                                        height: '50px',
                                        borderRadius: '8px',
                                        border: '2px solid #ddd',
                                        textAlign: 'center',
                                        fontSize: '18px',
                                        fontWeight: '700'
                                    }}
                                />
                            ))}
                        </div>

                        {errors.otp && <p style={{ color: '#ff3b30', fontSize: '13px', marginBottom: '16px' }}>{errors.otp}</p>}

                        <button
                            onClick={handleConfirmOTP}
                            disabled={isLoading}
                            style={{ ...primaryBtnStyle, width: '200px' }}
                        >
                            {isLoading ? 'Verifying...' : 'Confirm'}
                        </button>

                        <div style={{ marginTop: '24px' }}>
                            <p style={{ fontSize: '13px', color: '#666' }}>Didn't receive the code?</p>
                            <button
                                onClick={handleVerifyPhone}
                                disabled={isLoading}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-terracotta)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    marginTop: '4px',
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s'
                                }}
                                className="hover-scale"
                            >
                                {isLoading ? 'Sending...' : 'Resend OTP'}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowOtpPopup(false)}
                            style={{ background: 'none', border: 'none', color: '#999', marginTop: '16px', cursor: 'pointer', fontSize: '14px' }}
                        >
                            Change Number
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-border)',
    fontSize: '16px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'var(--transition)'
};

const primaryBtnStyle = {
    width: '100%',
    padding: '16px',
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'var(--transition)',
    marginTop: '8px'
};

const prefixStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    background: 'var(--color-gray-soft)',
    fontSize: '14px',
    fontWeight: '600',
    whiteSpace: 'nowrap'
};

const inputContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
};

const errorText = {
    fontSize: '12px',
    color: '#ff3b30',
    fontWeight: '500',
    paddingLeft: '4px'
};

const secondaryBtnStyle = {
    width: '100%',
    padding: '14px',
    background: 'var(--color-white)',
    color: 'var(--color-deep-black)',
    border: '1px solid var(--color-gray-border)',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'var(--transition)'
};

export default AuthModal;
