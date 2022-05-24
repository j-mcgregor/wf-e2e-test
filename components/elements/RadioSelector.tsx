import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { useTranslations } from 'next-intl';
import React, { ChangeEvent } from 'react';

interface IRadioOption {
  label: string;
  value: string | number;
}

interface IRadioSelectorProps {
  name: string;
  options: IRadioOption[];
  disabled?: boolean;
  setSelector?: (value: string) => void;
}

const RadioSelector = React.forwardRef<HTMLInputElement, IRadioSelectorProps>(
  ({ name, options, disabled, setSelector, ...otherProps }, ref) => {
    const t = useTranslations();
    const isFirstOption = (index: number) => index === 0;
    const isLastOption = (index: number) => index === options.length - 1;
    return (
      <ul className="flex w-full">
        {options.map(({ label, value }, idx) => (
          <li className="relative" key={`${name}-option-${idx}`}>
            <input
              ref={ref}
              type="radio"
              name={name}
              id={`option-${idx}`}
              className="sr-only peer"
              disabled={disabled}
              value={value}
              defaultChecked={isFirstOption(idx)}
              onChange={
                setSelector &&
                ((e: ChangeEvent<HTMLInputElement>) =>
                  setSelector(e.target.value))
              }
              {...otherProps}
            />
            <label
              htmlFor={`option-${idx}`}
              className={`${
                isFirstOption(idx)
                  ? 'rounded-l-lg'
                  : isLastOption(idx)
                  ? 'rounded-r-lg'
                  : ''
              } ${
                disabled ? 'cursor-default' : 'cursor-pointer'
              } whitespace-nowrap flex h-10 px-4 items-center text-sm justify-center border-[1px] bg-white text-primary peer-checked:border-highlight peer-checked:text-highlight`}
            >
              {t(`${label}`)}
            </label>
          </li>
        ))}
      </ul>
    );
  }
);

export default RadioSelector;
