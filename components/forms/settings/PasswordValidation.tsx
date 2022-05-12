import React from 'react';
import { XIcon, CheckIcon } from '@heroicons/react/solid';
import {
  HAS_LOWERCASE,
  HAS_NUMBER,
  HAS_SPECIAL_CHAR,
  HAS_UPPERCASE
} from '../../../lib/utils/regexes';

const MIN_PASSWORD_LENGTH = 8;

export const PasswordValidation: React.FC<{ password?: string }> = ({
  password = ''
}) => {
  const validations: Array<{ valid: boolean; label: string }> = [
    {
      valid: HAS_UPPERCASE.test(password),
      label: 'At least 1 uppercase letter'
    },
    {
      valid: HAS_LOWERCASE.test(password),
      label: 'At least 1 lowercase letter'
    },
    {
      valid: HAS_SPECIAL_CHAR.test(password),
      label: 'At least 1 special character'
    },
    {
      valid: HAS_NUMBER.test(password),
      label: 'At least 1 number'
    },
    {
      valid: password.length >= MIN_PASSWORD_LENGTH,
      label: 'Between 8 and 32 characters long'
    }
  ];

  return (
    <div className="w-auto h-full mt-2">
      <ul className="text-xs space-y-2">
        {validations.map((val, i) => (
          <li className="flex items-center" key={`validation-${i}`}>
            <span className="h-4 w-4 mr-1 mt-[2px]">
              {val.valid ? (
                <CheckIcon className="h-full fill-green-700" fill="#123445" />
              ) : (
                <XIcon className="h-full fill-red-700" />
              )}
            </span>
            {val.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
