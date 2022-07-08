import { CheckIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import LinkCard from '../../../cards/LinkCard';

interface ICodatStageOneProps {
  loading: boolean;
  disabledClassName: string;
  enabledClassName: string;
  stage: number;
  setStage: (stage: number) => void;
}

const CodatStageOne: React.FC<ICodatStageOneProps> = ({
  loading,
  disabledClassName,
  enabledClassName,
  stage,
  setStage
}) => {
  const t = useTranslations();
  return (
    <div
      className={`${
        loading ? disabledClassName : enabledClassName
      } flex flex-col gap-6`}
      data-testid="codat-stage-1"
    >
      <h1 className="text-3xl font-semibold">{t('integration_stage_1')}</h1>
      <p>{t('integration_stage_1_description')}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setStage(2)}
          disabled={loading}
          className={`${
            stage > 1 && !loading
              ? 'border-2 border-highlight-2 shadow-inner hover:shadow-none'
              : 'hover:shadow-sm transition-shadow duration-200'
          } text-left`}
        >
          <LinkCard
            header={t('codat_integration')}
            description={t('codat_integration_body')}
            icon={<CheckIcon className="h-6 w-6" />}
            iconColor="bg-highlight-2 bg-opacity-20"
            disabled={loading}
          />
        </button>
        {/* <LinkCard
            header="Future Integration"
            description={'Add your headers for your Codata integration.'}
            icon={<LightningBoltIcon className="h-6 w-6" />}
            iconColor="bg-alt bg-opacity-20"
            disabled
          /> */}
      </div>
    </div>
  );
};

export default CodatStageOne;
