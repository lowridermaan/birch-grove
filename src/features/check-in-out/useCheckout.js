import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    //  data получаем из mutationFn (которое возвращает updateBooking )
    onSuccess: (data) => {
      toast.success(`Заказ #${data.id} успешно выселен`);
      queryClient.invalidateQueries({ active: true }); //обновляет все query которые изменились на странице
    },

    onError: () => toast.error('Ошибка во время выселения'),
  });

  return { checkout, isCheckingOut };
}
