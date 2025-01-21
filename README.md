# Next.js E-commerce with Magento Backend

A modern e-commerce application built with Next.js 15+ (App Router) and Magento as the backend. This project uses REST API for data fetching and features a clean, responsive design with Tailwind CSS.

## Features

- 🛍️ Product Listing with Pagination
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully Responsive Design
- 🚀 Server and Client Components
- 🔍 Product Search
- 🖼️ Image Optimization with next/image
- 🎯 SEO Optimized
- 🌗 Light/Dark Mode Support

## Tech Stack

- **Frontend Framework**: Next.js 15.1.5 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: Magento 2
- **State Management**: React Hooks
- **API**: REST
- **TypeScript**: For type safety
- **Formatting**: Prettier
- **Linting**: ESLint

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A running Magento 2 instance
- Access to Magento's REST API

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Magento Store URL (required)
NEXT_PUBLIC_MAGENTO_URL=https://your-magento-store.com

# Magento Admin Credentials (required for seeding)
MAGENTO_ADMIN_USERNAME=your-admin-username
MAGENTO_ADMIN_PASSWORD=your-admin-password

# Integration Token (alternative to admin credentials)
MAGENTO_INTEGRATION_TOKEN=your-integration-token

# Store Configuration
NEXT_PUBLIC_STORE_NAME="Your Store Name"
NEXT_PUBLIC_STORE_CODE=default
```

### Environment Variables Explanation:

- `NEXT_PUBLIC_MAGENTO_URL`: Your Magento store's base URL
- `MAGENTO_ADMIN_USERNAME`: Magento admin username (needed for seeding data)
- `MAGENTO_ADMIN_PASSWORD`: Magento admin password (needed for seeding data)
- `MAGENTO_INTEGRATION_TOKEN`: Integration token from Magento (alternative to admin credentials)
- `NEXT_PUBLIC_STORE_NAME`: Your store's display name
- `NEXT_PUBLIC_STORE_CODE`: Magento store code (defaults to 'default')

Note: Make sure to keep your `.env.local` file secure and never commit it to version control.

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd nextjs-ecommerce
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Seed the database with initial products:
   \`\`\`bash
   npm run seed
   \`\`\`
   This step will populate your Magento store with sample products. Make sure your Magento instance is running and your environment variables are set correctly.

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                        # Next.js 15 App Router
│   ├── api/                   # API Routes
│   │   ├── products/         # Product-related API endpoints
│   │   └── seed/            # Seeding endpoints
│   ├── layout.tsx            # Root Layout
│   └── page.tsx              # Home Page
│
├── components/                # React Components
│   ├── product/              # Product-related Components
│   │   ├── product-card.tsx  # Individual product display
│   │   ├── product-grid.tsx  # Grid layout for products
│   │   └── product-list.tsx  # Product listing with pagination
│   └── ui/                   # Shared UI Components
│       ├── pagination.tsx    # Pagination component
│       └── skeletons.tsx     # Loading skeletons
│
├── lib/                      # Utility Functions
│   ├── hooks/               # Custom React Hooks
│   │   └── useProducts.ts   # Products data fetching hook
│   └── utils/               # Helper Functions
│       └── format.ts        # Formatting utilities
│
├── styles/                   # Global Styles
│   └── globals.css          # Global CSS and Tailwind imports
│
└── types/                    # TypeScript Types
    └── magento.ts           # Magento-related type definitions

```

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm start\`: Run production server
- \`npm run lint\`: Run ESLint
- \`npm run seed\`: Run seeding script
- \`npm run check-schema\`: Check Magento schema

## Component Documentation

### ProductCard

Displays individual product information including:

- Product Image
- Product Name
- Price
- Hover Effects

### ProductList

Handles the display of products with:

- Grid Layout
- Pagination
- Loading States
- Error Handling

## API Routes

### GET /api/products

Fetches products from Magento with:

- Pagination Support
- Search Functionality
- Sorting Options

Query Parameters:

- \`pageSize\`: Number of items per page
- \`currentPage\`: Current page number
- \`search\`: Search term for filtering products

## Styling

The project uses Tailwind CSS with a custom configuration including:

- Custom Color Scheme
- Responsive Breakpoints
- Animation Classes
- Dark Mode Support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js Team
- Magento Community
- Tailwind CSS Team
