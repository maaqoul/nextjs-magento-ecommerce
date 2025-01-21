# Next.js E-commerce with Magento Backend

A modern e-commerce application built with Next.js 13+ (App Router) and Magento as the backend. This project uses REST API for data fetching and features a clean, responsive design with Tailwind CSS.

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

- **Frontend Framework**: Next.js 13+ (App Router)
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

Create a `.env.local` file in the root directory with:

\`\`\`env
NEXT_PUBLIC_MAGENTO_URL=your-magento-store-url
\`\`\`

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

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/ # Next.js 13 App Router
│ ├── api/ # API Routes
│ ├── layout.tsx # Root Layout
│ └── page.tsx # Home Page
├── components/ # React Components
│ ├── product/ # Product-related Components
│ └── ui/ # UI Components
├── lib/ # Utility Functions
│ ├── hooks/ # Custom React Hooks
│ └── utils/ # Helper Functions
├── styles/ # Global Styles
└── types/ # TypeScript Types
\`\`\`

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
