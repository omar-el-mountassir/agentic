# CLAUDE.md - packages/app/

Frontend-specific context for the Next.js 15 + React 19 application.

## Package Overview

This is the main frontend application built with cutting-edge React and Next.js technologies.

**Architecture**: Modern React SPA with server-side rendering capabilities
**Stack**: Next.js 15 (canary), React 19 RC, Tailwind CSS v4, TypeScript, PostCSS

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Production build with optimizations
- `npm start` - Serve production build locally
- `npm run lint` - ESLint specific to React/Next.js patterns

## Key Technologies

**Next.js 15 Features**:

- App Router with React Server Components
- Streaming and Suspense boundaries
- Optimized bundling and code splitting
- Built-in performance optimizations

**React 19 RC Features**:

- Concurrent rendering improvements
- Enhanced hooks and state management
- Better TypeScript integration
- Performance optimizations

**Tailwind CSS v4**:

- Utility-first CSS framework
- Custom design system integration
- Responsive design patterns
- Component-based styling approach

## Development Patterns

**Component Structure**:

- Use React Server Components where appropriate
- Implement proper error boundaries
- Follow atomic design principles
- Maintain clear component hierarchy

**State Management**:

- Use React 19's enhanced hooks
- Implement proper data fetching patterns
- Handle loading and error states
- Optimize re-renders with proper memoization

**Performance Considerations**:

- Implement code splitting at route level
- Use dynamic imports for heavy components
- Optimize images with Next.js Image component
- Monitor Core Web Vitals in development

## Testing Strategy

**Component Testing**:

- Test user interactions and behavior
- Verify accessibility compliance
- Test responsive design breakpoints
- Validate error handling

**Integration Testing**:

- Test complete user workflows
- Verify API integration points
- Test navigation and routing
- Validate form submissions

## Build and Deployment

**Development**: Optimized for developer experience with fast refresh
**Production**: Full optimization with static generation where possible
**Deployment**: Configured for modern hosting platforms with SSR support
