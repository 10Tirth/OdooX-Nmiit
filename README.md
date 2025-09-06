<<<<<<< HEAD
# EcoFinds - Style that lives twice !

## 🌍 Sustainable Living. Affordable Style.

### Not Just Products. A Lifestyle.  

We believe **luxury shouldn’t cost the earth – or your pocket**.  
Our platform is built on the idea that sustainability can be both **stylish** and **economical**.  
By making eco-friendly lifestyle accessible, we empower people to embrace a lifestyle that’s kinder to the planet and lighter on the wallet.  

♻️ **Buy → Use → Resell**  
Together, we create a circular economy that keeps fashion and lifestyle products out of landfills.  

---

## 🛍 What We Offer
From **fashion and home décor** to **collectibles and clearance stock**, our marketplace connects buyers and sellers who care about lifestyle, value and the environment. Every purchase saves resources, reduces waste, and brings sustainability into everyday life.  

---

## 🚀 Join the Movement
Be part of the sustainable revolution.  
- Save up to **70%** on eco-friendly lifestyle items  
- Turn unused possessions into someone else’s treasure  
- Shop consciously, live meaningfully  

[🛒 Shop Now](#) | [🤝 Sell With Us](#)  


=======
# EcoFinds Landing Page

A high-converting, accessible, and SEO-optimized landing page for EcoFinds - a sustainable lifestyle marketplace built with Next.js, TypeScript, and Tailwind CSS.

## 🌱 About EcoFinds

**Tagline:** "Style that lives twice."

EcoFinds is a sustainable marketplace where people can buy and sell pre-loved fashion, home décor, and collectibles. We believe luxury shouldn't cost the earth — or your pocket.

## 🚀 Features

### Landing Page Components
- **Hero Section**: Primary conversion focus with lifestyle imagery and clear CTAs
- **Brand Story**: Circular economy illustration with psychology messaging
- **Featured Products**: Dynamic grid of highly-rated items with social proof
- **Clearance Carousel**: Brand clearance stock with urgency messaging
- **Join Movement**: Newsletter signup with sustainability benefits
- **Responsive Design**: Mobile-first approach with desktop, tablet, and mobile breakpoints

### Technical Features
- **Next.js 15** with App Router and TypeScript
- **Server-Side Rendering** for optimal SEO performance
- **Tailwind CSS** with custom design tokens
- **API Routes** for featured products, clearance brands, site stats, and newsletter
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel (recommended)
- **Package Manager**: npm

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary**: `#0F9D58` (Eco Green)
- **Accent**: `#FFB300` (Warm Savings)
- **Text**: `#111827`
- **Muted**: `#6B7280`
- **Background**: `#FFFFFF`

### Typography
- **Hero**: 44px (2.75rem) - Bold
- **H2**: 28px (1.75rem) - Semibold
- **Body**: 16px (1rem) - Regular
- **Font**: Inter (system fallbacks)

## 📁 Project Structure

```
website-project/
├── app/
│   ├── api/              # API routes
│   │   ├── featured-products/
│   │   ├── clearance-brands/
│   │   ├── site-stats/
│   │   └── newsletter/
│   ├── globals.css       # Global styles and design tokens
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Landing page entry point
│   └── LandingPage.tsx   # Main landing page component
├── components/           # Reusable UI components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── BrandStory.tsx
│   └── ProductCard.tsx
├── data/
│   └── landing-seed.json # Demo data for development
├── types/
│   └── index.ts          # TypeScript type definitions
└── public/
    └── images/           # Static assets
```

## 🔌 API Endpoints

### GET `/api/featured-products`
- **Purpose**: Fetches highly-rated products
- **Parameters**: `limit` (default: 8), `sort` (rating_desc)
- **Cache**: 5 minutes

### GET `/api/clearance-brands`
- **Purpose**: Returns brands with clearance inventory
- **Cache**: 10 minutes

### GET `/api/site-stats`
- **Purpose**: Site statistics for social proof
- **Cache**: 15 minutes

### POST `/api/newsletter`
- **Purpose**: Newsletter signup endpoint
- **Body**: `{ email, source }`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your Git repository to Vercel
2. Deploy automatically on every push
3. Environment variables (optional):
   ```
   NEWSLETTER_API_KEY=your-api-key
   ```

### Manual Deployment

```bash
npm run build
npm start
```

## ♿ Accessibility

- **WCAG AA Compliant**: 4.5:1 color contrast ratio
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators

## 📈 Performance Optimizations

- **SSR**: Server-side rendering for fast initial loads
- **Image Optimization**: Automatic Next.js optimization
- **Code Splitting**: Route-based splitting
- **API Caching**: Appropriate cache headers
- **Lazy Loading**: Images and components

## 🧪 Testing Checklist

- [ ] Hero CTAs navigate correctly
- [ ] Featured products load with skeletons
- [ ] Newsletter signup works
- [ ] Mobile responsive design
- [ ] Keyboard accessibility
- [ ] Screen reader compatibility

## 📊 Analytics Events

- `view_landing`: Page load
- `click_hero_shop`: Shop Now clicks
- `click_hero_sell`: Sell With Us clicks  
- `signup_newsletter`: Newsletter signups
- `view_featured_product`: Product views

---

**Built with ♻️ by the EcoFinds team. Style that lives twice.**
>>>>>>> master
