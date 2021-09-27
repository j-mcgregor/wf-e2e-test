import Image from 'next/image';
import WFLogo from '../../public/images/logos/wf-logo.svg';
import Button from '../elements/Button';
import { useTranslations } from 'next-intl';
import { BookmarkIcon } from '@heroicons/react/outline';
import { RecoilState, SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { userReports } from '../../lib/appState';
import { Report } from '../../types/global'
interface ReportHeaderProps {
  company: string;
  created: string;
  reportId: string | number;
}
const ReportHeader = ({ company, created, reportId }: ReportHeaderProps) => {

  // prefiltered application state
  const [{ bookmarkedReports }, setBookMarkedReports]: [Report[], SetterOrUpdater<any>] = useRecoilState(userReports)

  const handleClick = () => {
    return setBookMarkedReports(reportId)
  };
  // compare strings of the id and reportId
  const isBookMarked = bookmarkedReports?.find(
   ( x: Report) => `${x.id}` === `${reportId}`
  );

  const t = useTranslations();
  return (
    <div className="flex w-full only-of-type:justify-between">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium pb-4">{company}</h1>
        <p>
          {t('created')}: {created}
        </p>
      </div>

      <div className="flex">
        <Button
          variant="none"
          newClassName="border-none self-start"
          onClick={handleClick}
        >
          <BookmarkIcon
            className={`w-10 ${isBookMarked ? 'fill-current' : ''}`}
          />
        </Button>
        <div className="w-12 h-12 ml-4">
          <Image src={WFLogo} alt="Wiserfunding Logo" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
