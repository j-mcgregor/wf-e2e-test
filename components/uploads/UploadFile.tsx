import { UploadIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';

interface UploadFileProps {
  linkText: TranslateInput;
  text: TranslateInput;
  selectFile: (e: React.FormEvent<HTMLInputElement>) => void;
}

const UploadFile = ({ text, linkText, selectFile }: UploadFileProps) => {
  return (
    <div className="bg-bg w-full h-52 flex flex-col items-center justify-center">
      <UploadIcon className="h-20 w-20 border-2 border-primary p-4 rounded" />

      <form className="py-4 text-sm">
        <input
          className="hidden"
          type="file"
          id="file-upload"
          accept=".txt, .csv"
          onChange={e => selectFile(e)}
        />

        <div className="flex">
          <label
            className="text-highlight cursor-pointer"
            htmlFor="file-upload"
          >
            {linkText}
          </label>
          <span>{text}</span>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;
