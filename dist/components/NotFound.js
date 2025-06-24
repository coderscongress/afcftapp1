"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./NotFound.css"); // optional for styling
const NotFound = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "not-found-container", children: [(0, jsx_runtime_1.jsx)("img", { src: "/assets/404.png" // or use an external URL
                , alt: "Page Not Found", className: "not-found-image" }), (0, jsx_runtime_1.jsx)("h1", { children: "Oops! Page Not Found" }), (0, jsx_runtime_1.jsx)("p", { children: "The page you're looking for doesn't exist." }), (0, jsx_runtime_1.jsx)("a", { href: "/", className: "home-link", children: "Go Back Home" })] }));
};
exports.default = NotFound;
