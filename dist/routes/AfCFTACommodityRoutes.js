"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AfCFTACommodityController_1 = require("../controllers/AfCFTACommodityController");
const router = (0, express_1.Router)();
router.get('/', AfCFTACommodityController_1.getCommodities);
router.get('/convert', AfCFTACommodityController_1.convertUnits); // e.g. ?from=tons&to=kg&value=2
exports.default = router;
