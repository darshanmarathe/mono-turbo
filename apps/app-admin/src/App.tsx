import { useAuthStore } from './auth/store.ts';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';

export function App() {
  const isAuthenticated = useAuthStore((state) => state.accessToken !== null);
  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}

export default App;
