import { TranslateInput } from '../../../types/global';
import { useTranslations } from 'next-intl';
import Button from '../../elements/Button';
import Lock from '../../icons/Lock';
import Link from '../../elements/Link';

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
  disabled?: boolean;
}

const CTACard = ({
  title,
  body,
  clickButton,
  buttonText,
  locked,
  buttonColor,
  linkTo,
  learnMoreLink,
  disabled
}: AddDataProps) => {
  const t = useTranslations();

  return (
    <div>
      <div className="bg-white p-3 mb-3 rounded-sm text-sm">
        <p className="font-bold">{title}</p>
        <p className="py-3">{body}</p>

        <div className="flex w-3/4 items-center gap-4">
          <Button
            disabled={locked}
            onClick={clickButton}
            className={`${buttonColor} ${
              disabled ? 'pointer-events-none opacity-40' : ''
            } mr-2 text-white `}
            variant="none"
            linkTo={linkTo}
          >
            <p className="mx-2">{!locked ? buttonText : 'Unlock'}</p>
            {locked && <Lock color="white" />}
          </Button>
          <Link
            linkTo={learnMoreLink}
            className={`${
              learnMoreLink ? 'block' : 'hidden'
            } shadow-none whitespace-nowrap hover:text-alt`} // made invisible rather than comment out - so as to not break the layout
          >
            <p className={`${learnMoreLink ? 'block' : 'hidden'}`}>
              {t('learn_more')}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTACard;
