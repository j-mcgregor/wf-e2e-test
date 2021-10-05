import { Popover } from '@headlessui/react';
import { useState } from 'react';
import { TranslateInput } from '../../types/global';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { usePopper } from 'react-popper';

export type HintTypeProps = {
  title: TranslateInput;
  body: TranslateInput;
};
const Hint = ({ title, body }: HintTypeProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <InformationCircleIcon className="h-8 w-8" />
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className=" bg-white px-6 py-4 rounded-sm shadow text-sm -mx-6 z-20"
      >
        <p className="font-bold pb-1">{title}</p>
        <p>{body}</p>
      </Popover.Panel>
    </Popover>
  );
};

export default Hint;
