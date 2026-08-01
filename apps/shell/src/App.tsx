import { lazy, Suspense } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Badge } from '@repo/ui';
import { ErrorBoundary } from './remote/ErrorBoundary.tsx';

const AdminApp = lazy(() => import('appAdmin/App'));
const AdminBApp = lazy(() => import('appAdminB/App'));
const KitchenWidget = lazy(() => import('kitchenSink/Widget'));

function Shell() {
  return (
    <div className="shell">
      <header className="shell__nav">
        <span className="shell__brand">SaaS Console</span>
        <nav className="shell__links">
          <Link to="/admin-a">Admin A</Link>
          <Link to="/admin-b">Admin B</Link>
          <Link to="/components">Components</Link>
        </nav>
        <Badge tone="success">Shell</Badge>
      </header>
      <main className="shell__content">
        <ErrorBoundary>
          <Suspense fallback={<p className="shell__loading">Loading micro frontend...</p>}>
            <Routes>
              <Route path="/" element={<AdminApp />} />
              <Route path="/admin-a" element={<AdminApp />} />
              <Route path="/admin-b" element={<AdminBApp />} />
              <Route path="/components" element={<KitchenWidget />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
