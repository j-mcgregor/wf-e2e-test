import { TrashIcon, UploadIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import { TranslateInput } from '../../types/global';
import Button from '../elements/Button';

interface UploadFileProps {
  linkText: TranslateInput;
  text: TranslateInput;
  fileName: string | null;
  removeFile: () => void;
  setFile: (file: File | null) => void;
}

const UploadFile = ({
  text,
  linkText,
  removeFile,
  fileName,
  setFile
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
    setFile(file);
    return setIsDraggedOver(false);
  };

  return (
    <div
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      onDragLeave={handleDragLeave}
      className={`${
        draggedOver ? 'bg-highlight bg-opacity-60' : 'bg-bg'
      }  h-52 flex flex-col items-center justify-center rounded`}
    >
      <div
        className={`${
          draggedOver ? 'hidden' : 'block'
        } flex flex-col w-full items-center `}
      >
        <form className="py-4 mt-2 text-sm w-full px-4">
          {!fileName && (
            <label htmlFor="file-upload">
              <UploadIcon className="h-20 w-20 border-2 border-highlight text-highlight hover:opacity-50  cursor-pointer  p-4 rounded mb-5 mx-auto" />
            </label>
          )}

          <input
            className="hidden"
            type="file"
            id="file-upload"
            accept=".csv"
            onChange={e =>
              setFile(e?.target?.files?.[0] ? e?.target?.files[0] : null)
            }
          />

          {!fileName ? (
            <div className="flex w-full">
              <div className="mx-auto">
                <label
                  className="text-highlight cursor-pointer hover:opacity-60"
                  htmlFor="file-upload"
                >
                  {linkText}
                </label>
                <span className="ml-1">{text}</span>
              </div>
            </div>
          ) : (
            <div className={`w-full  `}>
              <p className="text-sm font-semibold  text-center max-w-sm mx-auto mb-5  ">
                {fileName}
              </p>
            </div>
          )}
          {fileName && (
            <Button
              variant="none"
              onClick={removeFile}
              className="inline-block max-w-xxs mx-auto shadow-none hover:text-red-400 border-2 border-primary hover:border-red-400 border-opacity-50 hover:border-opacity-100"
            >
              {t('remove_file')}
              <TrashIcon className="h-6 w-6  rounded ml-2" />
            </Button>
          )}
        </form>
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
