import { useEffect, useState } from 'react';
import { ToggleButton, ToggleThumb } from './ThemeToggle.styled';

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);  // 초기 값을 null로 설정
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const currentTheme = document.body.dataset.theme;  // document에 접근은 useEffect 내에서 수행
    setActiveTheme(currentTheme || 'light');  // 초기 activeTheme 값을 설정
  }, []);

  useEffect(() => {
    if (activeTheme) {
      document.body.dataset.theme = activeTheme;
      window.localStorage.setItem('theme', activeTheme);
    }
  }, [activeTheme]);

  return (
    <ToggleButton
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <ToggleThumb $activeTheme={activeTheme || undefined} />
      <span>🌘</span>
      <span>🌕</span>
    </ToggleButton>
  );
};

export default ThemeToggle;
