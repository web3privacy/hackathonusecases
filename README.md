# Privacy idea generator - use-cases ideation tool from hackathons to the next idea explorations

Hackathon use-cases generator - generate ideas curated by the Web3Privacy Now community and experts

<a href="https://web3privacy.info"><img width="100%" alt="w3pn-website-screen" src="https://github.com/web3privacy/hackathonusecases/blob/main/assets/Privacy%20use-cases%20segmentation.png"></a>

- **Community ideas** - use-cases delivered through hackathons ([json](https://github.com/web3privacy/hackathonusecases/blob/main/public/ideas/community-ideas.json))
- **Expert ideas** - use-cases from expert like Vitalik Buterin ([json](https://github.com/web3privacy/hackathonusecases/blob/main/public/ideas/expert-ideas.json))
- **Organizational ideas** - use-cases from both privacy-focused and web3-native organizations ([json](https://github.com/web3privacy/hackathonusecases/blob/main/public/ideas/organization-ideas.json))

# How to add organizational idea

1. Open [Organizational Ideas JSON](https://github.com/web3privacy/hackathonusecases/blob/main/public/ideas/organization-ideas.json).
2. Follow this Aztec example

```bash
        "id": "org-zk-stablecoin",
        "name": "ZK stablecoin",
        "description": "A stablecoin that allows you to wrap a stablecoin so it can be privately transferred.",
        "categories": [
            "DeFi",
            "Privacy"
        ],
        "features": [
            "private balance (#stablecoins)",
            "private transfer (receive-send)"
        ],
        "organizationName": "Aztec",
        "organizationLogo": "https://cdn.prod.website-files.com/65804cbd4c37d195e67717e9/65e1af471158ca9d1ae94eac_aztec-iso_dark.svg",
        "github": "https://github.com/AztecProtocol",
        "featured": true
    }
```

3. Add your data (use-cases).
4. Make a Pull Request.
5. Our team will review contributions - later they will appear on the front-end.

# Tech specs

Deployed at [https://ideas.web3privacy.info/](https://ideas.web3privacy.info/)

Development instance: [https://hackathonusecases-nu.vercel.app/](https://hackathonusecases-nu.vercel.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with Vercel's [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
