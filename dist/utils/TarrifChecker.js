"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TariffChecker = () => {
    const [tariffData, setTariffData] = (0, react_1.useState)(null);
    const [productCode, setProductCode] = (0, react_1.useState)('');
    const [destinationCountry, setDestinationCountry] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (productCode && destinationCountry) {
            fetchTariffData(productCode, destinationCountry);
        }
    }, [productCode, destinationCountry]);
    const fetchTariffData = async (productCode, destinationCountry) => {
        try {
            const response = await fetch(`https://afcfta-api.com/tariff?productCode=${productCode}&destinationCountry=${destinationCountry}`);
            const data = await response.json();
            setTariffData(data);
        }
        catch (error) {
            console.error('Error fetching tariff data:', error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: productCode, onChange: (e) => setProductCode(e.target.value), placeholder: "Enter product code" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: destinationCountry, onChange: (e) => setDestinationCountry(e.target.value), placeholder: "Enter destination country" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => fetchTariffData(productCode, destinationCountry), children: "Check Tariff" }), tariffData && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Tariff Information:" }), (0, jsx_runtime_1.jsx)("p", { children: "Product: " }), (0, jsx_runtime_1.jsxs)("p", { children: ["Tariff: ", "%"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Compliance: ", 0 ? 'Eligible for AfCFTA' : 'Not eligible for AfCFTA'] })] }))] }));
};
exports.default = TariffChecker;
