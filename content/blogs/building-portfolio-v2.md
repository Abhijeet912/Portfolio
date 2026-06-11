---
title: Building My Portfolio v2 with React, Vite & Decap CMS
publishedDate: 2026-06-11
summary: >-
  Why I rebuilt my portfolio from scratch — and how React 19, Vite,
  Tailwind, Framer Motion and a git-based CMS give me a fast site I can
  update without touching code.
coverImage: ""
tags:
  - portfolio
  - react
  - decap-cms
draft: false
---

Every engineer's portfolio is a project in itself — so I treated mine like one.

## The goals

- **Fast**: Lighthouse > 95, initial bundle under 300 KB.
- **Interactive**: particles, 3D tilt cards, animated timelines — a site that feels alive.
- **Zero-maintenance content**: update projects, blogs and skills from an admin panel, no code changes.
- **Free to run**: GitHub + Vercel + Decap CMS = ₹0/month.

## The stack

The frontend is **React 19 + Vite + TypeScript**, styled with **Tailwind CSS** and animated with **Framer Motion**. Content lives as markdown files in the repo, edited through **Decap CMS** at `/admin`. Every save commits to GitHub, which triggers a Vercel rebuild — the site updates itself in under a minute.

## What's next

More posts on Java, Spring Boot, Kubernetes and the AI experiments I'm running. Stay tuned.
