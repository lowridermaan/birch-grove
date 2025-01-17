import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  HiAdjustmentsHorizontal,
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { useCheckout } from '../check-in-out/useCheckout';

import { formatCurrency, nigths } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  // {функция(bookingId), загрузка}
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  const labelToTagName = {
    unconfirmed: 'неподтвержден',
    'checked-in': 'въезд',
    'checked-out': 'выезд',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Сегодня'
            : formatDistanceFromNow(startDate)}
          &rarr; {nigths(numNights)}
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy', { locale: ru })} &mdash;
          {format(new Date(endDate), 'MMM dd yyyy', { locale: ru })}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{labelToTagName[status]}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}>
            <HiAdjustmentsHorizontal />
          </Menus.Toggle>
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              Посмотреть детали
            </Menus.Button>
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Заселение
              </Menus.Button>
            )}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  checkout(bookingId);
                }}
                disabled={isCheckingOut}
              >
                Высление
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Удалить</Menus.Button>
            </Modal.Open>
          </Menus.List>
          {/* модалка удаление */}
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="заказ"
              onConfirm={() => {
                deleteBooking(bookingId);
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
