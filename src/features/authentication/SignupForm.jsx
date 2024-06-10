import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';
import toast from 'react-hot-toast';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isSignup } = useSignup();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
        onError: () => toast.error('Пользователь с такими данные существует'),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="ФИО" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', {
            required: 'Поле обязательно к заполнению',
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Проверте правильность написания email',
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow
        label="Пароль (не менее 8 символов)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 8,
              message: 'Минимальная длинна пароля 8 символов',
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow
        label="Повторный ввод пароля"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'Поле обязательно к заполнению',
            validate: (value) =>
              value === getValues().password || 'Пароли не совпадают',
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isSignup}>
          Отмена
        </Button>
        <Button disabled={isSignup}>
          {isSignup ? <SpinnerMini /> : 'Создать'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
