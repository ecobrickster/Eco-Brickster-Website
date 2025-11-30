# Eco-Brickster Website

A modern, sustainable website for Eco-Brickster - transforming plastic waste into durable construction bricks.

## Features

- 🌱 **Sustainable Mission**: Showcase eco-friendly brick products
- 📱 **Responsive Design**: Mobile-first, works on all devices
- 🎨 **Modern UI**: Beautiful animations and gradients
- 🤖 **Chatbot**: Interactive assistant for user queries
- 📊 **Impact Tracking**: Live statistics and project showcase
- 🛒 **Product Catalog**: Browse and explore brick types
- 📝 **Forms**: Registration, contact, and subscription forms
- 🗺️ **Interactive Map**: View pilot project locations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Leaflet & React Leaflet

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd eco-brickster-website
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── about/        # About page
│   ├── products/     # Products catalog
│   ├── impact/       # Impact & projects
│   ├── api/          # API routes
│   └── ...
├── components/       # React components
│   ├── ui/           # UI components
│   └── ...
├── assets/           # Images and media
└── lib/              # Utilities
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Email Configuration (Required for contact forms)
# For Gmail, create an App Password: https://support.google.com/accounts/answer/185833
EMAIL_USER=ecobrickster@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Site URL (optional)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Email Setup

To enable email notifications from contact forms:

1. **Gmail Setup**:
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an App Password: https://support.google.com/accounts/answer/185833
   - Copy the generated app password

2. **Configure Environment**:
   - Create `.env.local` file in the root directory
   - Add `EMAIL_USER=ecobrickster@gmail.com`
   - Add `EMAIL_PASSWORD=your_app_password_here`

3. **Test**: Submit a contact form to verify emails are being sent

**Note**: If email credentials are not configured, submissions will still be saved to the database, but email notifications will not be sent.

## Build Status

✅ **Build**: Passing  
✅ **TypeScript**: No errors  
✅ **Linting**: Clean  
✅ **Production Ready**: Yes

## License

Private - All rights reserved

## Contact

For questions or support, visit the Contact page or email: ecobrickster@gmail.com

