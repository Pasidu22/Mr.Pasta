import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { api } from '../utils/api';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [saveStatus, setSaveStatus] = useState('');

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('edit') === 'true') {
            setIsEditing(true);
        }
    }, [location]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const savedUser = localStorage.getItem('mr_pasta_user');
            if (savedUser) {
                try {
                    const userObj = JSON.parse(savedUser);
                    const currentUserId = userObj.userId || userObj.uid;
                    
                    // Try fetching full profile from DB if not in local
                    const profile = await api.getUser(currentUserId);
                    if (profile) {
                        setUser(profile);
                        setFormData({
                            name: profile.name || '',
                            email: profile.email || '',
                            phone: profile.phone || '',
                            address: profile.address || ''
                        });
                    } else {
                        // If API doesn't return a profile, use the one from localStorage
                        setUser(userObj);
                        setFormData({
                            name: userObj.name || '',
                            email: userObj.email || '',
                            phone: userObj.phone || '',
                            address: userObj.address || ''
                        });
                    }
                } catch (e) {
                    console.error("Error parsing user profile or fetching from API", e);
                    navigate('/');
                }
            } else {
                // Not logged in - redirect to home
                navigate('/');
            }
            setLoading(false);
        };
        fetchUserProfile();
    }, [navigate]);

    const handleSave = () => {
        const savedUser = localStorage.getItem('mr_pasta_user');
        if (!savedUser) return;
        
        const userObj = JSON.parse(savedUser);
        const currentUserId = userObj.userId || userObj.uid;
        
        const updatedProfile = {
            ...user,
            ...formData,
            userId: currentUserId,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(`user_profile_${currentUserId}`, JSON.stringify(updatedProfile));
        localStorage.setItem('mr_pasta_user', JSON.stringify(updatedProfile));
        setUser(updatedProfile);
        setIsEditing(false);
        setSaveStatus('Profile updated successfully!');
        
        setTimeout(() => setSaveStatus(''), 3000);
        
        // Sync with any components listening to mr_pasta_user (like Navbar)
        window.dispatchEvent(new Event('storage'));
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Loader2 className="animate-spin" size={40} color="var(--color-terracotta)" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
                    className="hover-scale"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '32px', fontWeight: '700', margin: 0, letterSpacing: '-1px' }}>My Profile</h1>
            </div>

            <div style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '40px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                border: '1px solid var(--color-gray-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            background: 'var(--color-terracotta)', 
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            fontWeight: '700'
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>{user.name}</h2>
                            <p style={{ color: '#666', margin: 0 }}>Customer since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: '1px solid #ddd',
                            background: isEditing ? 'white' : 'black',
                            color: isEditing ? 'black' : 'white',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                        }}
                        className="hover-scale"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <div style={{ display: 'grid', gap: '24px' }}>
                    <div style={inputGroup}>
                        <label style={labelStyle}><User size={16} /> Full Name</label>
                        <input 
                            type="text" 
                            value={formData.name} 
                            disabled={!isEditing}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            style={{...inputStyle, background: isEditing ? 'white' : '#f9f9f9'}}
                        />
                    </div>

                    <div style={inputGroup}>
                        <label style={labelStyle}><Mail size={16} /> Email Address</label>
                        <input 
                            type="email" 
                            value={formData.email} 
                            disabled={true} // Email typically doesn't change easily in simple auth flows
                            style={{...inputStyle, background: '#f9f9f9', cursor: 'not-allowed'}}
                        />
                        <span style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Email is managed by your account settings</span>
                    </div>

                    <div style={inputGroup}>
                        <label style={labelStyle}><Phone size={16} /> Phone Number</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ 
                                padding: '14px 16px', 
                                background: '#f9f9f9', 
                                border: '1px solid #ddd', 
                                borderRadius: '12px',
                                fontSize: '15px',
                                fontWeight: '600'
                            }}>🇱🇰 +94</div>
                            <input 
                                type="tel" 
                                value={formData.phone} 
                                disabled={!isEditing}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                style={{...inputStyle, background: isEditing ? 'white' : '#f9f9f9'}}
                            />
                        </div>
                    </div>

                    <div style={inputGroup}>
                        <label style={labelStyle}><MapPin size={16} /> Delivery Address</label>
                        <textarea 
                            value={formData.address} 
                            disabled={!isEditing}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            style={{
                                ...inputStyle, 
                                minHeight: '100px', 
                                resize: 'none',
                                background: isEditing ? 'white' : '#f9f9f9'
                            }}
                        />
                    </div>
                </div>

                {isEditing && (
                    <button 
                        onClick={handleSave}
                        style={{
                            width: '100%',
                            marginTop: '40px',
                            padding: '16px',
                            background: 'var(--color-terracotta)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: '16px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                        }}
                        className="hover-scale"
                    >
                        <Save size={20} />
                        Save Changes
                    </button>
                )}

                {saveStatus && (
                    <div style={{
                        marginTop: '20px',
                        padding: '12px',
                        background: '#f0fff4',
                        color: '#2f855a',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '1px solid #c6f6d5'
                    }}>
                        {saveStatus}
                    </div>
                )}
            </div>
        </div>
    );
};

const inputGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
};

const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
};

const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
};

export default Profile;
