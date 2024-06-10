import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Не удалось получиь информацию о коттедже');
  }

  return data;
}

export async function deleteCabin(id) {
  //0. получаю данные о картинке
  const { data: cabinImg } = await supabase
    .from('cabins')
    .select('image')
    .eq('id', id);

  const cabinImagePath = cabinImg[0].image;
  const cabinImageName = cabinImagePath.slice(
    cabinImagePath.lastIndexOf('/') + 1
  );

  // 1.удаляю коттедж из таблицы cabins
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Коттедж не может быть удалён');
  }

  // 2. если все ок, картинка удаляется из storage
  await supabase.storage.from('cabin-images').remove([cabinImageName]);

  return data;
}

export async function createEditCabin(newCabin, id) {
  // проверяем есть ли адрес у картинки
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  // Если есть то оставляем как есть иначе создаем новый путь
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1.создаем или изменяем коттедж
  let query = supabase.from('cabins');

  // 1.1 Создаём
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // 1.2 Изменяем
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Коттедж не может быть создан');
  }

  // 2. Загружаем картинку если она есть
  if (imageName?.includes('undefined')) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image); //newCabin.image (файл с картинкой который мы переопределили в CreateCabinForm )

  //3. удаляем коттедж если при загрузки фотки была ошибка
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.error(storageError);
    throw new Error(
      'Невозможно загрузить фото коттеджа, коттедж не будет создаваться'
    );
  }

  return data;
}
