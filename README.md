<div align="center">

# 🎨 Stampr

### Privacy-First Professional Logo Watermarking Tool

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://stampr.netlify.app)

[Live Demo](https://stampr.netlify.app) | [Documentation](#-features) | [Deployment](#-deployment)

</div>

---

## 🌟 Overview

**Stampr** is a modern, privacy-focused web application that allows users to batch-watermark images with their logo directly in the browser. No uploads, no server processing—complete privacy guaranteed.

### Why Stampr?

- ✅ **100% Client-Side Processing** - Your images never leave your device
- ✅ **Blazing Fast** - Process hundreds of images in seconds
- ✅ **SEO Optimized** - Full metadata, Schema.org, and Open Graph support
- ✅ **PWA Ready** - Installable on any device
- ✅ **Bilingual** - Full English/Arabic support with RTL layout
- ✅ **Production Ready** - Google Analytics, AdSense, and GDPR compliance

---

## ✨ Features

### Core Functionality
| Feature | Description |
|---------|-------------|
| 🖼️ **Batch Processing** | Watermark multiple images simultaneously |
| 🔒 **Complete Privacy** | All processing happens locally using Canvas API |
| ⚡ **Lightning Fast** | No server latency—instant results |
| 🎨 **Full Customization** | Control size, position, opacity, rotation, and alignment |
| 💾 **Flexible Export** | Download individually or as ZIP archive |
| 📐 **Custom Positioning** | Fine-tune X/Y offsets with real-time preview |

### Website & SEO
- 🌐 **Bilingual Support** (English/Arabic with full RTL)
- 📱 **Progressive Web App (PWA)** - Installable as standalone app
- 📊 **Advanced SEO**:
  - Dynamic XML sitemap
  - Robots.txt configuration
  - Open Graph & Twitter Cards
  - JSON-LD Schema.org markup (Organization, Website, Article)
  - Hreflang tags for multilingual SEO
- 📝 **Markdown Blog System** (6 articles included)
- 📊 **Google Analytics GA4** integration
- 💰 **Google AdSense** ready with placeholder slots
- 📤 **Social Sharing** buttons (Facebook, Twitter, LinkedIn, WhatsApp)
- 🍪 **GDPR Compliant** cookie consent banner

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/stampr.git
cd stampr

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15.1](https://nextjs.org/) | React framework with App Router |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalization (i18n) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [JSZip](https://stuk.github.io/jszip/) | ZIP file generation |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Markdown frontmatter parsing |
| [react-markdown](https://remarkjs.github.io/react-markdown/) | Markdown rendering |

---

## 📁 Project Structure

```
stampr/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Internationalized routes
│   │   │   ├── page.js             # Homepage with watermarking tool
│   │   │   ├── about/              # About page
│   │   │   ├── blog/               # Blog system (listing + posts)
│   │   │   ├── contact/            # Contact page with social links
│   │   │   ├── privacy/            # Privacy policy (GDPR)
│   │   │   └── terms/              # Terms of service
│   │   ├── components/
│   │   │   ├── ImageLogoTool/      # Core watermarking logic
│   │   │   ├── layout/             # Navbar & Footer
│   │   │   ├── GoogleAnalytics.jsx # GA4 integration
│   │   │   ├── ShareButtons.jsx    # Social sharing
│   │   │   └── CookieConsent.jsx   # GDPR cookie banner
│   │   ├── robots.js               # SEO robots configuration
│   │   ├── sitemap.js              # Dynamic sitemap generator
│   │   └── manifest.js             # PWA manifest
│   ├── content/articles/           # Markdown blog posts (en/ar)
│   ├── lib/
│   │   ├── posts.js                # Blog utilities
│   │   └── schema.js               # JSON-LD schema generators
│   ├── messages/                   # i18n translation files
│   │   ├── en.json
│   │   └── ar.json
│   └── middleware.js               # Locale detection & routing
├── public/
│   ├── images/blog/                # Blog post images
│   └── logo.png                    # Application logo
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (optional):

```env
# Google Analytics (Replace with your ID)
NEXT_PUBLIC_GA_ID=G-4VK9LW27K3

# Google AdSense (Replace with your Publisher ID)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### Domain Configuration

Update your production domain in these files:

| File | Line | What to Change |
|------|------|----------------|
| `src/app/robots.js` | 6 | Sitemap URL |
| `src/app/sitemap.js` | 4 | Base URL |
| `src/app/[locale]/layout.js` | 14 | metadataBase |
| `src/lib/schema.js` | Multiple | All schema URLs |
| `src/app/components/ShareButtons.jsx` | 9 | Share URL base |

**Search & Replace:**
```bash
# Replace all instances of stampr.netlify.app with your domain
find ./src -type f -exec sed -i 's/stampr\.netlify\.app/yourdomain.com/g' {} +
```

---

## 🌐 Deployment

### Deploy to Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

#### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stampr.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com) and log in
   - Click **"New site from Git"**
   - Choose **GitHub** and select your `stampr` repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click **"Deploy site"**

3. **Add Environment Variables** (Optional):
   - In Netlify Dashboard → Site Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_GA_ID=G-4VK9LW27K3
     NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
     ```

4. **Custom Domain** (Optional):
   - Site Settings → Domain management → Add custom domain

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

---

## 📝 Adding Blog Posts

1. Create a markdown file in `src/content/articles/[locale]/`:
   - Example: `src/content/articles/en/my-new-post.md`

2. Add frontmatter:
```markdown
---
title: 'Your Post Title'
description: 'Brief description for SEO'
date: '2026-02-01'
author: 'Your Name'
image: '/images/blog/your-image.jpg'
---

Your content here in markdown format...
```

3. Add the corresponding image to `public/images/blog/`

4. The post will automatically appear in the blog!

---

## 🎨 Customization

### Colors & Branding

Edit `src/app/[locale]/globals.css`:

```css
:root {
  --brand-primary: #009966;  /* Main brand color */
  --brand-deep: #007744;     /* Dark accent */
}
```

### Navbar & Footer

- **Navbar**: `src/app/components/layout/Navbar.jsx`
- **Footer**: `src/app/components/layout/Footer.jsx`

Update social media links in:
- `src/app/components/layout/Footer.jsx` (lines 13-24)
- `src/app/[locale]/contact/page.jsx` (lines 12-50)

---

## 📊 Analytics & SEO

### Google Analytics
- Automatically tracked with GA4 ID: `G-4VK9LW27K3`
- View reports: [analytics.google.com](https://analytics.google.com/)

### Google AdSense
- Ad slots placed in:
  - Blog post pages (after content)
  - Configurable in `src/app/[locale]/blog/[slug]/page.jsx`

### SEO Verification
- **Sitemap**: `https://yourdomain.com/sitemap.xml`
- **Robots**: `https://yourdomain.com/robots.txt`
- **Test Meta Tags**: [OpenGraph.xyz](https://www.opengraph.xyz/)

---

## 🛠️ Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

This project is **private and proprietary**.

---

## 👨‍💻 Author

**Mohammed Alshliany**

- 📘 Facebook: [mohammed.alshliany](https://www.facebook.com/mohammed.alshliany)
- 🐦 X (Twitter): [@Toxn655](https://x.com/Toxn655)

---

## 🙏 Acknowledgments

Built with ❤️ using Next.js, TailwindCSS, and modern web technologies.

Special thanks to the open-source community for the amazing tools.

---

<div align="center">

**Made with Next.js** | **Deployed on Netlify** | **Privacy-First**

</div>
