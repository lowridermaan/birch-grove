import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

// если инфа о пользователе находится в ls то пользователь будет всегда авторизован

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === 'authenticated', user };
}
