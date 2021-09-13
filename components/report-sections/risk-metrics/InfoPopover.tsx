import { Popover } from '@headlessui/react';
import InfoIcon from '../../icons/InfoIcon';

interface PopoverProps {
  hintTitle: string;
  hintBody: string;
}
const InfoPopover = ({ hintTitle, hintBody }: PopoverProps) => {
  return (
    <Popover className="relative z-20">
      <Popover.Button>
        <InfoIcon />
      </Popover.Button>

      <Popover.Panel className="absolute -top-12 bg-white px-4 py-2 rounded-sm shadow w-40  text-sm">
        <p className="font-bold pb-1">{hintTitle}</p>
        <p>{hintBody}</p>
      </Popover.Panel>
    </Popover>
  );
};

export default InfoPopover;
