const conversionRates: Record<string, number> = {
  'metric ton': 1000,
  'kg': 1,
  'barrel': 159,
  'liter': 1,
};

export const convert = (from: string, to: string, value: number): number => {
  const fromRate = conversionRates[from];
  const toRate = conversionRates[to];
  if (!fromRate || !toRate) throw new Error('Unsupported unit');
  return (value * fromRate) / toRate;
};