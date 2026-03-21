import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import carousel images
import carousel01 from '../assets/carousel_01.png';
import carousel02 from '../assets/carousel_02.png';
import carousel03 from '../assets/carousel_03.png';
import apekshaImg from '../assets/apeksha.png';

const PromoCarousel = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const banners = [
        {
            id: 1,
            title: "Direct from Factory ",
            subtitle: "Wholesale prices for premium quality pasta packets.",
            cta: "View Catalogue",
            color: "#05A357",
            image: carousel01,
            link: "/products"
        },
        {
            id: 2,
            title: "New Gluten-Free Range",
            subtitle: "Explore our latest gluten-free and health-conscious varieties.",
            cta: "Shop Now",
            color: "#FF5C00",
            image: carousel02,
            link: "/products?category=Gluten-Free"
        },
        {
            id: 3,
            title: "Golden hearts ❤️",
            subtitle: "Every purchase directly supports cancer care at Apeksha Hospital.",
            cta: "Learn More",
            color: "#E11D48",
            image: apekshaImg,
            link: "/#social-impact"
        },
        {
            id: 4,
            title: "Welcome Offer! 🎁",
            subtitle: "New user? Use code NEWPASTA20 for 20% off your first order.",
            cta: "Redeem Now",
            color: "#6c5ce7",
            isNew: true,
            image: carousel03,
            link: "/products"
        }
    ];

    const handleAction = (link) => {
        if (link.startsWith('/#')) {
            // Handle internal hash link within Home page
            const id = link.split('#')[1];
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate(link);
            }
        } else {
            navigate(link);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', marginBottom: '48px', padding: '0 10px' }}>
            <div
                ref={scrollRef}
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: '16px',
                    paddingBottom: '10px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                className="hide-scrollbar"
            >
                {banners.map(banner => (
                    <div
                        key={banner.id}
                        style={{
                            flex: '0 0 calc(33.333% - 11px)',
                            minWidth: '300px',
                            minHeight: '160px',
                            background: banner.color,
                            borderRadius: '20px',
                            padding: '24px',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            scrollSnapAlign: 'start',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ maxWidth: '65%', zIndex: 2 }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px', textTransform: 'none', lineHeight: '1.2' }}>
                                {banner.title}
                            </h2>
                            <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px', maxWidth: '200px', lineHeight: '1.4' }}>
                                {banner.subtitle}
                            </p>
                            <button
                                onClick={() => handleAction(banner.link)}
                                className="btn-pill hover-scale"
                                style={{
                                    background: 'var(--color-deep-black)',
                                    color: 'white',
                                    padding: '10px 24px',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    border: 'none',
                                    borderRadius: '100px',
                                    cursor: 'pointer'
                                }}
                            >
                                {banner.cta}
                            </button>
                        </div>

                        {/* Promo Image */}
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: '40%',
                            height: '100%',
                            zIndex: 1,
                            overflow: 'hidden'
                        }}>
                            <img 
                                src={banner.image} 
                                alt={banner.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll('left')}
                style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: 'var(--color-deep-black)'
                }}
                className="hover-scale"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={() => scroll('right')}
                style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: 'var(--color-deep-black)'
                }}
                className="hover-scale"
            >
                <ChevronRight size={24} />
            </button>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default PromoCarousel;
