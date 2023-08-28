export const calcChange = (value: number, lastValue: number) => {
  if (lastValue === Number(0)) {
    return (0).toFixed(2)
  }
  return (((Number(value) - Number(lastValue)) / Number(value)) * 100).toFixed(2);
};