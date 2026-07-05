import { useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import CountryDetails from '@/features/countries/components/CountryDetails';
import { Button } from '@/components/ui/button';
import { containerClasses } from '@/components/layout/Layout';

const CountryDetailsPage = () => {
  const navigate = useNavigate();
  const handleBackNavigate = () => {
    navigate(-1);
  };

  return (
    <div
      className={`flex flex-col lg:gap-20 gap-11 lg:pt-20 pt-11 pb-10 ${containerClasses}`}
    >
      <Button
        variant="outline"
        className="px-4 max-w-max"
        onClick={handleBackNavigate}
      >
        <ArrowLeftIcon />
        Back
      </Button>
      <CountryDetails />
    </div>
  );
};

export default CountryDetailsPage;
