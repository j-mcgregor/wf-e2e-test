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

  const phone = phoneNumbers?.[0]?.replace(/[A-z-]/g, '');

  const validAddressLines = addressLines
    ?.filter(x => x)
    ?.flatMap(x => [x, ', ']);

  return (
    <div className="bg-white border shadow-sm rounded md:ml-8  h-full flex flex-col text-primary print:flex-row print:mt-10 print:border-2 print:p-3  print:shadow-none">
      <div className="flex items-center justify-center bg-gray-500 text-white text-center print:w-1/2 flex-1">
        <Iframe
          width="100%"
          height="100%"
          loading="lazy"
          url={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}
          &q=${postCode}}&zoom=12`}
        />
      </div>
      <div className="flex flex-col p-4 print:px-8 print:w-1/2 justify-end min-h-1/2">
        <div>
          <p>{t('registered_address')}</p>
          <address className="font-bold pb-2">
            {validAddressLines?.map((line: AddressLineType, index: number) => {
              return line && <span key={index}>{line}</span>;
            })}
            {city && <p>{city}</p>}
            {county && <p>{county}</p>}
            {country && <p>{country}</p>}
            {postCode && <p>{postCode}</p>}
            {/* {region && <p>{region}</p>} */}
          </address>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>{t('email')}</p>
          <p className="font-bold">
            {emails?.length > 0 ? emails[0] : t('na')}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>{t('website')}</p>
          <p className="font-bold">
            {websites?.length > 0 ? websites[0] : t('na')}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>{t('telephone')}</p>
          <p className="font-bold">{phone ? phone : t('na')}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryMap;
