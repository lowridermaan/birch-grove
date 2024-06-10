import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  //1 число заказов
  const numBookings = bookings.length;
  //2 продажи (сумма всех заказов)
  const sales = bookings.reduce(
    (sales, booking) => sales + booking.totalPrice,
    0
  );
  //3 число подтвержденных заказов
  const numConfirmedStays = confirmedStays.length;
  //4 заселённость
  const occupancyRate =
    confirmedStays.reduce((nigths, cur) => nigths + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        title="Заказы"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Продажи"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Въезд/Выселение"
        color="indigo"
        value={numConfirmedStays}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Заселенность отеля"
        color="yellow"
        value={`${Math.round(occupancyRate * 100)}%`}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
