import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmEdit = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDuplicate({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmEdit>
      <Heading as="h3">Копирование {resourceName}</Heading>
      <p>Вы уверены что хотете создать копию {resourceName}?</p>
      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Отмена
        </Button>
        <Button
          $variation="danger"
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
        >
          Изменить
        </Button>
      </div>
    </StyledConfirmEdit>
  );
}

export default ConfirmDuplicate;
