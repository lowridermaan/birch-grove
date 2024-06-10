import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUserUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Изменения внесены успешно');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      if (err.message.includes('should be different')) {
        toast.error('Новый пароль должен отличатся от старого');
      } else {
        toast.error(err.message);
      }
    },
  });

  return { isUpdating, updateUser };
}
