import { formatDistance, parseISO, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import plural from 'ru-plurals';

export const nigths = plural('ночь', 'ночи', 'ночей');
export const guests = plural('гость', 'гостя', 'гостей');

// Supabase принимает только ISO date string
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
    locale: ru,
  })
    .replace('приблизительно ', '')
    .replace('через', 'Через');

export const getToday = function (options = {}) {
  const today = new Date();

  //Если end = true устанавливается максимальное значение дня (для getBookingAterDate)
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(
    value
  );
