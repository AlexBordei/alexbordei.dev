# Alex Bordei - Personal Website

A modern, responsive personal website for Alex Bordei, a Software Engineer and AI Educator based in Bucharest, Romania. This website showcases professional work, blog posts, projects, speaking engagements, and provides contact information.

## Project Overview

This website serves as a professional portfolio and personal brand platform with the following key sections:

- **Home**: Introduction and overview of skills and expertise
- **Blog**: Articles and thoughts on software development, AI, and technology
- **Resume/CV**: Professional experience, education, and skills
- **Projects**: Showcase of technical work and projects
- **Media**: Speaking engagements, videos, and appearances
- **Contact**: Contact form and information

The site features a clean, modern design with dark/light mode support, responsive layouts for all device sizes, and accessibility considerations.

## Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- **UI Components**: Custom-built React components
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Theme Switching**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Testing**: Jest and React Testing Library
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm

## Features Implemented

- ✅ Responsive navigation with mobile menu
- ✅ Dark/light theme toggle with system preference detection
- ✅ Home page with hero section, expertise areas, and featured projects
- ✅ Blog page with article listings and category filters
- ✅ Resume page with professional information
- ✅ Projects showcase with filtering capabilities
- ✅ Media page for talks and appearances
- ✅ Contact page with form
- ✅ Newsletter subscription component
- ✅ Comprehensive test suite for components and pages
- ✅ SEO optimization with metadata

## Project Structure

```
alexbordei.dev/
├── src/                  # Source code
│   ├── app/              # Next.js App Router pages
│   │   ├── blog/         # Blog page and related components
│   │   ├── contact/      # Contact page
│   │   ├── media/        # Media/speaking page
│   │   ├── projects/     # Projects portfolio page
│   │   ├── resume/       # Resume/CV page
│   │   ├── globals.css   # Global CSS styles
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable React components
│   │   ├── layout/       # Layout components (Header, Footer, etc.)
│   │   └── ThemeProvider.tsx # Theme context provider
│   ├── lib/              # Utility functions and helpers
│   └── __tests__/        # Test files
│       ├── components/   # Component tests
│       └── pages/        # Page tests
├── public/               # Static assets
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file
├── next.config.js        # Next.js configuration
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlexBordei/alexbordei.dev.git
   cd alexbordei.dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001) if port 3000 is in use) with your browser to see the result.

## Testing

The project includes a comprehensive test suite using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Test Structure

- Component tests verify rendering and behavior of UI components
- Page tests ensure proper content and functionality of each page
- Custom test utilities provide theme context for component testing

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Design Decisions

- **Server Components**: Leveraging Next.js 14's server components for improved performance
- **Client Components**: Using "use client" directive for interactive components requiring state or hooks
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Color Scheme**: Neutral palette with blue accent colors
- **Dark Mode**: Full dark mode support with smooth transitions
- **Typography**: Clean, readable font choices with proper hierarchy
- **Testing**: Component-level and page-level tests to ensure quality

## Future Enhancements

- Content Management System integration
- Blog post markdown rendering
- Contact form functionality with serverless functions
- SEO enhancements
- Analytics integration
- Performance optimizations

---

Built with ❤️ using Next.js and Tailwind CSS
