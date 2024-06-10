import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from '../ui/ButtonIcon';
import { useDarkMode } from '../context/ThemeContext';

function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
