import { useState } from 'react';
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
    // console.log('file from drop:');
    readFile(file);
    setIsDraggedOver(false);
  };

  return (
    <div
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      onDragLeave={handleDragLeave}
      className={`${
        draggedOver ? 'border-highlight' : 'border-transparent'
      } bg-bg w-full h-52 flex flex-col items-center justify-center border-4 border-opacity-80 rounded`}
    >
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
          <span>&nbsp;{text}</span>
        </div>
      </form>
      {fileName && (
        <div className="flex items-center justify-center">
          <p className="text-sm font-semibold">{fileName}</p>
          <XIcon
            onClick={removeFile}
            className="h-4 w-4 font-bold ml-3 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
