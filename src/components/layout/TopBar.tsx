import { useTheme } from '@/context/ThemeContext';
import { MoonIcon } from 'lucide-react';
import { TypographyH1 } from '../common/TypographyH1';
import { containerClasses } from './Layout';
import { Button } from '../ui/button';

const TopBar = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(`${theme === 'dark' ? 'light' : 'dark'}`);
  };

  return (
    <header className="top-0 sticky flex justify-center items-center bg-white dark:bg-card shadow-sm w-full h-[80px]">
      <div className={`flex justify-between ${containerClasses}`}>
        <TypographyH1 className="max-md:pt-[3px] max-md:text-xl">
          Where in the world?
        </TypographyH1>
        <Button
          variant="ghost"
          onClick={handleThemeToggle}
          className="flex gap-3"
        >
          <MoonIcon /> Dark Mode
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
