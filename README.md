# Privacy Idea Generator

> **Curated privacy-focused project ideas for Web3 hackathons and events**

[![Build Status](https://github.com/web3privacy/privacy-idea-generator/workflows/CI/badge.svg)](https://github.com/web3privacy/privacy-idea-generator/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A dynamic web application that display and generates privacy-focused project ideas, curated by the [Web3Privacy Now](https://web3privacy.info) community, experts, and partner organizations.

## Features

- **Smart Idea Generator** - Get random privacy-focused project suggestions
- **Advanced Filtering** - Filter by categories, tags, and idea types
- **Multiple Sources** - Community ideas, expert recommendations, and organization projects
- **Share & Discover** - Shareable links for individual ideas

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm 10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/web3privacy/privacy-idea-generator.git
cd privacy-idea-generator

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Commands

```bash
pnpm dev          # Development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm type-check   # Type checking
pnpm lint         # Linting
pnpm lint:fix     # Fix linting issues
pnpm format       # Code formatting
```

## Tech Stack

**Core Technologies**

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI primitives

**Development Tools**

- [ESLint](https://eslint.org/) - Code linting with Airbnb config
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit linting

**Deployment**

- [Vercel](https://vercel.com/) - Hosting and deployment
- [GitHub Actions](https://github.com/features/actions) - Continuous integration

## Project Structure

```
src/
├── components/ui/      # shadcn/ui components + custom components
├── lib/               # Utility functions and configuration
│   ├── api/           # API layer
│   ├── constants/     # App configuration
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   ├── idea/          # Individual idea pages
│   └── org/           # Organization pages
├── styles/            # Global styles
└── types/             # TypeScript type definitions

public/
└── data/ideas/        # Static data files (where your ideas goes)
    ├── community-ideas.json
    ├── expert-ideas.json
    └── organization-ideas.json
```

## Contributing Ideas

### Adding Ideas Manually

1. **Fork the repository**
2. **Choose the appropriate file:**

   - `public/data/ideas/community-ideas.json` - Community projects
   - `public/data/ideas/expert-ideas.json` - Expert recommendations
   - `public/data/ideas/organization-ideas.json` - Organization projects

3. **Add your idea following this structure:**

```json
{
  "name": "Your Project Name",
  "description": "Clear description of the project and its privacy benefits",
  "categories": ["Privacy", "DeFi", "Identity"],
  "author": "Your Name or @username",
  "organization": "Your Organization (optional)",
  "github": "https://github.com/your-repo (optional)",
  "website": "https://your-website.com (optional)",
  "event": "Target Event Name (optional)",
  "featured": true,
  "features": ["Privacy feature 1", "Privacy feature 2"] // For org ideas only
}
```

4. **Submit a Pull Request**

### Idea Categories

- **Privacy** - Core privacy technologies
- **DeFi** - Decentralized finance
- **Identity** - Digital identity solutions
- **Communication** - Private messaging and communication
- **Infrastructure** - Privacy infrastructure
- **AI** - Privacy-preserving AI/ML
- **Storage** - Private storage solutions
- **Security** - Security tools and auditing
- **Wallet** - Wallet technologies
- **R&D** - Research and development

### Idea Quality Guidelines

**Good Ideas Should:**

- Focus on privacy, security, or decentralization
- Be technically feasible for a hackathon timeframe
- Have clear value proposition
- Include specific privacy benefits
- Be original or significantly improve existing solutions

## Technical Contributions

All contributions should follow the manual JSON methodology described above.

## API Documentation

### Endpoints

```
GET /api/ideas                    # Get all ideas
GET /api/ideas?type=community     # Get community ideas
GET /api/ideas?type=expert        # Get expert ideas
GET /api/ideas?type=organization  # Get organization ideas
GET /api/ideas/[id]               # Get specific idea
```

### Data Format

```typescript
interface Idea {
  id: string
  name: string
  description: string
  categories: string[]
  author?: string | AuthorObject
  organization?: string
  github?: string
  website?: string
  event?: string
  featured?: boolean
  features?: string[] // Organization ideas only
}
```

## Deployment

- **Production**: [https://usecases.web3privacy.info](https://usecases.web3privacy.info)
- **Preview**: Automatic deployments for all pull requests

```bash
pnpm build    # Build the application
vercel --prod # Deploy to Vercel
```

## Community

- **Website**: [web3privacy.info](https://web3privacy.info)
- **Twitter**: [@web3privacy](https://twitter.com/web3privacy)
- **GitHub**: [github.com/web3privacy](https://github.com/web3privacy)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- **Community Contributors** - For submitting ideas and improvements
- **Expert Advisors** - For providing high-quality ideas recommendations
- **Organizations** - For sharing their project ideas
