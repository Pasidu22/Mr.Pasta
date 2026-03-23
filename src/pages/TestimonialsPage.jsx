import React, { useState, useEffect } from 'react';
import Testimonials from '../components/Testimonials';
import { api } from '../utils/api';
import { Star, Send, CheckCircle } from 'lucide-react';

const TestimonialsPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', location: '', rating: 5, text: '' });

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const data = await api.getApprovedFeedback();
            setFeedbacks(data);
        } catch (err) {
            console.error('Fetch feedback error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.submitFeedback(formData);
            setSubmitted(true);
            setFormData({ name: '', location: '', rating: 5, text: '' });
            setTimeout(() => {
                setSubmitted(false);
                setShowForm(false);
            }, 5000);
        } catch (err) {
            alert('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out', paddingBottom: '80px' }}>
            <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--color-terracotta)', color: 'white', borderRadius: '0 0 40px 40px', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '42px', fontWeight: '800', fontFamily: 'var(--font-accent)', margin: 0 }}>Customer Feedbacks</h1>
                <p style={{ fontSize: '18px', opacity: 0.9, marginTop: '12px' }}>Real stories from real pasta lovers across Sri Lanka</p>
                
                <button 
                    onClick={() => setShowForm(!showForm)}
                    style={{ 
                        marginTop: '32px', padding: '16px 32px', borderRadius: 'var(--radius-full)', border: 'none', 
                        background: 'white', color: 'var(--color-terracotta)', fontWeight: '800', cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                    className="hover-scale"
                >
                    {showForm ? 'View Reviews' : 'Write a Review'}
                </button>
            </div>

            {showForm ? (
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <CheckCircle size={64} color="#22c55e" style={{ marginBottom: '20px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>Thank You!</h2>
                            <p style={{ color: '#666' }}>Your review has been submitted for moderation and will appear on the site soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '800', textAlign: 'center' }}>Share Your Experience</h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '700' }}>Name</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" style={{ padding: '14px', borderRadius: '14px', border: '1px solid #eee', outline: 'none' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '700' }}>Location</label>
                                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City (e.g. Colombo)" style={{ padding: '14px', borderRadius: '14px', border: '1px solid #eee', outline: 'none' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: '700' }}>Rating</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star 
                                            key={star} 
                                            size={32} 
                                            style={{ cursor: 'pointer' }} 
                                            fill={star <= formData.rating ? '#FFB800' : 'none'} 
                                            color={star <= formData.rating ? '#FFB800' : '#ddd'} 
                                            onClick={() => setFormData({...formData, rating: star})}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: '700' }}>Your Review</label>
                                <textarea required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} placeholder="What did you think of the pasta?" style={{ padding: '14px', borderRadius: '14px', border: '1px solid #eee', minHeight: '120px', outline: 'none' }} />
                            </div>

                            <button type="submit" style={{ padding: '16px', borderRadius: '14px', border: 'none', background: 'var(--color-terracotta)', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} className="hover-scale">
                                <Send size={20} /> Submit Review
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading reviews...</div>
                    ) : feedbacks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>No reviews yet. Be the first to write one!</div>
                    ) : (
                        <Testimonials staticReviews={feedbacks} />
                    )}
                </>
            )}
            
            <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '32px', border: '2px dashed var(--color-gray-border)' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Need Help?</h3>
                    <p style={{ color: '#666', marginBottom: '24px' }}>
                        If you have any questions about your order or our products, reach out to us on WhatsApp.
                    </p>
                    <a 
                        href="https://wa.me/94729280262" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            background: '#25D366',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '700'
                        }}
                    >
                        Chat with Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;
