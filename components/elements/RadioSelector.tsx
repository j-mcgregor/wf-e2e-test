import { useTranslations } from 'next-intl';
import React from 'react';

interface IRadioOption {
  label: string;
  value: string | number;
}

interface IRadioSelectorProps {
  name: string;
  options: IRadioOption[];
}

const RadioSelector: React.FC<IRadioSelectorProps> = ({ name, options }) => {
  const t = useTranslations();
  const isFirstOption = (index: number) => index === 0;
  const isLastOption = (index: number) => index === options.length - 1;
  return (
    <ul className="flex w-fit">
      {options.map(({ label, value }, idx) => (
        <li className="relative">
          <input
            type="radio"
            name={name}
            id={`option-${idx}`}
            className="sr-only peer"
            value={value}
            defaultChecked={isFirstOption(idx)}
          />
          <label
            htmlFor={`option-${idx}`}
            className={`${
              isFirstOption(idx)
                ? 'rounded-l-lg'
                : isLastOption(idx)
                ? 'rounded-r-lg'
                : ''
            } whitespace-nowrap flex h-10 px-4 items-center text-sm justify-center border-[1px] bg-white text-primary peer-checked:border-highlight peer-checked:text-highlight cursor-pointer`}
          >
            {t(`${label}`)}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioSelector;
