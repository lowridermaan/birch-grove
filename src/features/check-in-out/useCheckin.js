import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    //  data получаем из mutationFn
    onSuccess: (data) => {
      toast.success(`Заказ #${data.id} заселён`);
      queryClient.invalidateQueries({ active: true }); //обновляет все query которые изменились на странице
      navigate('/');
    },

    onError: () => toast.error('Ошибка во время регистрации'),
  });

  return { checkin, isCheckingIn };
}
