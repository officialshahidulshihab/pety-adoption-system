# Contributing Guide

## Workflow

1. **Pull latest `dev` before starting any work**
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit often with clear messages**
   ```
   feat: add login form
   fix: correct responsive layout on mobile
   chore: update dependencies
   style: format with prettier
   ```

4. **Push your branch and open a Pull Request → `dev`**
   - Describe what you changed and why
   - Tag a teammate to review

5. **Never push directly to `main` or `dev`**

---

## Commit Message Prefixes

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Config, setup, dependencies |
| `style:` | Formatting only, no logic change |
| `refactor:` | Code restructure, no behavior change |
| `docs:` | README or comments |

---

## Rules

- Run `npm run lint` and `npm run type-check` before pushing
- Don't commit `.env.local` or `node_modules/`
- Resolve merge conflicts locally before opening a PR