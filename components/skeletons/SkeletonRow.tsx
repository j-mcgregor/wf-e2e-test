interface SkeletonRowProps {
  rowQty: number;
  className: string;
  cellQty: number;
  widths?: (string | undefined)[];
}

const SkeletonRow = ({
  rowQty,
  className,
  cellQty,
  widths = []
}: SkeletonRowProps) => {
  return (
    <>
      {[...Array(rowQty).keys()].map(row => {
        //fixed not showing - weren't returning from the map..
        return (
          <tr key={row} className={className}>
            {[...Array(cellQty).keys()].map((cell, index) => {
              return <td key={cell} className={widths[index]} />;
            })}
          </tr>
        );
      })}
    </>
  );
};

export default SkeletonRow;
