import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { MyProvider } from './context/Mycontext';
import { ToastProvider } from './Components/toast';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

export const metadata = {
  metadataBase: new URL('https://edhotel.vercel.app'),
  title: {
    default: 'SaadCreate Hotel — Refined Luxury, Curated Stays',
    template: '%s | SaadCreate Hotel'
  },
  description:
    'SaadCreate Hotel is a sanctuary of timeless luxury — handcrafted suites, Michelin-trained cuisine, spa rituals, and curated experiences designed around you.',
  applicationName: 'SaadCreate Hotel',
  authors: [{ name: 'Abdellah Edaoudi', url: 'https://abdellah-edaoudi.vercel.app' }],
  generator: 'Next.js',
  keywords: [
    'SaadCreate Hotel',
    'Luxury Hotel',
    'Hotel Management System',
    'Suite Booking',
    'Fine Dining',
    'Spa & Wellness',
    'Hospitality',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'SaadCreate Hotel',
  publisher: 'SaadCreate Hotel Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/Images/saadcreate_logo.svg',
    shortcut: '/Images/saadcreate_logo.svg',
    apple: '/Images/saadcreate_logo.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'SaadCreate Hotel — Refined Luxury, Curated Stays',
    description:
      'A sanctuary of timeless luxury, handcrafted hospitality, and curated experiences.',
    url: 'https://edhotel.vercel.app',
    siteName: 'SaadCreate Hotel',
    images: [
      {
        url: '/Images/saadcreate_logo.svg',
        alt: 'SaadCreate Hotel crest',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaadCreate Hotel — Refined Luxury, Curated Stays',
    description: 'A sanctuary of timeless luxury and handcrafted hospitality.',
    site: '@saadcreatehotel',
    creator: '@saadcreatehotel',
    images: ['/Images/saadcreate_logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'hospitality',
};

export const viewport = {
  themeColor: '#0B1B2B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://edhotel.vercel.app" />
      </head>
      <body className="font-sans bg-brand-cream text-brand-navy antialiased">
        <ToastProvider>
          <MyProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Hotel",
                  "name": "SaadCreate Hotel",
                  "description": "Refined luxury hotel with signature suites, fine dining and spa.",
                  "url": "https://edhotel.vercel.app",
                  "logo": "https://edhotel.vercel.app/Images/saadcreate_logo.svg",
                  "image": "https://edhotel.vercel.app/Images/saadcreate_logo.svg",
                  "telephone": "+212607071966",
                  "email": "abdellahedaoudi80@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Hay Lwahda 1",
                    "addressLocality": "Laayoune",
                    "addressRegion": "Laayoune",
                    "postalCode": "70000",
                    "addressCountry": "MA"
                  },
                  "priceRange": "$$",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "4657"
                  }
                })
              }}
            />
            {children}
          </MyProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
