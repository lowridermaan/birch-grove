import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineHomeModern,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { FaRubleSign } from 'react-icons/fa';
import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

import {
  formatDistanceFromNow,
  formatCurrency,
  nigths,
  guests,
} from '../../utils/helpers';
import { ru } from 'date-fns/locale/ru';

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {nigths(numNights)} в коттедже <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy', {
            locale: ru,
          })}{' '}
          (
          {isToday(new Date(startDate))
            ? 'Сегодня'
            : formatDistanceFromNow(startDate)}
          ) &mdash;{' '}
          {format(new Date(endDate), 'EEE, MMM dd yyyy', {
            locale: ru,
          })}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${guests(numGuests - 1)}` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>Телефон {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Пожелания"
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={hasBreakfast ? <HiOutlineCheckCircle /> : <HiOutlineXCircle />}
          label="Питание"
        >
          {hasBreakfast ? 'Завтраки включены' : 'Без завтраков'}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<FaRubleSign />} label={`Сумма`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} коттедж + ${formatCurrency(
                extrasPrice
              )} завтраки)`}
          </DataItem>

          <p>{isPaid ? 'Оплачено' : 'Оплата при заселении'}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Забронировано{' '}
          {format(new Date(created_at), 'EEE, MMM dd yyyy, p', {
            locale: ru,
          })}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
