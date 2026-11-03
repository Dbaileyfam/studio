import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import vercel from "vite-plugin-vercel";

function portfolioDirectory() {
  const indexFile = [
    path.resolve(__dirname, "public/portfolio/index.html"),
    path.resolve(__dirname, "dist/portfolio/index.html"),
  ].find((file) => fs.existsSync(file));

  return (req, res, next) => {
    const raw = req.url ?? "";
    const queryAt = raw.indexOf("?");
    const pathname = decodeURIComponent(queryAt === -1 ? raw : raw.slice(0, queryAt));
    const search = queryAt === -1 ? "" : raw.slice(queryAt);

    if (pathname === "/portfolio") {
      res.statusCode = 302;
      res.setHeader("Location", `/portfolio/${search}`);
      res.end();
      return;
    }

    if (pathname !== "/portfolio/") return next();
    if (!indexFile) return next();

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    fs.createReadStream(indexFile).pipe(res);
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 3000,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.JPG', '**/*.JPEG', '**/*.png', '**/*.PNG'],
  plugins: [
    {
      name: "portfolio-directory",
      configureServer(server) {
        server.middlewares.use(portfolioDirectory());
      },
      configurePreviewServer(server) {
        server.middlewares.use(portfolioDirectory());
      },
    },
    vercel(),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
