export interface IdentityUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
  roles: string[];
  tenantId: string;
}

const IDENTITY: IdentityUser[] = [
  {
    id: 'a1f9b0e0-0000-4000-8000-000000000001',
    email: 'admin@acme.com',
    password: 'admin123',
    displayName: 'Ada Lovelace',
    roles: ['admin'],
    tenantId: 'tenant-acme',
  },
  {
    id: 'a1f9b0e0-0000-4000-8000-000000000002',
    email: 'reports@acme.com',
    password: 'reports123',
    displayName: 'Grace Hopper',
    roles: ['admin', 'reports'],
    tenantId: 'tenant-acme',
  },
  {
    id: 'a1f9b0e0-0000-4000-8000-000000000003',
    email: 'operator@globex.com',
    password: 'operator123',
    displayName: 'Alan Turing',
    roles: ['operator'],
    tenantId: 'tenant-globex',
  },
];

export function authenticate(email: string, password: string): IdentityUser | null {
  const user = IDENTITY.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) return null;
  return user;
}
