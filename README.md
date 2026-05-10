# SaadCreate Hotel — Refined Luxury, Curated Stays 🕊️

![SaadCreate Hotel](/public/Images/saadcreate_logo.svg)

## 📋 Overview

SaadCreate Hotel is a luxury hotel management app built with Next.js. It combines a refined public-facing site (hero carousel, about, services, rooms, booking, contact) with an admin panel that lets hotel managers edit everything — rooms, images, and even site-wide content — from one place.

## 🎨 New Visual Identity (v2)

- **Palette** — Deep navy `#0B1B2B`, champagne gold `#C8A35A → #8C6B2E`, ivory `#F6F1E7`
- **Typography** — *Playfair Display* for editorial headlines + *Inter* for UI
- **Logo** — Crafted SVG crest with a stylised "S" monogram, crown notch, and gold gradient (scales perfectly at any size)
- **Design language** — Editorial whitespace, gold gradient accents, gentle parallax on the hero, soft shadows, rounded "card-lux" treatment throughout

## 🛠️ Manager's "Site Content" Page

Located in the admin panel at **Admin → Site Content**, hotel managers can now edit the public site **without touching code**:

- **Brand** — replace the logo (upload image), change brand name + tagline
- **Hero carousel** — add/remove/reorder slides, change images, eyebrow, title, gold highlight, subtitle
- **About** — swap primary & secondary images, edit paragraphs and stats (e.g. "25+ Years")
- **Services** — add/remove/edit each service card (icon + name + description)
- **Contact** — address, phone, email (appears in footer)

Uploads go to `/public/uploads/` via `POST /api/upload`. Content is persisted to `app/data/site-content.json` via `GET`/`PUT /api/site-content`.

## ✨ Features

- 🏨 **Room Management**: Browse and manage hotel rooms
- 📅 **Booking System**: Easy-to-use reservation system
- 👥 **User Authentication**: Secure login and registration
- 📊 **Admin Dashboard**: Comprehensive management tools
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Beautiful and intuitive interface

## 🚀 SEO Optimizations

This application includes comprehensive SEO features:

- ✅ **Meta Tags**: Complete OpenGraph and Twitter Card metadata
- ✅ **Structured Data**: Schema.org JSON-LD for better search engine understanding
- ✅ **Sitemap**: Automatic sitemap generation
- ✅ **Robots.txt**: Proper search engine crawling directives
- ✅ **Canonical URLs**: Prevent duplicate content issues
- ✅ **Alt Text**: All images have descriptive alt attributes
- ✅ **Semantic HTML**: Proper heading hierarchy and semantic elements
- ✅ **PWA Support**: Progressive Web App with manifest.json
- ✅ **Performance**: Optimized images and code splitting

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS (custom brand palette + Playfair/Inter fonts)
- **Icons**: Inline SVG (lucide-style)
- **Fonts**: Google Fonts (Playfair Display + Inter)
- **HTTP Client**: Axios
- **Storage**: Local JSON + `/public/uploads/` (dev). Swap in Cloudinary/S3 for production.

## ⚠️ Production note on image uploads

`POST /api/upload` writes to `public/uploads/` on the server filesystem — that works in dev and on any Node host, but **does not persist on Vercel** (read-only FS). For production, replace the body of `app/api/upload/route.js` with a Cloudinary/S3/Supabase Storage upload and return the remote URL. The rest of the app needs no changes.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/edhotel.git

# Navigate to the project directory
cd edhotel/front

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SERVER_URL=your_backend_url
SITE_URL=https://edhotel.vercel.app
```

## 📱 Pages

- **Home**: Landing page with carousel
- **About**: Information about EdHotel
- **Services**: Hotel services overview
- **Rooms**: Browse available rooms
- **Booking**: Make reservations
- **Contact**: Get in touch
- **Login/Register**: User authentication

## 🔍 SEO Best Practices Implemented

### 1. Metadata
- Comprehensive title and description for each page
- OpenGraph tags for social media sharing
- Twitter Card metadata
- Proper viewport configuration

### 2. Structured Data
- Hotel schema with complete business information
- Aggregate ratings
- Contact information
- Address details

### 3. Technical SEO
- Canonical URLs
- Robots meta tags
- XML sitemap
- Proper heading hierarchy (H1, H2, H3)
- Alt text for all images
- Semantic HTML5 elements

### 4. Performance
- Image optimization
- Code splitting
- Lazy loading
- Minification

## 👨‍💻 Author

**Abdellah Edaoudi**
- LinkedIn: [abdellah-edaoudi](https://www.linkedin.com/in/abdellah-edaoudi-0bbba02a5/)
- Portfolio: [ed-portfolioo.vercel.app](https://ed-portfolioo.vercel.app)
- Instagram: [@edaoudi_abdellah](https://www.instagram.com/edaoudi_abdellah/)

## 📄 License

© 2024 EdHotel. All rights reserved.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

- **Email**: abdellahedaoudi80@gmail.com
- **Phone**: +212607071966
- **Location**: Laayoune, Morocco

---

Made with ❤️ by Abdellah Edaoudi
