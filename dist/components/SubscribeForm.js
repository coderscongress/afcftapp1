"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../i18n"); // <-- Important: this initializes i18next
const react_i18next_1 = require("react-i18next");
const react_1 = require("react");
require("./SubscribeForm.css");
const SubscribeForm = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [status, setStatus] = (0, react_1.useState)('idle');
    const { t } = (0, react_i18next_1.useTranslation)();
    const handleSubscribe = async () => {
        if (!email.includes('@')) {
            setStatus('error');
            return;
        }
        try {
            // Example API call - replace with your backend/mail service
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            setStatus('success');
            setEmail('');
        }
        catch (err) {
            setStatus('error');
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "afcfta-pro", children: (0, jsx_runtime_1.jsx)("div", { className: "afcfta-pro-content", children: (0, jsx_runtime_1.jsxs)("div", { className: "subscribe-container", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uD83D\uDD14 Stay Updated" }), (0, jsx_runtime_1.jsx)("p", { children: "Subscribe for trade updates, new vendors & exclusive deals" }), (0, jsx_runtime_1.jsxs)("div", { className: "subscribe-inputs", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "your@email.com", value: email, onChange: (e) => setEmail(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSubscribe, children: t('subscribeLabel') })] }), status === 'success' && (0, jsx_runtime_1.jsx)("p", { className: "success-msg", children: "\uD83C\uDF89 You're subscribed!" }), status === 'error' && (0, jsx_runtime_1.jsx)("p", { className: "error-msg", children: "\u26A0\uFE0F Please enter a valid email." })] }) }) }));
};
exports.default = SubscribeForm;
