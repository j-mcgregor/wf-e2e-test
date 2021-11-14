import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { TrashIcon, UploadIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';

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
        } flex flex-col items-center`}
      >
        <form className="py-4 mt-2 text-sm">
          {!fileName && (
            <label htmlFor="file-upload">
              <UploadIcon className="h-20 w-20 border-2 border-highlight text-highlight hover:opacity-50  cursor-pointer  p-4 rounded mb-5 mx-auto" />
            </label>
          )}
          {fileName && (
            <button onClick={removeFile} className="mx-auto block">
              <TrashIcon className="h-20 w-20 border-2 border-primary hover:border-red-400 hover:text-red-400 p-4 rounded mb-5" />
            </button>
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
            <div className="flex">
              <label
                className="text-highlight cursor-pointer hover:opacity-60"
                htmlFor="file-upload"
              >
                {linkText}
              </label>
              <span>&nbsp;{text}</span>
            </div>
          ) : (
            <div
              className={`${
                fileName ? 'visible' : 'invisible'
              } flex items-center justify-center relative`}
            >
              <p className="text-sm font-semibold">{fileName}</p>
            </div>
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
