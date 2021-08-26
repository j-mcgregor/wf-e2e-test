const EmptyRows = () => {
  return (
    <tr className="bg-white h-[72px] animate-pulse odd:bg-gray-100">
      {emptyCell}
      {emptyCell}
      {emptyCell}
      {emptyCell}
      {emptyCell}
    </tr>
  );
};

export default EmptyRows;
