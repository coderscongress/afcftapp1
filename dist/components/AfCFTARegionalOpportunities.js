"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./AfCFTARegionalOpportunities.css");
const regionalTradeTips = {
    Agriculture: [
        'High demand in West Africa for processed foods.',
        'East Africa offers free movement of agri-goods under AfCFTA.'
    ],
    Textiles: [
        'North Africa imports high-quality cotton-based products.',
        'Duty-free access to Southern African apparel markets.'
    ],
    Electronics: [
        'Fast-growing tech hubs in Kenya, Rwanda, and Nigeria.',
        'Incentives for assembly and export through regional zones.'
    ],
    All: [
        'High demand in West Africa for processed foods.',
        'East Africa offers free movement of agri-goods under AfCFTA.',
        'North Africa imports high-quality cotton-based products.',
        'Duty-free access to Southern African apparel markets.',
        'Fast-growing tech hubs in Kenya, Rwanda, and Nigeria.',
        'Incentives for assembly and export through regional zones.'
    ]
};
const defaultTips = [
    'Sell duty-free to 50+ African countries under AfCFTA.',
    'Simplified customs for intra-African e-commerce.',
    'Tap into a unified market of over 1.4 billion people.'
];
const AfCFTARegionalOpportunities = ({ productCategory = '', userCountry = '' }) => {
    const [tips, setTips] = (0, react_1.useState)(defaultTips);
    (0, react_1.useEffect)(() => {
        if (productCategory && regionalTradeTips[productCategory]) {
            // Combine matching category tips with default tips
            const matchedTips = [
                ...defaultTips,
                ...regionalTradeTips[productCategory]
            ];
            setTips(matchedTips);
        }
        else {
            setTips(defaultTips);
        }
    }, [productCategory]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "afcfta-regional-banner", children: [(0, jsx_runtime_1.jsxs)("h3", { children: ["AfCFTA Trade Insights", userCountry && ` for ${userCountry}`] }), (0, jsx_runtime_1.jsx)("ul", { children: tips.map((tip, idx) => ((0, jsx_runtime_1.jsx)("li", { children: tip }, idx))) })] }));
};
exports.default = AfCFTARegionalOpportunities;
