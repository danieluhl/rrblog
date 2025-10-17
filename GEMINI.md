# Project Overview

This is a template for building full-stack React applications using React Router. It's a modern, production-ready setup that includes server-side rendering, asset bundling, and data loading/mutations.

## Key Technologies

*   **React:** The core UI library.
*   **React Router:** For routing and navigation.
*   **Vite:** As the build tool and development server.
*   **TypeScript:** For static typing.
*   **Tailwind CSS:** For styling.

## Building and Running

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

This will create a `build/` directory with the client and server assets.

### Running in Production

To start the production server:

```bash
npm run start
```

## Development Conventions

*   **Linting:** The project uses Biome for linting. You can run the linter with `npm run lint` and fix issues with `npm run lint:fix`.
*   **Type Checking:** The project uses TypeScript for type checking. You can run the type checker with `npm run typecheck`.
*   **Styling:** The project uses Tailwind CSS for styling. You can find the configuration in `tailwind.config.js`.
*   **Routing:** Routes are defined in `app/routes.ts`. The file-based routing convention is provided by `@react-router/dev`.
