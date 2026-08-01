import { fetchUsers } from '@repo/services';
import { useQuery } from '@tanstack/react-query';

export function useUsers(tenantId: string, accessToken: string) {
  return useQuery({
    queryKey: ['users', tenantId],
    queryFn: () => fetchUsers(tenantId, accessToken),
  });
}
