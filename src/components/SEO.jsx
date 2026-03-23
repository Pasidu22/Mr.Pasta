import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
    useEffect(() => {
        // Update document title
        const baseTitle = 'Mr. Pasta';
        document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Premium Sri Lankan Pasta`;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Experience the best premium pasta in Sri Lanka. Gourmet dining at home while supporting cancer care.');
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords || 'Mr. Pasta, Sri Lanka, Premium Pasta, Gourmet, Healthy, Gluten-Free');
        }

        // Update OG title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', title ? `${title} | ${baseTitle}` : `${baseTitle} | Premium Sri Lankan Pasta`);
        }
    }, [title, description, keywords]);

    return null; // This component doesn't render anything
};

export default SEO;
