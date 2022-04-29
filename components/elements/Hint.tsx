import { Popover } from '@headlessui/react';

import { useState } from 'react';
import { TranslateInput } from '../../types/global';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { usePopper } from 'react-popper';

export type HintTypeProps = {
  title?: TranslateInput;
  body?: TranslateInput;
  /** using as a last resort since I can't get t.rich to work */
  rawBody?: string;
  className?: string;
};
const Hint = ({ title, body, className, rawBody }: HintTypeProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <InformationCircleIcon
          className={`${className} h-6 w-6 opacity-50 print:hidden `}
        />
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="bg-white px-6 py-4 rounded-sm shadow text-sm -mx-6 z-20 max-w-xs"
      >
        <p className="font-bold pb-1">{title}</p>
        <p>{body}</p>
        {rawBody && <div dangerouslySetInnerHTML={{ __html: rawBody }} />}
      </Popover.Panel>
    </Popover>
  );
};

export default Hint;
