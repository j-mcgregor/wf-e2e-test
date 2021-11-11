import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';

interface UploadFileProps {
  linkText: TranslateInput;
  text: TranslateInput;
  fileName: string | null;
  selectFile: (e: React.FormEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  readFile: (file: File | null) => void;
}

const UploadFile = ({
  text,
  linkText,
  selectFile,
  removeFile,
  fileName,
  readFile
}: UploadFileProps) => {
  const t = useTranslations();

  const [draggedOver, setIsDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.items[0].getAsFile();

    readFile(file);
    setIsDraggedOver(false);
  };

  // -

  return (
    <div
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      onDragLeave={handleDragLeave}
      className={`${
        draggedOver ? 'bg-highlight bg-opacity-60' : 'bg-bg'
      } md:w-1/2 w-full h-52 flex flex-col items-center justify-center rounded`}
    >
      <div
        className={`${
          draggedOver ? 'hidden' : 'block'
        } flex flex-col items-center`}
      >
        <UploadIcon className="h-20 w-20 border-2 border-primary p-4 rounded mt-5" />

        <form className="py-4 mt-2 text-sm">
          <input
            className="hidden"
            type="file"
            id="file-upload"
            accept=".csv"
            onChange={e => selectFile(e)}
          />

          {!fileName && (
            <div className="flex">
              <label
                className="text-highlight cursor-pointer hover:opacity-80"
                htmlFor="file-upload"
              >
                {linkText}
              </label>
              <span>&nbsp;{text}</span>
            </div>
          )}
        </form>

        <div
          className={`${
            fileName ? 'visible' : 'invisible'
          } flex items-center justify-center relative`}
        >
          <p className="text-xs font-semibold">{fileName || 'test'}</p>
          <XIcon
            onClick={removeFile}
            className="h-5 w-5 font-bold ml-2 cursor-pointer hover:opacity-80"
          />
        </div>
      </div>

      <p
        className={`${draggedOver ? 'block' : 'hidden'}
        text-lg font-semibold`}
      >
        {t('drop_file_to_upload')}
      </p>
    </div>
  );
};

export default UploadFile;
