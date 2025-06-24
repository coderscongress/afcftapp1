"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// src/components/AfCFTAHelpPage.tsx
const react_1 = require("react");
require("./AfCFTAHelpPage.css");
const AfCFTAHelpPage = () => {
    const [faq, setFaq] = (0, react_1.useState)([]);
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        fetch('/api/help')
            .then(res => res.json())
            .then(data => setFaq(data.faq))
            .catch(err => console.error('Failed to load FAQ:', err));
    }, []);
    const toggleIndex = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "help-page", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Frequently Asked Questions" }), (0, jsx_runtime_1.jsx)("div", { className: "faq-list", children: faq.map((item, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "faq-item", children: [(0, jsx_runtime_1.jsxs)("button", { className: "faq-question", onClick: () => toggleIndex(index), "aria-expanded": index === activeIndex, children: [item.question, (0, jsx_runtime_1.jsx)("span", { className: `arrow ${index === activeIndex ? 'open' : ''}`, children: "\u25BE" })] }), index === activeIndex && ((0, jsx_runtime_1.jsx)("div", { className: "faq-answer", children: item.answer }))] }, index))) })] }));
};
exports.default = AfCFTAHelpPage;
