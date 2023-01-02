# 🌐 ashwin.lol
My website, which showcases various things about myself such as my projects, writings and photography. Houses everything and anything about myself, as well as where to find me.
## Overview
### Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Styling**: [TailWindCSS](https://tailwindcss.com/)
### Project
- `components/*` - Various repetitive modules of my website.
- `data/*` - Stores all data (blog posts, projects etc.)
- `lib/*` - Short for "library", a collection of helpful utilities.
- `pages/api/*`- API Routes which communicate with spotify, wakatime etc.
- `pages/blog/*` - Static pre-rendered blog pages using Markdown
- `pages/*` - All other static pages
- `public/*` - Static assets such as fonts and images.
- `styles/*` - Styling for various aspects of the website.

## Deploying Online
You can deploy this project to various platforms using the button(s) below.<br><br>
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxxiz%2Fashwin.lol%2F)&nbsp;
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fxxiz%2Fashwin.lol%2F)&nbsp;
[![Deploy To Heroku]( https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/xxiz/ashwin.lol)

## Running Locally 
This application requires Node.js v16.16.0+
```bash
git clone https://github.com/xxiz/ashwin.lol.git
cd ashwin.lol
npm install
npm run dev
```
**NOTE**: Create a `.env` using [`.env.example`](https://github.com/xxiz/ashwin.lol/blob/main/.env.example)
