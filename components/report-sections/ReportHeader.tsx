import Image from 'next/image';
import WFLogo from '../../public/images/logos/wf-logo.svg';
import Button from '../elements/Button';
import { useTranslations } from 'next-intl';
import { BookmarkIcon } from '@heroicons/react/outline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserReports, userReports } from '../../lib/appState';
import { ReportSnippetType } from '../../types/global';

interface ReportHeaderProps {
  company: string;
  created: string;
  reportId: string | number;
  website: string;
}
const ReportHeader = ({
  company,
  created,
  reportId,
  website
}: ReportHeaderProps) => {
  const { bookmarkedReports } = useRecoilValue<UserReports>(userReports);

  const setBookmarkedReports = useSetRecoilState(userReports);

  const handleClick = () => {
    // recoil requires that what comes out of state is the same as what goes in,
    // but that is in efficient and problematic
    // we're working around it for now
    // @ts-ignore
    return setBookmarkedReports(reportId);
  };
  // compare strings of the id and reportId
  const isBookMarked = bookmarkedReports?.find(
    (x: ReportSnippetType) => `${x.id}` === `${reportId}`
  );

  const t = useTranslations();
  return (
    <div className="flex sm:flex-row flex-col w-full only-of-type:justify-between">
      <div className="flex flex-col order-2 sm:order-1">
        <p className="text-xl pb-4">{t('risk_assessment_report')}</p>
        <h1 className="text-3xl font-medium pb-4">{company}</h1>
        <p>
          {t('created')}: {created}
        </p>
      </div>

      <div className="flex order-1 sm:order-2">
        <div className="">
          {/* icon.horse url to grab companies icon - currently fetching small images without paid api */}
          <Image
            src={`https://icon.horse/icon/${website}`}
            alt="company icon"
            objectFit="contain"
            width={50}
            height={50}
          />
          {/* <Image
            src={WFLogo}
            alt="Wiserfunding Logo"
            objectFit="contain"
            width={50}
            height={50}
          /> */}
        </div>
        <Button
          variant="none"
          newClassName="border-none self-start ml-auto mr-2 sm:mr-0 sm:ml-4 print:hidden"
          onClick={handleClick}
        >
          <BookmarkIcon
            className={`w-10 ${isBookMarked ? 'fill-current' : ''}`}
          />
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader;
