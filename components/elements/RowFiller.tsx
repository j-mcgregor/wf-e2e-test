interface RowFillerProps {
  rowQty: number;
  className: string;
}

const RowFiller = ({ rowQty, className }: RowFillerProps) => {
  const emptyCell: JSX.Element = <td className="px-6 py-4" />;
  return (
    <>
      {Array(rowQty).fill(
        <tr className={className}>
          <td className="px-6 py-4" />
          {emptyCell}
          {emptyCell}
          {emptyCell}
          {emptyCell}
          {emptyCell}
        </tr>
      )}
    </>
  );
};

export default RowFiller;
