import Image from 'next/image';
import WFLogo from '../../public/images/logos/wf-logo.svg';
import Button from '../elements/Button';
import { useTranslations } from 'next-intl';
import { BookmarkIcon } from '@heroicons/react/outline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {  UserReports, userReports } from '../../lib/appState';
import { Report } from '../../types/global'
interface ReportHeaderProps {
  company: string;
  created: string;
  reportId: string | number;
}
const ReportHeader = ({ company, created, reportId }: ReportHeaderProps) => {

  const { bookmarkedReports}  = useRecoilValue<UserReports>(userReports)


  const setBookmarkedReports = useSetRecoilState(userReports)

  const handleClick = () => {
    // recoil requires that what comes out of state is the same as what goes in,
    // but that is in efficient and problematic
    // we're working around it for now
    // @ts-ignore
    return setBookmarkedReports(reportId)
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
          <Image
            src={WFLogo}
            alt="Wiserfunding Logo"
            objectFit="contain"
            width={200}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
