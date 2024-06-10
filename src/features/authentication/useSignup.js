import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading: isSignup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        'Пользователь успешно зарегистрирован. На указанную почту направлен запрос подтверждения регистрации'
      );
    },
  });

  return { signup, isSignup };
}
