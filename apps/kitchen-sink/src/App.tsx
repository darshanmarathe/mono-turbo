import { Badge } from '@repo/ui';
import { AppQueryProvider } from '@repo/query';
import {
  AlertsSection,
  BadgesSection,
  ButtonsSection,
  InputsSection,
  TablesSection,
} from './sections.tsx';

export function App() {
  return (
    <AppQueryProvider>
      <div className="page">
        <header className="page__header">
          <h1>Kitchen Sink</h1>
          <Badge tone="warning">Design system</Badge>
        </header>
        <main className="page__grid">
          <ButtonsSection />
          <InputsSection />
          <BadgesSection />
          <AlertsSection />
          <TablesSection />
        </main>
      </div>
    </AppQueryProvider>
  );
}
