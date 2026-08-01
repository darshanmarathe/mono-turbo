import { useState } from 'react';
import type { FormEvent } from 'react';
import type { User } from '@repo/models';
import { jsonRequest } from '@repo/services';
import { Button, Card, Input } from '@repo/ui';
import { useAuthStore } from '../auth/store.ts';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const signIn = async (username: string, userPassword: string) => {
    setError(null);
    try {
      const result = await jsonRequest<{ user: User; accessToken: string }>('POST', '/api/auth/login', {
        email: username,
        password: userPassword,
      });
      login(result.accessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void signIn(email, password);
  };

  const useDemoCredentials = () => {
    const demoEmail = 'admin@acme.com';
    const demoPassword = 'admin123';
    setEmail(demoEmail);
    setPassword(demoPassword);
    void signIn(demoEmail, demoPassword);
  };

  return (
    <div className="login">
      <Card title="Sign in">
        <form className="column" onSubmit={handleSubmit}>
          <p className="login__demo-credentials">
            Demo username: <strong>admin@acme.com</strong>
            <br />
            Demo password: <strong>admin123</strong>
          </p>
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
          <Button type="button" variant="secondary" onClick={useDemoCredentials}>
            Use demo credentials and sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
