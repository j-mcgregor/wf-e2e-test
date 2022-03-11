import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { FlagIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';

interface PepFlagProps {
  className?: string;
  hint: TranslateInput;
}

const PepFlag = ({ className, hint }: PepFlagProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <div className={`${className} h-6 w-6 p-1.5 rounded-full bg-red-200`}>
          <FlagIcon />
        </div>
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="bg-white px-3 py-4 rounded shadow-md text-xs ml-16 z-20 w-52 "
      >
        <p className="break-normal">{hint}</p>
      </Popover.Panel>
    </Popover>
  );
};

export default PepFlag;
