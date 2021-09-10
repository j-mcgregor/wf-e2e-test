import { TranslateInput } from '../../../types/global';
import { useTranslations } from 'next-intl';
import Button from '../../elements/Button';
import Lock from '../../icons/Lock';

interface AddDataProps {
  title: TranslateInput;
  body: TranslateInput;
  clickButton?: () => void;
  learnMore?: TranslateInput;
  buttonText: string;
  unlocked: boolean;
  buttonColor: string;
  linkTo?: string;
}

const CTACard = ({
  title,
  body,
  clickButton,
  buttonText,
  unlocked,
  buttonColor,
  linkTo
}: AddDataProps) => {
  const t = useTranslations();
  return (
    <div>
      <div className="bg-white p-3 mb-3 rounded-sm text-sm">
        <p className="font-bold">{title}</p>
        <p className="py-3">{body}</p>

        <div className="flex w-3/4">
          <Button
            disabled={!unlocked}
            onClick={clickButton}
            className={`${buttonColor} w-full mr-2 text-white`}
            variant="none"
          >
            <p className="mx-2">{unlocked ? buttonText : 'Unlock'}</p>
            {!unlocked && <Lock color="white" />}
          </Button>
          <Button linkTo={linkTo} className="w-full" variant="none">
            <p>{t('learn_more')}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTACard;
