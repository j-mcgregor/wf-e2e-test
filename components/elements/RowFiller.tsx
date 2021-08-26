interface RowFillerProps {
  rowQty: number;
  className: string;
  cellQty: number;
}

const RowFiller = ({ rowQty, className, cellQty }: RowFillerProps) => {
  return (
    <>
      {Array(rowQty).fill(
        <tr className={className}>
          { Array(cellQty).fill(<td className="px-6 py-4" />) } 
        </tr>
      )}
    </>
  );
};

export default RowFiller;
