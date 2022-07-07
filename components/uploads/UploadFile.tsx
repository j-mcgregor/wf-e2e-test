import { TrashIcon, UploadIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { useTranslations } from 'use-intl';
import { TranslateInput } from '../../types/global';
import Button from '../elements/Button';

interface UploadFileProps {
  linkText: TranslateInput;
  text: TranslateInput;
  fileName: string | null;
  removeFile: () => void;
  setFile: (file: File | null) => void;
  disableRemoveButton?: boolean;
}

// Excel Files 97-2003 (.xls)
export const XLS = 'application/vnd.ms-excel';
// Excel Files 2007+ (.xlsx)
export const XLSX =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const UploadFile = ({
  text,
  linkText,
  removeFile,
  fileName,
  setFile,
  disableRemoveButton
}: UploadFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e?.target?.files?.[0] ? e?.target?.files[0] : null);
  };

  // handle the click on the drop area
  const handleClick = () => {
    return inputRef?.current?.click();
  };

  const acceptedFiles = ['.csv', XLS, XLSX];

  return (
    <div className="relative group">
      {!fileName && (
        <button
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDrop(e)}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`${
            draggedOver ? 'bg-highlight bg-opacity-60' : 'bg-transparent'
          }   h-52 flex flex-col items-center justify-center rounded absolute w-full  hover:cursor-pointer`}
        />
      )}
      <div
        className={`h-52 bg-bg   flex flex-col items-center justify-center rounded  `}
      >
        <div
          className={`${
            draggedOver ? 'hidden' : 'block'
          } flex flex-col w-full items-center`}
        >
          <form className={`py-4 mt-2 text-sm  px-4 `}>
            {!fileName && (
              <label htmlFor="file-upload">
                <UploadIcon className="h-20 w-20 border-2 border-highlight text-highlight group-hover:opacity-50  cursor-pointer  p-4 rounded mb-5 mx-auto" />
              </label>
            )}
            {/* Handles the issue with no file change on chrome (i.e. same file upload ) */}
            {!fileName && (
              <input
                className="hidden"
                type="file"
                ref={inputRef}
                id="file-upload"
                accept={acceptedFiles.join(',')}
                onChange={e => handleChange(e)}
              />
            )}

            {!fileName ? (
              <div className="flex w-full">
                <div className="mx-auto">
                  <label
                    className="text-highlight cursor-pointer group-hover:opacity-60"
                    htmlFor="file-upload"
                  >
                    {linkText}
                  </label>
                  <span className="ml-1">{text}</span>
                </div>
              </div>
            ) : (
              <div className={`w-full `}>
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
                disabled={disableRemoveButton}
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
    </div>
  );
};

export default UploadFile;
