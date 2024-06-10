import supabase, { supabaseUrl } from './supabase';

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // This method retrieves the current local session (i.e local storage).
  // проверяем есть в ls запись о пользователе
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  /* Gets the current user details if there is an existing session. This method
  performs a network request to the Supabase Auth server, so the returned
  value is authentic and can be used to base authorization rules on.
   
  This method fetches the user object from the database instead of local session
  */
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //* добавляем  дополнительные данные о пользователе
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // * 1. Обновляем если только fullName или password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // * 2. Загружаем аватар

  const fileNAme = `avatar=${data.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileNAme, avatar);

  if (storageError) throw new Error(storageError.message);

  // * 3. Оновляем ссылку на аватар у пользователя

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileNAme}`,
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updatedUser;
}
