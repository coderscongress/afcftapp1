import { Request, Response } from 'express';
import { convert } from '../utils/unitConverter';

export const getCommodities = async (req: Request, res: Response) => {
  // Example static data; replace with real AfCFTA API call
  const commodities = [
    { name: 'Gold', unit: 'kg' },
    { name: 'Crude Oil', unit: 'barrel' },
    { name: 'Cocoa', unit: 'metric ton' },
  ];
  res.json(commodities);
};

export const convertUnits = (req: Request, res: Response) => {
  const { from, to, value } = req.query;
  const result = convert(from as string, to as string, parseFloat(value as string));
  res.json({ result });
};