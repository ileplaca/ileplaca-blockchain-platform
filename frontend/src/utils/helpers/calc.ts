export const calcChange = (value: number, lastValue: number) => {
  if (Number(lastValue) === 0) {
    return 0;
  }

  if (isNaN(value) || isNaN(lastValue)) {
    return 0;
  }

  return (((Number(value) - Number(lastValue)) / Number(value)) * 100).toFixed(2);
};
