import Image from 'next/image';
import WFLogo from '../../public/images/logos/wf-logo.svg';
import BookmarkIcon from '../icons/BookmarkIcon';
import Button from '../elements/Button';

interface ReportHeaderProps {
  company: string;
  created: string;
}
const ReportHeader = ({ company, created }: ReportHeaderProps) => {
  return (
    <div className="flex w-full only-of-type:justify-between">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium pb-4">{company}</h1>
        <p>Created: {created}</p>
      </div>

      <div className="flex">
        <Button variant="none" newClassName="border-none self-start">
          <BookmarkIcon />
        </Button>
        <div className="w-12 h-12 ml-4">
          <Image src={WFLogo} alt="Wiserfunding Logo" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
