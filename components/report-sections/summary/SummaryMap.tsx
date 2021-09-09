import Iframe from 'react-iframe';
import { useTranslations } from 'use-intl';

import { SummaryProps } from '../../../types/global';

const SummaryMap = ({ contact }: SummaryProps) => {
  const t = useTranslations();

  const phone = contact?.phone_numbers[0].replace(/[A-z-]/g, '');

  // couldn't get working in a .env - API key through Dan's Google account:
  const MAPS_API_KEY = 'AIzaSyBseaTSNK34Z11NPGydJsDTzTkE1Pe9fKo';

  return (
    <div className="bg-white border shadow-sm rounded md:ml-8  h-full flex flex-col text-primary">
      <div className="flex items-center justify-center bg-gray-500 text-white text-center ">
        <Iframe
          width="100%"
          height="100%"
          loading="lazy"
          url={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}
          &q=${contact?.postal_code}}&zoom=12`}
        />
      </div>
      <div className="flex flex-col p-4">
        <div>
          <p>{t('registered address')}</p>
          <div className="font-bold pb-2">
            <p>{contact?.address_line_1}</p>
            <p>{contact?.address_line_2}</p>
            <p>{contact?.address_line_3}</p>
            <p>{contact?.address_line_4}</p>
            <p>{contact?.postal_code}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>{t('email')}</p>

          {/* {contact?.emails && <p>{contact.emails[0]}</p>} */}
          <p className="font-bold">info@writeglazing.com</p>
        </div>
        <div className="flex justify-between">
          <p>{t('email')}</p>
          {contact?.websites && (
            <p className="font-bold">{contact.websites[0]}</p>
          )}
        </div>
        <div className="flex justify-between">
          <p>{t('telephone')}</p>
          {contact?.phone_numbers && <p className="font-bold">{phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default SummaryMap;
