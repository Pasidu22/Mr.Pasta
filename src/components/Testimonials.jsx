import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Chaminda Perera",
            location: "Colombo",
            text: "The Rice Flour Pasta is a game changer! It tastes exactly like regular pasta but feels so much lighter. Highly recommended for anyone looking for health-conscious options in Sri Lanka.",
            rating: 5
        },
        {
            name: "Nilanthie Silva",
            location: "Kandy",
            text: "Actually surprised by the quality. The Jackfruit Flour pasta has a unique, delicious texture. Fast delivery and the packaging was very professional. Will definitely order again!",
            rating: 5
        },
        {
            name: "Tharindu Mendis",
            location: "Galle",
            text: "Finally found a brand that gets gluten-free pasta right. The texture is perfect and it doesn't break apart while cooking. My kids love the regular pasta too!",
            rating: 5
        }
    ];

    return (
        <section style={{ padding: '80px 20px', background: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <span style={{ color: 'var(--color-terracotta)', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px' }}>Testimonials</span>
                    <h2 style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'var(--font-accent)', marginTop: '8px' }}>What Our Customers Say</h2>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '32px' 
                }}>
                    {reviews.map((review, index) => (
                        <div key={index} style={{ 
                            background: 'var(--color-gray-soft)', 
                            padding: '40px', 
                            borderRadius: '32px',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            transition: 'var(--transition)'
                        }} className="hover-scale">
                             <Quote size={40} style={{ color: 'var(--color-terracotta)', opacity: 0.1, position: 'absolute', top: '20px', right: '20px' }} />
                            
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--color-terracotta)" color="var(--color-terracotta)" />
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
