import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="discount"
        options={[
          { value: 'all', label: 'Показать все' },
          { value: 'no-discount', label: 'Без скидки' },
          { value: 'with-discount', label: 'Со скидкой' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Сортировка по имени (А-Я)' },
          { value: 'name-desc', label: 'Сортировка по имени (Я-А)' },
          {
            value: 'regularPrice-asc',
            label: 'Сортировка цен (по возрастанию)',
          },
          {
            value: 'regularPrice-desc',
            label: 'Сортировка цен (по убыванию)',
          },
          {
            value: 'maxCapacity-asc',
            label: 'Сортировка вместимости (по возрастанию)',
          },
          {
            value: 'maxCapacity-desc',
            label: 'Сортировка вместимости (по убыванию)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinOperations;
