import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUserUpdate } from './useUserUpdate';
import SpinnerMini from '../../ui/SpinnerMini';

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { updateUser, isUpdating } = useUserUpdate();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Новый пароль (не менее 8 символов)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 8,
              message: 'Минимальная длинна пароля 8 символов',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Подтверждение пароля"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'Поле обязательно к заполнению',
            validate: (value) =>
              getValues().password === value || 'Пароли не совпадают',
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={reset}
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
        >
          Отмена
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : 'Обновить пароль'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
