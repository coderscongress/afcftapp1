"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../i18n"); // <-- Important: this initializes i18next
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const AfCFTABuyerOrder_1 = __importDefault(require("../components/AfCFTABuyerOrder"));
const NotFound_1 = __importDefault(require("../components/NotFound"));
const AfCFTAProductDetail_1 = __importDefault(require("../components/AfCFTAProductDetail"));
const AfCFTAVendorDetail_1 = __importDefault(require("../components/AfCFTAVendorDetail"));
const AfCFTARegionalOpportunities_1 = __importDefault(require("../components/AfCFTARegionalOpportunities"));
const AfCFTAOrderForm_1 = __importDefault(require("../components/AfCFTAOrderForm"));
const AfCFTAProductGrid_1 = __importDefault(require("../components/AfCFTAProductGrid"));
const AfCFTAProductList_1 = __importDefault(require("../components/AfCFTAProductList"));
const AfCFTAChatbot_1 = __importDefault(require("../components/AfCFTAChatbot"));
const AfCFTAHelpPage_1 = __importDefault(require("../components/AfCFTAHelpPage"));
const SubscribeForm_1 = __importDefault(require("../components/SubscribeForm"));
const ChatRoom_1 = __importDefault(require("../components/ChatRoom"));
require("../components/AfCFTAChatbot.css");
const ExampleTranslation_1 = __importDefault(require("../components/ExampleTranslation"));
require("../styles/afcfta-theme.css");
const Home_1 = __importDefault(require("../pages/Home"));
const App = () => {
    const [showChatbot, setShowChatbot] = (0, react_1.useState)(false);
    const toggleChatbot = () => {
        setShowChatbot((prev) => !prev);
    };
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-app-container", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/chatbot", element: (0, jsx_runtime_1.jsx)(AfCFTAChatbot_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/subscribe", element: (0, jsx_runtime_1.jsx)(SubscribeForm_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/chat/:roomId", element: (0, jsx_runtime_1.jsx)(ChatRoom_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/buyer-order/:productCode", element: (0, jsx_runtime_1.jsx)(AfCFTABuyerOrder_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/product-detail/:productCode", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAProductDetail_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor-detail/:vendorCode", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAVendorDetail_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/afcfta-tips", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTARegionalOpportunities_1.default, { productCategory: "All", userCountry: "Ghana" }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/afcfta-orderform", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAOrderForm_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/productgrid", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAProductGrid_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/product-list", element: (0, jsx_runtime_1.jsx)(AfCFTAProductList_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/help", element: (0, jsx_runtime_1.jsx)(AfCFTAHelpPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/exampletrans", element: (0, jsx_runtime_1.jsx)(ExampleTranslation_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(NotFound_1.default, {}) })] }), (0, jsx_runtime_1.jsx)("button", { className: "chatbot-toggle-btn", onClick: toggleChatbot, title: "Chat with us!", children: "\uD83D\uDCAC" }), showChatbot && (0, jsx_runtime_1.jsx)(AfCFTAChatbot_1.default, {})] }) }));
};
exports.default = App;
