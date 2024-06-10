import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="status"
        options={[
          { value: 'all', label: 'Все' },
          { value: 'checked-out', label: 'Выехали' },
          { value: 'checked-in', label: 'Въехали' },
          { value: 'unconfirmed', label: 'Неподтвержден' },
        ]}
      />

      <SortBy
        options={[
          { value: 'startDate-desc', label: 'По дате (недавние)' },
          { value: 'startDate-asc', label: 'По дате (более ранние)' },
          {
            value: 'totalPrice-desc',
            label: 'Сумма (по убыванию)',
          },
          { value: 'totalPrice-asc', label: 'Сумма (по возрастанию)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
