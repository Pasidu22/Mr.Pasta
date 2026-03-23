import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { api } from '../utils/api';

const Testimonials = ({ staticReviews }) => {
    const [feedbacks, setFeedbacks] = useState(staticReviews || []);
    const [loading, setLoading] = useState(!staticReviews);

    const fallbackReviews = [
        {
            name: "Chaminda Perera",
            location: "Colombo",
            text: "The Rice Flour Pasta is a game changer! It tastes exactly like regular pasta but feels so much lighter.",
            rating: 5
        },
        {
            name: "Nilanthie Silva",
            location: "Kandy",
            text: "Actually surprised by the quality. The Jackfruit Flour pasta has a unique, delicious texture.",
            rating: 5
        },
        {
            name: "Tharindu Mendis",
            location: "Galle",
            text: "Finally found a brand that gets gluten-free pasta right. Texture is perfect. Kids love it!",
            rating: 5
        }
    ];

    useEffect(() => {
        if (!staticReviews) {
            fetchRandomFeedbacks();
        } else {
            setFeedbacks(staticReviews);
        }
    }, [staticReviews]);

    const fetchRandomFeedbacks = async () => {
        try {
            const data = await api.getApprovedFeedback(3, true);
            setFeedbacks(data.length > 0 ? data : fallbackReviews);
        } catch (err) {
            setFeedbacks(fallbackReviews);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;

    return (
        <section style={{ padding: '80px 20px', background: 'transparent' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {!staticReviews && (
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span style={{ color: 'var(--color-terracotta)', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px' }}>Testimonials</span>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'var(--font-accent)', marginTop: '8px' }}>What Our Customers Say</h2>
                    </div>
                )}

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '32px' 
                }}>
                    {feedbacks.map((review, index) => (
                        <div key={index} style={{ 
                            background: 'white', 
                            padding: '40px', 
                            borderRadius: '32px',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            transition: 'var(--transition)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                        }} className="hover-scale">
                             <Quote size={40} style={{ color: 'var(--color-terracotta)', opacity: 0.1, position: 'absolute', top: '20px', right: '20px' }} />
                            
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {[...Array(Math.round(review.rating))].map((_, i) => (
                                    <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                                ))}
                            </div>

                            <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7', fontStyle: 'italic', flex: 1 }}>
                                "{review.text}"
                            </p>

                            <div>
                                <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{review.name}</h4>
                                <p style={{ fontSize: '14px', color: '#888', margin: '4px 0 0 0' }}>{review.location}, Sri Lanka</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
