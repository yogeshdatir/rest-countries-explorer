import { containerClasses } from '@/App';
import { TypographyH1 } from './TypographyH1';
import { Button } from './ui/button';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon } from 'lucide-react';

const TopBar = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(`${theme === 'dark' ? 'light' : 'dark'}`);
  };

  return (
    <header className="top-0 sticky flex justify-center items-center shadow-sm w-full h-[80px]">
      <div className={`flex justify-between ${containerClasses}`}>
        <TypographyH1>Where in the world?</TypographyH1>
        <Button variant="ghost" onClick={handleThemeToggle}>
          <MoonIcon /> Dark Mode
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
