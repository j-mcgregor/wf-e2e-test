import { useTranslations } from 'next-intl';
import ShareHolderCard from './ShareHolderCard';
import { ShareholderType } from '../../../types/report';
import { renderArrayForPrint } from '../../../lib/utils/print-helpers';
import usePrintClasses from '../../../hooks/usePrintClasses';

interface ShareHolderListProps {
  shareholders: ShareholderType[];
}

const ShareHolderList = ({ shareholders }: ShareHolderListProps) => {
  const t = useTranslations();

  const shareHoldersToRender: ShareholderType[][] = renderArrayForPrint(
    shareholders,
    40
  );

  const shareholderListClasses = {
    chrome: {
      grid: 'print:avoid-break print:my-16'
    },
    'microsoft edge': {
      grid: ''
    }
  };

  const printClasses = usePrintClasses(shareholderListClasses);

  return (
    <div
      className="my-4 avoid-break "
      data-testid="corp-shareholder-section-testid"
    >
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('all_shareholders')}
      </p>

      {shareHoldersToRender.map(
        (subArray: ShareholderType[], index: number) => {
          return (
            <div
              key={index}
              className={`
                ${
                  index !== 0 && 'print:translate-y-[80px]'
                }  grid sm:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2 avoid-break ${
                printClasses.grid
              }`}
            >
              {subArray.map((shareholder, index) => {
                return (
                  <ShareHolderCard
                    key={index}
                    firstName={shareholder.first_name}
                    lastName={shareholder.last_name}
                    name={shareholder.name}
                    linkedin={shareholder.linkedin}
                    percentage={shareholder.percentage}
                    type={shareholder.type}
                  />
                );
              })}
            </div>
          );
        }
      )}
    </div>
  );
};

export default ShareHolderList;
