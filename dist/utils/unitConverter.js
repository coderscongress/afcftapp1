"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const conversionRates = {
    'metric ton': 1000,
    'kg': 1,
    'barrel': 159,
    'liter': 1,
};
const convert = (from, to, value) => {
    const fromRate = conversionRates[from];
    const toRate = conversionRates[to];
    if (!fromRate || !toRate)
        throw new Error('Unsupported unit');
    return (value * fromRate) / toRate;
};
exports.convert = convert;
