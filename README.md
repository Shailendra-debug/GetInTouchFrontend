# GetInTouch24

An educational website built with React and Vite. Every existing page URL is kept as a Vite multi-page entry so current links and payment redirects continue to work.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; serve the generated `dist/` folder from a static web server.

React pages and shared components live in `src/`. Existing quiz, profile, authentication, and payment API controllers remain in `public/js/` to preserve their current server flows.
