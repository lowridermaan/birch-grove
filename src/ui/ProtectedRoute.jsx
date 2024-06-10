import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

//Компонент не позволяет находится на странице приложения если инфы о пользователе нет в ls

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Загружаем пользователя с сервера
  const { isLoading, isAuthenticated } = useUser();

  // 2. Если пользователь не найден перенаправляем на страницу /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isLoading, isAuthenticated, navigate]
  );

  // 3. Пока грузится крутится спиннер
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. Если найден рендерим приложение
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
