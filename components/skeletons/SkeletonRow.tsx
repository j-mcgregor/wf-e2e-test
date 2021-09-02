interface SkeletonRowProps {
  rowQty: number;
  className: string;
  cellQty: number;
}

const SkeletonRow = ({ rowQty, className, cellQty }: SkeletonRowProps) => {
  return (
    <>
      {[...Array(rowQty).keys()].map(row => {
        //fixed not showing - weren't returning from the map..
        return (
          <tr key={row} className={className}>
            {[...Array(cellQty).keys()].map(cell => {
              return <td key={cell} className="px-6 py-1" />;
            })}
          </tr>
        );
      })}
    </>
  );
};

export default SkeletonRow;
