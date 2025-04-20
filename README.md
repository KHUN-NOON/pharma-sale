This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Cloning the Repository  

To clone this repository **including all submodules**, run:  
```bash
git clone --recurse-submodules <repo-url>
cd pharma-sale
```

If you already cloned without submodules, initialize them with:
```bash
git submodule update --init --recursive
```

To pull the latest changes for the main repo and all submodules:
```bash
git pull --recurse-submodules
git submodule update --recursive
```

Install project dependencies

```bash
npm install
```

Reference ```.env.example``` file to setup environment variables in ```.env```

Run this command to initialize Prisma and Database connection

```bash
npx prisma init --output ../generated/prisma
```

Migrate database

```bash
npx prisma migrate dev --name init
```

After run this command to seed database

```bash
npm run prisma.seed
```

Finally, run the development server:

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

Login Credentials

```bash
email - admin@demo.com
password - admin123
```

## Tech Stack 

- **Framework**: [Next.js](https://nextjs.org/) (App Router)  
- **Database**: [Prisma](https://prisma.io) + [PostgreSQL](https://www.postgresql.org/)  
- **UI**: [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)  
- **Forms**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)  
- **Auth**: [NextAuth.js](https://next-auth.js.org/)  


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
