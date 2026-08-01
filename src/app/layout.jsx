import { Inter, Outfit } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Mr. Pasta | Premium Sri Lankan Pasta & Gourmet Dining',
    template: '%s | Mr. Pasta'
  },
  description: "Experience the best premium pasta in Sri Lanka. From factory-direct wholesale to healthy gluten-free options, Mr. Pasta brings gourmet dining to your home while supporting cancer care at Apeksha Hospital.",
  keywords: ["Mr. Pasta", "Sri Lanka Pasta", "Premium Pasta Colombo", "Gluten Free Pasta Sri Lanka", "Rice Flour Pasta", "Healthy Pasta", "Apeksha Hospital Support", "Gourmet Dining Sri Lanka"],
  authors: [{ name: 'Mr. Pasta' }],
  openGraph: {
    title: 'Mr. Pasta | Premium Sri Lankan Pasta & Gourmet Dining',
    description: "Experience gourmet dining at home with Sri Lanka's premium value-added pasta. Shop our healthy varieties and support a great cause.",
    url: 'https://mrpasta.lk/',
    type: 'website',
    images: [
      {
        url: 'https://mrpasta.lk/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Mr. Pasta Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr. Pasta | Premium Sri Lankan Pasta & Gourmet Dining',
    description: "Experience gourmet dining at home with Sri Lanka's premium value-added pasta. Shop now and support cancer care.",
    images: ['https://mrpasta.lk/logo.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
