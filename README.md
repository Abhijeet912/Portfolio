# Abhijeet Anand — Portfolio v2

Personal portfolio at **[abhijeetanand.online](https://abhijeetanand.online)** — built with React 19, Vite, TypeScript, Tailwind CSS v4 and Framer Motion. Content is managed with **Decap CMS** at `/admin`: every save commits to this repo and Vercel redeploys automatically (~30–60s).

```
Browser → Vercel → React + Vite frontend
                      ↑
        Decap CMS (/admin) → GitHub commit → Vercel rebuild
```

## Local development

```bash
npm install
npm run dev          # site at http://localhost:5173
```

To edit content locally with the CMS (no GitHub auth needed):

```bash
npm run cms          # starts decap-server (local backend proxy)
npm run dev          # then open http://localhost:5173/admin/
```

`npm run build` type-checks and produces the production bundle in `dist/`.

## Content model

All content lives in `/content` and is edited via `/admin`:

| Collection       | Path                      | Notes                                  |
| ---------------- | ------------------------- | -------------------------------------- |
| Site settings    | `content/settings/site.yml` | Name, tagline, bio, photo, resume link, socials |
| Projects         | `content/projects/*.md`   | Status: ongoing / completed / deployed |
| Blog posts       | `content/blogs/*.md`      | `draft: true` hides a post             |
| Experience       | `content/experience/*.md` | Sorted by `order` (1 = most recent)    |
| Skills           | `content/skills/*.md`     | One file per category                  |
| Certifications   | `content/certifications/*.md` | Page shows an empty state until added |

Uploaded media goes to `public/uploads/`.

## Deploying to Vercel

1. Import this repo in [Vercel](https://vercel.com/new) — framework preset **Vite** is auto-detected.
2. Add the custom domain `abhijeetanand.online` in Project → Settings → Domains.

### Enable the admin panel (one-time setup)

The CMS authenticates with GitHub OAuth via the serverless functions in `/api`.

1. Create a **GitHub OAuth App**: GitHub → Settings → Developer settings → OAuth Apps → New.
   - Homepage URL: `https://abhijeetanand.online`
   - Authorization callback URL: `https://abhijeetanand.online/api/callback`
2. In Vercel → Project → Settings → Environment Variables, add:
   - `OAUTH_GITHUB_CLIENT_ID` — the OAuth app's client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` — the OAuth app's client secret
3. Redeploy. Visit `https://abhijeetanand.online/admin/` and log in with GitHub.

> Testing on the temporary `*.vercel.app` domain first? Set `base_url` in
> `public/admin/config.yml` (and the OAuth app callback) to that URL, then switch
> both to the custom domain when it's live.

### Contact form (one-time activation)

The contact form posts to [FormSubmit](https://formsubmit.co) (free, no API key).
The **first** submission sends an activation email to the portfolio inbox —
click the confirmation link once and all future messages are delivered directly.

## Stack

- **React 19 + Vite + TypeScript** — fast SPA with code-split routes
- **Tailwind CSS v4** — design tokens via `@theme`, custom utilities
- **Framer Motion** — page reveals, 3D tilt cards, scroll-linked timeline
- **Decap CMS** — git-based content management, zero database
- **Vercel** — hosting + serverless OAuth functions, auto-deploy on push

Monthly cost: **₹0** (GitHub free, Vercel free, Decap free, domain already owned).
