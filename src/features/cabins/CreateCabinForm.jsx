import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? editValues : {},
  });

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEdit) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset(); // сброс полей из mutate
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            // здесь можно получить data из createEditCabin которая вызвана в mutateFn из хука
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(error) {
    // для тестирования
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Название коттеджа" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'Это поле обязательно для заполнения',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Вместимость" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'Это поле обязательно для заполнения',
            min: {
              value: 1,
              message: 'Минимальная всместимость 1 гость',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Цена" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'Это поле обязательно для заполнения',
          })}
        />
      </FormRow>

      <FormRow label="Скидка" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'Это поле обязательно для заполнения',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Скидка должна быть меньше основной цены',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Описание для сайта" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'Это поле обязательно для заполнения',
          })}
        />
      </FormRow>

      <FormRow label="Фото коттеджа" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register('image', {
            required: isEdit ? false : 'Это поле обязательно для заполнения',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Отмена
        </Button>
        <Button disabled={isWorking}>
          {isEdit ? 'Изменить данные' : 'Добавить коттедж'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
