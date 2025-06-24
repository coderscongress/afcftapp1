"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertUnits = exports.getCommodities = void 0;
const unitConverter_1 = require("../utils/unitConverter");
const getCommodities = async (req, res) => {
    // Example static data; replace with real AfCFTA API call
    const commodities = [
        { name: 'Gold', unit: 'kg' },
        { name: 'Crude Oil', unit: 'barrel' },
        { name: 'Cocoa', unit: 'metric ton' },
    ];
    res.json(commodities);
};
exports.getCommodities = getCommodities;
const convertUnits = (req, res) => {
    const { from, to, value } = req.query;
    const result = (0, unitConverter_1.convert)(from, to, parseFloat(value));
    res.json({ result });
};
exports.convertUnits = convertUnits;
