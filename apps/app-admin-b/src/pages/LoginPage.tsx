import { useState } from 'react';
import type { FormEvent } from 'react';
import type { User } from '@repo/models';
import { jsonRequest } from '@repo/services';
import { Button, Card, Input } from '@repo/ui';
import { useAuthStore } from '../auth/store.ts';

export function LoginPage() {
  const [email, setEmail] = useState('reports@acme.com');
  const [password, setPassword] = useState('reports123');
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await jsonRequest<{ user: User; accessToken: string }>('POST', '/api/auth/login', {
        email,
        password,
      });
      login(result.accessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="login">
      <Card title="Sign in — Reports">
        <form className="column" onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          {error ? <p className="error">{error}</p> : null}
          <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </div>
  );
}
