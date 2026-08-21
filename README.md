# 🚀 PETY

> A full-stack web platform for browsing, listing, and managing pet adoptions — connecting animal shelters with loving homes..

## 👥 Team Members

| Name |  | |
|------|------------|------|
| MD Shahidul Islam Shihab|  |  |
| MD Imran Hossan |  |  |
|  |  |  |


## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS



## 📁 Folder Structure

```
/
├── app/              # Next.js App Router pages & layouts
│   ├── (auth)/       # Auth-related routes
│   ├── api/          # API route handlers
│   └── layout.tsx
├── components/       # Shared UI components
├── lib/              # Utility functions & helpers
├── types/            # Global TypeScript types
├── public/           # Static assets
└── .env.example      # Environment variable template
```

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm / yarn / pnpm

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/officialshahidulshihab/pety-adoption-system.git
cd pety-adoption-system.git

# 2. Install dependencies
npm install

# 3. Copy env file and fill in your values
cp .env.example .env.local

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌿 Branch Convention

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `dev` | Active development — PRs merge here |
| `feature/your-feature` | Individual feature branches |

**Always branch off `dev`, never `main`.**

## 📌 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript check |