"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AfCFTABuyerOrder_1 = __importDefault(require("./AfCFTABuyerOrder"));
const AfCFTABuyerOrderWrapper = () => {
    const { productCode } = (0, react_router_dom_1.useParams)();
    if (!productCode)
        return (0, jsx_runtime_1.jsx)("div", { children: "Invalid product code." });
    return (0, jsx_runtime_1.jsx)(AfCFTABuyerOrder_1.default, {});
};
exports.default = AfCFTABuyerOrderWrapper;
