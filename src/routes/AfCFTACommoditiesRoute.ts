import { Router, Request, Response } from 'express';

const router = Router();

// Sample mock data for now
const commodities = [
  { id: 1, name: 'Gold', unit: 'metric tons', priceUSDPerUnit: 72000 },
  { id: 2, name: 'Cocoa', unit: 'metric tons', priceUSDPerUnit: 2800 },
  { id: 3, name: 'Crude Oil', unit: 'million barrels', priceUSDPerUnit: 75 },
];

// GET /api/afcfta/commodities
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'List of AfCFTA tradable commodities',
    data: commodities,
  });
});

export default router;
