import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  display: flex;
  gap: 3rem;
  justify-content: end;

  background-color: var(--color-grey-0);
  padding: 1.4rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
