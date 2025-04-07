// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const average = (numbers, step) => {
  if (!numbers?.length) return 0;
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  return Number((sum / numbers.length).toFixed(step));
};

// export const average = (numbers: number[], precision: number = 1): number => {
//   if (!numbers?.length) return 0;
//   const sum = numbers.reduce((acc, cur) => acc + cur, 0);
//   return Number((sum / numbers.length).toFixed(precision));
// };
