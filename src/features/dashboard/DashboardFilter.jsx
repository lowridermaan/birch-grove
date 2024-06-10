import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filteredField="last"
      options={[
        { value: '7', label: 'За последние 7 дней' },
        { value: '30', label: 'За последние 30 дней' },
        { value: '90', label: 'За последние 90 дней' },
      ]}
    />
  );
}

export default DashboardFilter;
