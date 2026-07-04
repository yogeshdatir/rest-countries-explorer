import { containerClasses } from '@/App';
import { TypographyH1 } from './TypographyH1';

const TopBar = () => {
  return (
    <header className="top-0 sticky flex justify-center items-center bg-white shadow-sm w-full h-[80px]">
      <div className={`flex justify-start ${containerClasses}`}>
        <TypographyH1>Where in the world?</TypographyH1>
      </div>
    </header>
  );
};

export default TopBar;
