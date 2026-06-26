# Contributing

## Setup

```bash
git clone https://github.com/Mahaan10/tattoo-studio-next.git
cd tattoo-studio-next
pnpm install
cp .env.example .env.local   # fill in your values
pnpm dev
```

## Workflow

1. Create a branch: `git checkout -b feat/your-feature` or `fix/your-bug`
2. Make changes
3. Run `pnpm lint` and `pnpm build` — both must pass
4. Open a Pull Request against `master`

## Commit Style

Use conventional commits:

```
feat: add appointment cancellation flow
fix: correct date picker timezone offset
chore: update dependencies
docs: update README setup steps
```

## i18n

Any user-facing string must be added to **both** `src/messages/en.json` and `src/messages/de.json`.

## Code Style

- TypeScript strict where possible
- Components in `src/components/features/<feature>/`
- API calls only through `src/components/services/`
- Validation schemas in `src/components/schema & types/`
