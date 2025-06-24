"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../i18n"); // <-- Important: this initializes i18next
const react_i18next_1 = require("react-i18next");
const react_router_dom_1 = require("react-router-dom");
require("./Home.css");
const Home = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)("div", { className: "afcfta-pro", children: (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-pro-content", children: [(0, jsx_runtime_1.jsx)("h1", { children: (0, jsx_runtime_1.jsxs)(react_i18next_1.Trans, { i18nKey: "homeTitle", children: ["Welcome to ", (0, jsx_runtime_1.jsx)("span", { children: "AfCFTApp" })] }) }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsxs)(react_i18next_1.Trans, { i18nKey: "homeIntro", children: ["Whether you're a ", (0, jsx_runtime_1.jsx)("strong", { children: "business tycoon in Accra" }), ", an ", (0, jsx_runtime_1.jsx)("strong", { children: "exporter in Nairobi" }), ", or a ", (0, jsx_runtime_1.jsx)("strong", { children: "buyer in Dakar" }), ", ", (0, jsx_runtime_1.jsx)("span", { children: "AfCFTApp" }), " helps you harness the full potential of the", (0, jsx_runtime_1.jsx)("strong", { children: " African Continental Free Trade Area (AfCFTA)" }), "."] }) }), (0, jsx_runtime_1.jsx)("p", { className: "afcfta-icons", children: (0, jsx_runtime_1.jsxs)(react_i18next_1.Trans, { i18nKey: "homeSlogan", children: ["\uD83D\uDD0D ", (0, jsx_runtime_1.jsx)("strong", { children: "Search." }), " \uD83D\uDCE6 ", (0, jsx_runtime_1.jsx)("strong", { children: "Trade." }), " \uD83E\uDD1D ", (0, jsx_runtime_1.jsx)("strong", { children: "Connect." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("em", { children: "One Continent. One Market. One Platform. One Africa." })] }) }), (0, jsx_runtime_1.jsx)("button", { className: "chatbot-button", onClick: () => navigate('/chatbot'), children: t('launchChatbot') }), "\u00A0\u00A0", (0, jsx_runtime_1.jsxs)("p", { children: [t('subscribeMessage'), " ", (0, jsx_runtime_1.jsx)("button", { className: "chatbot-button", onClick: () => navigate('/subscribe'), children: t('subscribeLabel') })] })] }) }));
};
exports.default = Home;
