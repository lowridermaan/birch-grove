import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breackfastPrice,
    } = {},
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUppdate(e, field) {
    const value = e.target.value;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Минимальное колличество ночей">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUppdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Максимальное колличество ночей">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUppdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Максимальное колличество гостей">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUppdate(e, 'maxGuestPerBooking')}
        />
      </FormRow>
      <FormRow label="Цена завтраков">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breackfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUppdate(e, 'breackfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
