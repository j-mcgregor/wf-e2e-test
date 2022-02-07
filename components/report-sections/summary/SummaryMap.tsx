import Iframe from 'react-iframe';
import { useTranslations } from 'next-intl';

interface SummaryMapProps {
  postCode?: string | null;
  addressLines: AddressLineType[];
  city?: string | null;
  county?: string | null;
  region?: string | null;
  country?: string | null;
  emails: string[];
  websites: string[];
  phoneNumbers: string[];
}

type AddressLineType = string | null | undefined;

const SummaryMap = ({
  postCode,
  addressLines,
  city,
  county,
  // region,
  country,
  emails,
  websites,
  phoneNumbers
}: SummaryMapProps) => {
  const t = useTranslations();

  const validAddressLines = addressLines
    ?.filter(x => x)
    ?.flatMap(x => [x, ', ']);

  const addressLinesString = validAddressLines.toString().replace(/,/g, '');

  const fullAddress = `${addressLinesString ?? ''} ${city ?? ''} ${
    country ?? ''
  } ${postCode ?? ''}`;
  const emailAddress = emails?.length > 0 ? emails[0] : null;
  const website = websites?.length > 0 ? websites[0] : null;

  const isValidWebsite = website && website.replace(/^https?:\/\//, '');
  const validWebsiteAddress = isValidWebsite
    ? `https://${isValidWebsite}`
    : null;

  return (
    <div className="bg-white border shadow-sm rounded md:ml-8  h-full flex flex-col text-primary print:flex-row print:mt-10 print:border-2 print:p-3  print:shadow-none prose-h4:font-bold  justify-between">
      <div className="flex items-center justify-center bg-gray-500 text-white text-center print:w-1/2 flex-1 md:max-h-[55%]">
        <Iframe
          width="100%"
          height="100%"
          loading="lazy"
          url={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}
          &q=${fullAddress}&zoom=12`}
        />
      </div>
      <div className="flex flex-col p-4 print:px-8 print:w-1/2 justify-center min-h-1/2">
        <div>
          <h4>{t('registered_address')}</h4>
          <address className="pb-2">
            {validAddressLines?.map((line: AddressLineType, index: number) => {
              return line && <span key={index}>{line}</span>;
            })}
            {city && <p>{city}</p>}
            {county && <p>{county}</p>}
            {country && <p>{country}</p>}
            {postCode && <p>{postCode}</p>}
          </address>
        </div>
        <div className="flex justify-between flex-wrap">
          <h4>{t('email')}</h4>

          {emailAddress ? (
            <a href={`mailto:${emailAddress}`} target="_blank" rel="noreferrer">
              {emailAddress}
            </a>
          ) : (
            <span>{t('na')}</span>
          )}
        </div>
        <div className="flex justify-between flex-wrap">
          <h4>{t('website')}</h4>
          {validWebsiteAddress ? (
            <a
              className="hover:text-highlight"
              href={validWebsiteAddress}
              target="_blank"
              rel="noreferrer"
            >
              {website}
            </a>
          ) : (
            <span>{t('na')}</span>
          )}
        </div>
        <div className="flex justify-between flex-wrap">
          <h4>{t('telephone')}</h4>
          <p>{phoneNumbers ? phoneNumbers[0] : t('na')}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryMap;
