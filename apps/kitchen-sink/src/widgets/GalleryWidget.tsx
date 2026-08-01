import { useState } from 'react';
import { Badge, Button, Card, Input } from '@repo/ui';

export function GalleryWidget() {
  const [count, setCount] = useState(0);

  return (
    <Card title="GalleryWidget (federated remote)">
      <div className="column">
        <Input placeholder="Shared Input from @repo/ui" />
        <Button onClick={() => setCount((current) => current + 1)}>Clicked {count} times</Button>
        <p>
          <Badge tone="success">Remote</Badge> <Badge>Shared runtime</Badge>
        </p>
      </div>
    </Card>
  );
}

export default GalleryWidget;
