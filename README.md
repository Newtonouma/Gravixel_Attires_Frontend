# Gravixel Attires - Premium Tailoring & Suits E-Commerce Platform

A modern, responsive e-commerce platform for premium suits and tailoring services built with Next.js 15 and React 19.

![Gravixel Attires](https://img.shields.io/badge/Gravixel-Attires-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🌟 Features

### 🏠 Homepage
- **Hero Section** - Engaging landing area with call-to-action
- **Featured Products Carousel** - Showcasing premium suits with interactive slider
- **Collections Carousel** - Dynamic collections display matching featured products style
- **Smart Tailoring Section** - AI-powered fitting technology showcase
- **Outfit Inspiration** - Style guidance and inspiration
- **Customer Reviews** - Social proof and testimonials

### 🧭 Navigation System
- **Responsive Navigation** - Mobile-first design with hamburger menu
- **Dynamic Collections Dropdown** - Links to all collection categories
- **Services Menu** - Consultation booking, styling, alterations
- **About Section** - Company story, craftsmanship, sustainability
- **Search & Cart** - Integrated shopping functionality

### 👔 Product System
- **15 Premium Products** - Suits, tuxedos, and blazers
- **Dynamic Product Pages** - Individual product detail pages
- **Advanced Filtering** - By category, color, material, price, size
- **Product Variants** - Two-piece, three-piece, single-piece options
- **Inventory Management** - Stock status and availability
- **Rating & Reviews** - Customer feedback system

### 🎯 Collections System
- **12 Curated Collections** - Intelligently categorized products
- **Dynamic Collection Pages** - Individual collection detail pages
- **Smart Filtering** - Multi-criteria product categorization
- **Collection Types**:
  - **Occasion-Based**: Wedding & Special Occasions, Business & Professional
  - **Style-Based**: Three Piece, Slim Fit, Classic Essentials
  - **Seasonal**: Summer, Winter collections
  - **Color-Based**: Neutral Tones, Luxury Colors
  - **Price-Based**: Premium, Essential collections
  - **Performance-Based**: Bestsellers

### 📞 Contact & Consultation
- **Contact Page** - Modern contact form with validation
- **Book Consultation** - Advanced booking system with:
  - Personal information collection
  - Service type selection
  - Preferred date/time scheduling
  - Special requirements notes
  - Email notifications via Nodemailer
  - Database-ready structure

### 📝 Blog System
- **Dynamic Blog Routes** - Individual blog post pages
- **SEO-Optimized** - Meta tags and structured content
- **Responsive Design** - Mobile-friendly blog layout
- **Featured Articles** - Style guides and tailoring tips

### ℹ️ About Pages
- **Company Story** - Brand history and values
- **Craftsmanship** - Tailoring expertise and techniques
- **Sustainability** - Ethical fashion practices
- **Team** - Master tailors and staff profiles

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and optimizations
- **TypeScript 5** - Type-safe development
- **Custom CSS** - Modular styling approach
- **React Slick** - Carousel/slider functionality

### Backend Integration
- **Next.js API Routes** - Server-side functionality
- **Nodemailer** - Email notification system
- **Form Validation** - Client and server-side validation

### Development Tools
- **ESLint** - Code linting and standards
- **PostCSS** - CSS processing
- **Tailwind CSS** - Utility-first styling framework

## 🎨 Design System

### Typography
- **Primary Font**: Jost - Modern, clean sans-serif
- **Secondary Font**: Playfair Display - Elegant serif for headings
- **System Fonts**: Arial Unicode MS, Arial fallbacks

### Color Palette
- **Primary**: `#312f2f` - Sophisticated dark gray
- **Secondary**: `#b59b88` - Warm accent color
- **Background**: `#ffffff` - Clean white
- **Text**: `#666` - Readable gray for secondary text

### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Breakpoints**:
  - Mobile: `<= 480px`
  - Tablet: `<= 768px`
  - Desktop: `<= 1024px`
  - Large Desktop: `>= 1400px`

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── about/                    # About pages
│   │   ├── craftsmanship/        # Craftsmanship details
│   │   ├── story/                # Company story
│   │   ├── sustainability/       # Sustainability practices
│   │   └── team/                 # Team profiles
│   ├── api/                      # API routes
│   │   └── book-consultation/    # Consultation booking endpoint
│   ├── blog/                     # Blog system
│   │   └── [slug]/               # Dynamic blog posts
│   ├── book-consultation/        # Consultation booking page
│   ├── collections/              # Collections system
│   │   └── [slug]/               # Dynamic collection pages
│   ├── contact/                  # Contact page
│   ├── products/                 # Product catalog
│   │   └── [slug]/               # Individual product pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── Collections/              # Collections carousel
│   ├── FeaturedProducts/         # Featured products carousel
│   ├── Hero/                     # Homepage hero section
│   ├── Navigation/               # Header navigation
│   ├── OutfitInspiration/        # Style inspiration section
│   ├── Reviews/                  # Customer reviews
│   └── SmartTailoring/           # AI tailoring showcase
└── data/                         # Static data
    └── products.ts               # Product catalog and categories
```

## 🎯 Collections Categorization System

Products are intelligently categorized using multiple criteria:

### Categorization Logic
- **Tags**: `['business', 'wedding', 'classic', 'slim-fit', etc.]`
- **Subcategories**: `Business`, `Slim Fit`, `Wedding`, `Classic`
- **Materials**: `Wool`, `Linen`, `Velvet`, `Tweed`
- **Colors**: `Navy`, `Black`, `Charcoal`, `Burgundy`
- **Price Ranges**: Premium (≥ KES 45,000), Essential (KES 30,000-40,000)
- **Performance**: Bestsellers (featured or >100 reviews)

### Collection Examples
- **Wedding & Special Occasions**: Products with `wedding`, `special-occasion` tags or `Tuxedos` category
- **Business & Professional**: Products with `business`, `professional` tags or `Business` subcategory
- **Three Piece Collection**: Products with `Three Piece` variant or `three-piece` tags
- **Premium Collection**: Products with price ≥ KES 45,000

## 💰 Product Pricing Structure

| Price Range | Label | Products |
|-------------|-------|----------|
| KES 25,000 - 35,000 | Entry Level | 2 products |
| KES 35,001 - 45,000 | Standard | 8 products |
| KES 45,001 - 55,000 | Premium | 4 products |
| KES 55,001+ | Luxury | 1 product |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Newtonouma/Gravixel_Attires-Frontend.git
   cd Gravixel_Attires-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Configure the following variables:
   ```env
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email@domain.com
   SMTP_PASS=your_email_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📧 Email Configuration

The consultation booking system uses Nodemailer for email notifications:

### Email Features
- **Customer Confirmation** - Booking confirmation to customer
- **Admin Notification** - New booking alert to business
- **HTML Templates** - Professional email formatting
- **Error Handling** - Graceful failure management

### SMTP Setup
Configure your SMTP settings in `.env.local`:
- Gmail, Outlook, or custom SMTP servers supported
- TLS/SSL encryption enabled
- Authentication required

## 🎨 Customization Guide

### Adding New Products
1. Add product data to `src/data/products.ts`
2. Include proper categorization tags
3. Add product images to `public/images/`
4. Update collection filters if needed

### Creating New Collections
1. Define collection in collections pages
2. Create filter function based on product properties
3. Add to navigation dropdown
4. Create individual collection page route

### Styling Customization
- Modify CSS custom properties in `globals.css`
- Update component-specific styles in respective CSS files
- Maintain responsive design principles

## 🔧 API Endpoints

### POST `/api/book-consultation`
Book a consultation appointment

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "serviceType": "string",
  "preferredDate": "string",
  "preferredTime": "string",
  "specialRequirements": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consultation booked successfully"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries:
- Email: support@gravixelattires.com
- Website: [www.gravixelattires.com](https://www.gravixelattires.com)
- GitHub Issues: [Create an issue](https://github.com/Newtonouma/Gravixel_Attires-Frontend/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for the powerful UI library
- All contributors and testers
- Customer feedback and suggestions

---

**Built with ❤️ by the Gravixel Attires Team**
