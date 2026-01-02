# International Academy of Initiology

## Overview
The International Academy of Initiology website is a multilingual React, TypeScript, and Express application. Its purpose is to establish a digital presence for the Academy, showcasing its research, educational programs, publications, and global collaborations. The site supports English, German, and Russian, featuring a modern, prestigious design to reflect an elite academic institution. Key capabilities include content management via an admin panel, interactive global presence visualization, and detailed information on educational programs and energy channels.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Technology Stack**: React 18, TypeScript, Vite, Wouter (routing), TanStack Query (server state), shadcn/ui (components on Radix UI), Tailwind CSS.
- **Design System**: Custom academic-inspired color palette (Deep Academic Navy, Scholarly Burgundy, Gold accents), Playfair Display, Inter, and Cormorant Garamond fonts, responsive mobile-first design, dark mode, consistent spacing.
- **State Management**: React Context API for global state (Language, Edit Mode), TanStack Query for API data, Local storage for theme/language.
- **Key Features**: Multilingual support (EN, DE, RU), interactive globe, admin panel with visual content editor and page builder, responsive navigation, image upload.
- **Admin Panel**: Login (admin/admin), visual editor for text, images, links; style controls; custom page creation with URL transliteration; automatic PostgreSQL save.
- **Page Structure**: Single-page application using section-based navigation (Header, Hero, Research, Education, Books, Channels, Services, RMT Business, About, FAQ, Footer).
- **Component Architecture**: Reusable sections, compound components, controlled forms with react-hook-form and Zod, render props, custom hooks.

### Backend
- **Server**: Express.js with TypeScript, esbuild for production builds, Vite middleware for development HMR.
- **Data Layer**: Drizzle ORM, PostgreSQL (via Neon serverless), in-memory fallback, Zod validation.
- **Database Schema**: `users` (authentication), `content_sections` (multilingual editable content), `images` (media files), `pages` (custom CMS pages with slug, title, language, JSON content blocks, header/hero toggles).
- **API**: RESTful (`/api` prefix), centralized error handling, JSON format, session-based authentication (connect-pg-simple).

### Build and Deployment
- **Development**: Vite dev server, Express backend, HMR.
- **Production**: Vite builds client to `dist/public`, esbuild bundles server to `dist/index.js`, static file serving.

## External Dependencies

### UI and Styling
- **shadcn/ui**: Component library built on Radix UI.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Unstyled, accessible component primitives.
- **Lucide React**: Icon library.

### Data and State
- **TanStack Query**: Server state management.
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL.
- **drizzle-zod**: Zod schema generation from Drizzle.
- **Zod**: Runtime type validation.
- **@neondatabase/serverless**: Neon PostgreSQL driver.

### Forms and Validation
- **react-hook-form**: Form state management.
- **@hookform/resolvers**: Zod integration for form validation.

### Server Infrastructure
- **Express**: Web application framework.
- **connect-pg-simple**: PostgreSQL session store for Express.

### Development Tools
- **TypeScript**: Static type checking.
- **esbuild**: Fast JavaScript bundler.
- **tsx**: TypeScript execution.
- **PostCSS**: CSS processing.

### Assets and Media
- **Google Fonts**: Playfair Display, Inter, Cormorant Garamond.
- **Local assets**: Images in `attached_assets`.

### Content Sources
- Content migrated from iniciolog.ru.

### Educational Organization Info Page (January 2026)
- **Route**: /educational-info
- **Purpose**: Russian regulatory compliance page (Rosobrnadzor requirements)
- **Tabs**: Основные сведения, Структура, Документы, Образование, Руководство, Материально-техническое обеспечение, Платные услуги, Финансы, Вакантные места, Стипендии
- **Company**: ООО "НИЦ Инициологии и Трансперсональной Психологии"
- **License**: Л035-01298-77/01122408 от 10 апреля 2024 г.
- **Footer Link**: "Сведения об образовательной организации"
- Document links to Yandex Disk for all regulatory documents