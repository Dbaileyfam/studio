import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No #root element");

try {
  createRoot(rootEl).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} catch (err) {
  rootEl.innerHTML = `
    <div style="padding:2rem;font-family:sans-serif;color:#991b1b;max-width:600px;margin:2rem auto;">
      <h2>Failed to load app</h2>
      <pre style="overflow:auto;font-size:14px;">${String(err instanceof Error ? err.message : err)}</pre>
    </div>
  `;
}
