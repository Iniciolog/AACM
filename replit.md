# International Academy of Initiology

## Overview

This is a multilingual academic institution website built with React, TypeScript, and Express. The application serves as a digital presence for the International Academy of Initiology, showcasing research, educational programs, publications, and global collaboration initiatives. The site supports three languages (English, German, Russian) and features a modern, prestigious design inspired by elite academic institutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query for server state management
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens

**Design System:**
- Custom color palette inspired by prestigious academic institutions (Deep Academic Navy, Scholarly Burgundy, Gold accents)
- Typography system using Playfair Display (headings), Inter (body), and Cormorant Garamond (accents)
- Responsive design with mobile-first approach
- Dark mode support with theme toggle functionality
- Consistent spacing and elevation system for interactive elements

**State Management:**
- Context API for global state (Language, Edit Mode)
- TanStack Query for API data fetching and caching
- Local storage for theme and language preferences

**Key Features:**
- Multilingual support (English, German, Russian) with React Context
- Interactive globe visualization showing global presence
- Editable content sections (future implementation)
- Responsive navigation with smooth scrolling
- Image upload capability for content management

### Backend Architecture

**Server Setup:**
- Express.js server with TypeScript
- Development and production build configurations using esbuild
- Vite middleware integration for development HMR
- Custom logging middleware for API requests

**Data Layer:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (via Neon serverless)
- In-memory storage implementation as fallback/development option
- Schema-driven development with Zod validation

**Database Schema:**
- `users`: Authentication and user management (id, username, password)
- `content_sections`: Multilingual editable content (section_type, language, JSON content)
- `images`: Uploaded media files (filename, url, upload timestamp)

**API Design Philosophy:**
- RESTful endpoints prefixed with `/api`
- Centralized error handling middleware
- JSON-based request/response format
- Session-based authentication ready (connect-pg-simple configured)

### Component Architecture

**Page Structure:**
- Single-page application with section-based navigation
- HomePage composed of reusable section components:
  - Header (sticky navigation with language/theme controls)
  - HeroSection (interactive globe, global statistics)
  - ResearchSection (article cards with imagery)
  - EducationSection (platform features and preview)
  - BooksSection (publication showcase)
  - AboutSection (founder information)
  - FAQSection (accordion-style Q&A)
  - Footer (newsletter, links, contact info)

**Design Patterns:**
- Compound components for complex UI (Accordion, Dialog, Dropdown)
- Controlled components with form validation (react-hook-form + Zod)
- Render props and custom hooks for reusable logic
- Component composition over inheritance

### Build and Deployment

**Development:**
- Vite dev server with HMR on port 5000 (default)
- Express backend serving API routes
- Concurrent client and server development
- Runtime error overlay for debugging (Replit-specific)

**Production:**
- Vite builds optimized client bundle to `dist/public`
- esbuild bundles server code to `dist/index.js`
- Static file serving from built assets
- Environment-based configuration (NODE_ENV)

**Scripts:**
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Run production server
- `npm run db:push`: Push schema changes to database

## External Dependencies

### UI and Styling
- **shadcn/ui**: Pre-built accessible component library (Radix UI primitives)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Unstyled, accessible component primitives (20+ packages)
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe component variants
- **cmdk**: Command menu component

### Data and State
- **TanStack Query**: Server state management, caching, synchronization
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **Zod**: Runtime type validation and schema definition
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver

### Forms and Validation
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Validation resolver for Zod integration

### Server Infrastructure
- **Express**: Web application framework
- **connect-pg-simple**: PostgreSQL session store for Express
- **Vite plugins**: Development tools for Replit environment

### Development Tools
- **TypeScript**: Static type checking
- **esbuild**: Fast JavaScript bundler for server code
- **tsx**: TypeScript execution for development
- **PostCSS**: CSS processing with autoprefixer

### Assets and Media
- Custom fonts: Playfair Display, Inter, Cormorant Garamond (Google Fonts)
- Static images stored in `attached_assets` directory
- Generated academic imagery for sections

### Content Sources
All content migrated from iniciolog.ru website:
- **Book cover**: https://store.ridero.ru/images/w350?bucket=yc:store-raw-data.ridero.store&key=ridero/sku/2016-03/56d9304fe13a300600a0f915/rev.2023-08-07T11:31:28.497Z/cover-front.png&format=original
- **Research study image**: https://static.tildacdn.com/tild6132-3436-4166-b739-353336393030/research.jpeg
- **Founder photo**: https://static.tildacdn.com/tild3662-6238-4132-b034-633134363066/222.png
- **Student counts**: CIS (25,740), EU (10,000), China (2,340), USA (2,150)
- **Learning platform**: https://iniciolog.com/members/login

### Database
- **PostgreSQL** (via Neon): Primary production database
- **Drizzle Kit**: Database migration and schema management
- Connection via `DATABASE_URL` environment variable