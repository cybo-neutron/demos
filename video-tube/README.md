# VideoTube Monorepo

This workspace is powered by [Nx](https://nx.dev) and configured with **Tailwind CSS v4** and **shadcn/ui**.

## 🏗️ Project Structure

- **`apps/ui-client`**: A React + Vite application consuming shared UI components.
- **`libs/ui-components`**: A shared React component library powered by shadcn/ui.

## 🚀 Getting Started

### 1. Install dependencies
```sh
pnpm install
```

### 2. Run the application
```sh
pnpm nx serve ui-client
```
The app will be available at [http://localhost:3505](http://localhost:3505).

## 🎨 Tailwind CSS v4

This project uses the latest **Tailwind CSS v4** with a CSS-first configuration.
- The library defines the core theme in `libs/ui-components/src/index.css`.
- The application imports these styles and utilizes `@source` directives to scan the library for utility classes.

## 🧱 shadcn/ui & Shared Components

The `ui-components` library is the central place for all UI components. It is configured for **Zero-Config Component Addition**.

### Adding a new component
To add a new component (e.g., `accordion`), run:
```sh
pnpm dlx shadcn@latest add accordion --cwd libs/ui-components
```
**No other steps required!** 
The `ui-client` dev server will detect the new file and automatically:
1. Re-generate the library's barrel exports (`src/index.ts`).
2. Make the component available for import via `@video-tube/ui-components`.

### Example usage in App
```tsx
import { Accordion } from '@video-tube/ui-components';
```

## 🛠️ Maintenance

### Syncing TypeScript references
If you add new projects or experience linting issues, run:
```sh
pnpm nx sync --accept
```
