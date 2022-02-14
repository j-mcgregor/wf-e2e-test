export const renderArrayForPrint = (list: any[], qtyPerPage: number) =>
  list.reduce(
    (acc: any, curr: any, index: number) =>
      (index % qtyPerPage == 0
        ? acc.push([curr])
        : acc[acc.length - 1].push(curr)) && acc,
    []
  );
