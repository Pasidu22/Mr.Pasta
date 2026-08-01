"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import carousel01 from '../assets/carousel_01.png';
import carousel02 from '../assets/carousel_02.png';
import carousel03 from '../assets/carousel_03.png';
import apekshaImg from '../assets/apeksha.png';

const PromoCarousel = () => {
    const scrollRef = useRef(null);
    const router = useRouter();

    const banners = [
        {
            id: 1,
            title: "Direct from Factory",
            subtitle: "Wholesale prices for premium quality pasta packets.",
            cta: "View Catalogue",
            gradient: "linear-gradient(135deg, #05A357 0%, #036838 100%)",
            shadow: "rgba(5, 163, 87, 0.2)",
            image: carousel01,
            link: "/products"
        },
        {
            id: 2,
            title: "New Gluten-Free Range",
            subtitle: "Explore our latest gluten-free and health-conscious varieties.",
            cta: "Shop Now",
            gradient: "linear-gradient(135deg, #FF5C00 0%, #D83F00 100%)",
            shadow: "rgba(255, 92, 0, 0.2)",
            image: carousel02,
            link: "/products?category=Gluten-Free"
        },
        {
            id: 3,
            title: "Golden Hearts Support",
            subtitle: "Every purchase directly supports cancer care at Apeksha Hospital.",
            cta: "Learn More",
            gradient: "linear-gradient(135deg, #9B1C31 0%, #681220 100%)",
            shadow: "rgba(155, 28, 49, 0.2)",
            image: apekshaImg,
            link: "/#social-impact"
        },
        {
            id: 4,
            title: "Welcome Offer! 🎁",
            subtitle: "New user? Use code NEWPASTA20 for 20% off your first order.",
            cta: "Redeem Now",
            gradient: "linear-gradient(135deg, #6c5ce7 0%, #4a3cb0 100%)",
            shadow: "rgba(108, 92, 231, 0.2)",
            isNew: true,
            image: carousel03,
            link: "/products"
        }
    ];

    const handleAction = (link) => {
        if (link.startsWith('/#')) {
            const id = link.split('#')[1];
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                router.push(link);
            }
        } else {
            router.push(link);
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
                    gap: '20px',
                    padding: '10px 4px 20px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                className="hide-scrollbar"
            >
                {banners.map(banner => (
                    <div
                        key={banner.id}
                        className="promo-card-v4"
                        style={{
                            flex: '0 0 calc(33.333% - 14px)',
                            minWidth: '320px',
                            minHeight: '190px',
                            background: banner.gradient,
                            borderRadius: '24px',
                            padding: '28px',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            scrollSnapAlign: 'start',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: `0 12px 30px ${banner.shadow}`,
                            cursor: 'pointer'
                        }}
                        onClick={() => handleAction(banner.link)}
                    >
                        {/* Glassmorphic card overlay details */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            left: '-50px',
                            width: '120px',
                            height: '120px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '50%',
                            filter: 'blur(20px)',
                            pointerEvents: 'none'
                        }}></div>

                        <div style={{ maxWidth: '62%', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h2 style={{ 
                                    fontSize: '22px', 
                                    fontWeight: '800', 
                                    marginBottom: '8px', 
                                    letterSpacing: '-0.5px', 
                                    fontFamily: 'var(--font-accent)',
                                    lineHeight: '1.25' 
                                }}>
                                    {banner.title}
                                </h2>
                                <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '20px', lineHeight: '1.45', fontWeight: '500' }}>
                                    {banner.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleAction(banner.link); }}
                                className="promo-btn-v4"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    padding: '8px 20px',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    borderRadius: '100px',
                                    cursor: 'pointer'
                                }}
                            >
                                {banner.cta}
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        <div 
                            className="image-container-v4"
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                width: '42%',
                                height: '100%',
                                zIndex: 1,
                                overflow: 'hidden',
                                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            <img 
                                src={banner.image.src || banner.image} 
                                alt={banner.title}
                                className="banner-img-v4"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

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
                .promo-card-v4 {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }
                .promo-card-v4:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
                }
                .promo-card-v4:hover .banner-img-v4 {
                    transform: scale(1.08);
                }
                .promo-card-v4:hover .image-container-v4 {
                    clip-path: polygon(5% 0, 100% 0, 100% 100%, 0% 100%) !important;
                }
                .promo-btn-v4 {
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }
                .promo-btn-v4:hover {
                    background: white !important;
                    color: var(--color-deep-black) !important;
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default PromoCarousel;
