import { Popover } from '@headlessui/react';
import { TranslateInput } from '../../types/global';
import InfoIcon from '../icons/InfoIcon';

export type InfoPopoverProps = {
  title: TranslateInput;
  body: TranslateInput;
};
const InfoPopover = ({ title, body }: InfoPopoverProps) => {
  return (
    <Popover className="relative z-20">
      <Popover.Button>
        <InfoIcon />
      </Popover.Button>

      <Popover.Panel className="absolute bg-white px-4 py-2 rounded-sm shadow w-64 text-sm">
        <p className="font-bold pb-1">{title}</p>
        <p>{body}</p>
      </Popover.Panel>
    </Popover>
  );
};

export default InfoPopover;
