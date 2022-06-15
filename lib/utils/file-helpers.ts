import * as Excel from 'xlsx';

export const downloadFile = ({
  data,
  fileName,
  fileType
}: {
  data: any;
  fileName: string;
  fileType: string;
}) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export const readFile = (
  file: File | null,
  setFile: (file: string | ArrayBuffer | null | undefined) => void
) => {
  if (typeof FileReader !== 'undefined') {
    const reader = new FileReader();
    reader.onload = function (file) {
      setFile(file.target?.result);
    };

    if (file) {
      reader.readAsText(file);
    } else {
      return '';
    }
  } else {
    return '';
  }
};

export const readExcelFile = (
  file: File | null,
  setFile: (file: Excel.Sheet) => void
) => {
  if (typeof FileReader !== 'undefined') {
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e?.target?.result;
      const workbook = Excel.read(data);
      setFile(workbook);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    } else {
      return '';
    }
  } else {
    return '';
  }
};
