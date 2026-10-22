# Paylater Storefront

A demo storefront (React + TypeScript + Vite) used to test the `paylater.js` embed script in a real single-page app. It shows how a third-party `<paylater-message>` web component behaves inside React: client-side routing, re-renders, StrictMode, and prices that change after the page loads.

**Live site:** https://paylater-storefront.vercel.app

## Getting started

```sh
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Script            | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Lint with Oxlint                     |

## Pages

| Route          | Page           | Paylater usage                                                       |
| -------------- | -------------- | -------------------------------------------------------------------- |
| `/`            | Product list   | One `<paylater-message>` per product card                            |
| `/product/:id` | Product detail | Message updates live as the size selector changes the price          |
| `/cart`        | Cart           | No message. Cart state is in memory only and resets on page reload   |

Products are hard-coded in `src/data/products.ts`.

## How the Paylater embed works

`public/paylater.js` is a prebuilt, minified bundle copied into this repo. It is not built from source here. It registers a `<paylater-message>` custom element that shows "or 4 payments of $X" for the `amount` it's given.

```tsx
<paylater-message amount={price.toFixed(2)} currency="USD" />
```

- **`amount`** (required): a positive number as a string. Invalid or missing values log a console warning and render nothing.
- **`currency`** (optional): an ISO currency code. Defaults to `USD`. Formatting uses the browser's locale.

What the script does:

- **Lazy rendering:** each element renders the first time it comes within 200px of the viewport.
- **Live updates:** changing `amount` or `currency` re-renders the element. A `MutationObserver` also watches those attributes as a safety net.
- **Manual refresh:** `window.Paylater.refresh()` re-renders every `<paylater-message>` on the page, including ones not yet in view.

### Integration code

- `src/paylater/loadPaylaterScript.ts` injects the script tag once and shares one promise across callers, so StrictMode's double effects and multiple pages don't load it twice. Pages that show messages call it from a `useEffect`.
- `src/paylater/paylater-message.d.ts` adds `<paylater-message>` to React's JSX types so TypeScript accepts it.

### Updating the script

Replace `public/paylater.js` with the new build and commit it. Nothing else needs to change unless the element's attributes or the `window.Paylater` API change. Pushing to `main` redeploys the live site with the new script.

## Deployment

The site is hosted on [Vercel](https://vercel.com) at https://paylater-storefront.vercel.app. Every push to `main` triggers a new build (`npm run build`, output `dist/`) and deploy.

- **`vercel.json`** rewrites every route to `index.html`, so opening or refreshing a URL like `/product/:id` loads the app instead of returning a 404. Real files such as `/paylater.js` are still served directly.
- **The site must be served from a domain root.** The script loads from `/paylater.js`, so hosting under a sub-path (for example, GitHub Pages at `/paylater-storefront/`) would break the Paylater messages.

## Project layout

```
public/paylater.js        Bundled Paylater embed script
src/main.tsx              App entry: router + cart provider
src/App.tsx               Nav and routes
src/pages/                ProductList, ProductDetail, Cart
src/context/CartContext   In-memory cart state
src/data/products.ts      Hard-coded product catalog
src/paylater/             Script loader and JSX types
vercel.json               SPA rewrite for Vercel
```
