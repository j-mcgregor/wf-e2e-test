import Iframe from 'react-iframe';
import { useTranslations } from 'next-intl';

import { SummaryContact } from '../../../types/report';

interface SummaryMapProps {
  contact: SummaryContact;
}

const SummaryMap = ({ contact }: SummaryMapProps) => {
  const t = useTranslations();

  const phone = contact?.phone_numbers?.[0].replace(/[A-z-]/g, '');

  return (
    <div className="bg-white border shadow-sm rounded md:ml-8  h-full flex flex-col text-primary print:flex-row print:mt-10 print:border-2 print:p-3  print:shadow-none">
      <div className="flex items-center justify-center bg-gray-500 text-white text-center print:w-1/2">
        <Iframe
          width="100%"
          height="100%"
          loading="lazy"
          url={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}
          &q=${contact?.postal_code}}&zoom=12`}
        />
      </div>
      <div className="flex flex-col p-4 print:px-8 print:w-1/2">
        <div>
          <p>{t('registered_address')}</p>
          <address className="font-bold pb-2">
            <p>{contact?.address_line_1}</p>
            <p>{contact?.address_line_2}</p>
            <p>{contact?.address_line_3}</p>
            <p>{contact?.address_line_4}</p>
            <p>{contact?.postal_code}</p>
          </address>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>{t('email')}</p>

          {contact?.emails && <p className="font-bold">{contact.emails[0]}</p>}
        </div>
        <div className="flex justify-between flex-wrap">
          <p>{t('website')}</p>
          {contact?.websites && (
            <p className="font-bold">{contact.websites[0]}</p>
          )}
        </div>
        <div className="flex justify-between flex-wrap">
          <p>{t('telephone')}</p>
          {contact?.phone_numbers && <p className="font-bold">{phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default SummaryMap;
