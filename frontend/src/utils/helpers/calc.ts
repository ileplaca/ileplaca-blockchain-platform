export const calcChange = (value: number, lastValue: number) => {
  if (isNaN(value) || isNaN(lastValue)) {
    return '0.00';
  }

  const calculatedValue = ((Number(value) - Number(lastValue)) / Number(value)) * 100;

  if (isNaN(calculatedValue)) {
    return '0.00';
  }

  return calculatedValue.toFixed(2);
};
