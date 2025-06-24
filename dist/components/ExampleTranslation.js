"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_i18next_1 = require("react-i18next");
const ExampleTranslation = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '1rem' }, children: [(0, jsx_runtime_1.jsx)("label", { children: t('placeholder') }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { placeholder: t('placeholder') })] }));
};
exports.default = ExampleTranslation;
