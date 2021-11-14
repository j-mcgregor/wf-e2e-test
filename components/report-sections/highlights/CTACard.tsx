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
  locked?: boolean;
  buttonColor: string;
  linkTo?: string;
  learnMoreLink?: string;
}

const CTACard = ({
  title,
  body,
  clickButton,
  buttonText,
  locked,
  buttonColor,
  linkTo,
  learnMoreLink
}: AddDataProps) => {
  const t = useTranslations();

  return (
    <div>
      <div className="bg-white p-3 mb-3 rounded-sm text-sm">
        <p className="font-bold">{title}</p>
        <p className="py-3">{body}</p>

        <div className="flex w-3/4">
          <Button
            disabled={locked}
            onClick={clickButton}
            className={`${buttonColor} w-full mr-2 text-white`}
            variant="none"
            linkTo={linkTo}
          >
            <p className="mx-2">{!locked ? buttonText : 'Unlock'}</p>
            {locked && <Lock color="white" />}
          </Button>
          <Button linkTo={learnMoreLink} className="w-full" variant="none">
            <p>{t('learn_more')}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTACard;
