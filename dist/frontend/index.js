"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../i18n"); // <-- Important: this initializes i18next
const client_1 = __importDefault(require("react-dom/client"));
const app_1 = __importDefault(require("./app"));
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(app_1.default, {}));
