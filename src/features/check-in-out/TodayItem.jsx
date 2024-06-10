import styled from 'styled-components';
import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import { nigths } from '../../utils/helpers';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8.5rem 1rem 1fr 7rem 9rem;
  gap: 2.5rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, guests, status, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">прибывает</Tag>}
      {status === 'checked-in' && <Tag type="red">выселяется</Tag>}
      <Flag src={guests.countryFlag} alt="Флаг области" />
      <Guest>{guests.fullName}</Guest>
      <div>{nigths(numNights)}</div>
      {status === 'unconfirmed' && (
        <Button
          $size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          регистрация
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
