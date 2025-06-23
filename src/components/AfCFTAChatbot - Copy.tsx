
//AfCFTAChatbot.tsx

import i18n from 'i18next';
import '../i18n'; // <-- Important: this initializes i18next
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { afcftaProductListings } from '../data/AfCFTAProductListings';
import { afcftaVendorListings } from '../data/AfCFTAVendorListings';
import { productList } from '../data/productList';
import './AfCFTAChatbot.css';

const AfCFTAChatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { t } = useTranslation();
  
  
   useEffect(() => {
    const saved = localStorage.getItem('afcfta-chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('afcfta-chat', JSON.stringify(messages));
  }, [messages]);

  const safeJson = async (res: Response) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
  }
};

  const fetchTariffSearch = async (query: string): Promise<string> => {
    try {
      const res = await fetch(`/api/search/tariffs?q=${encodeURIComponent(query)}`);
      const data = await safeJson(res);
      if (!data.length) return t('noTariffsFound');
      return `${t('tariffs')}:\n${data.map((d: any) => `- ${d.category}: ${d.rate}%`).join('\n')}`;
    } catch (err) {
      console.error('Tariff search error:', err);
      return t('tariffSearchError');
    }
  };
  
  const fetchVendorSearch = async (query: string): Promise<string> => {
  const loweredQuery = query.toLowerCase().replace('vendor for', '').replace('vendors for', '').trim();

  // Try to find vendors whose productCode or description or company name loosely matches the query
  const matchedVendors = afcftaVendorListings.filter((vendor): vendor is typeof vendor => 
  vendor !== undefined &&
  (
    vendor.vendorCompanyName.toLowerCase().includes(loweredQuery) ||
    vendor.description?.toLowerCase().includes(loweredQuery) ||
    vendor.productCode.toLowerCase().includes(loweredQuery)
  )
);


  if (matchedVendors.length === 0) {
    return `❌ ${t('noVendorsFound')} "${loweredQuery}".`;
  }

  // Create a readable vendor listing string
  const result = matchedVendors.map(v => {
      return `🏢 ${v.vendorCompanyName} (${v.countryOfOrigin})
📦 ${t('maxStock')}: ${v.stockQuantityMax} ${v.productUnit}
💰 ${t('price')}: ${v.unitPrice.toLocaleString()} ${v.currencyCode}
📞 ${t('contact')}: ${v.phoneNumber}
📧 ${t('email')}: ${v.email}
🚚 ${t('delivery')}: ~${v.estimatedDeliveryTimeInDays} ${t('days')}
✅ ${t('compliant')}: ${v.afcftaRulesOfOriginCompliant ? t('yes') : t('no')}
📍 ${t('ports')}: ${v.availablePorts?.join(', ') || 'N/A'}
`;
    }).join('\n');

    return `🔎 ${t('vendorsFor')} "${loweredQuery}":\n\n${result}`;
  };


const fetchProductSearch = async (query: string): Promise<string> => {
  const loweredQuery = query.toLowerCase().replace('find product', '').replace('search product', '').trim();

  const matchedProducts = afcftaProductListings.filter(product =>
    product.productName.toLowerCase().includes(loweredQuery) ||
    product.productCategory.toLowerCase().includes(loweredQuery) ||
    product.description?.toLowerCase().includes(loweredQuery) ||
    product.productCode.toLowerCase().includes(loweredQuery)
  );

  if (matchedProducts.length === 0) {
    return `❌ ${t('noProductsFound')} "${loweredQuery}".`;
  }

  const result = matchedProducts.map(p => {
      return `🛍️ ${p.productName} (${p.productCategory})
🔢 ${t('code')}: ${p.productCode}
📝 ${p.description || t('noDescription')}
`;
    }).join('\n');

    return `📦 ${t('productsMatching')} "${loweredQuery}":\n\n${result}`;
  };


  const sendMessageToOpenAI = async (input: string): Promise<string> => {
    try {
      const res = await axios.post('/api/openai', { message: input }); 
      return res.data.reply;
    } catch (err) {
      console.error('OpenAI API error:', err);
      return '⚠️ OpenAI chatbot failed to respond.';
    }
  };

  const processMessage = async (input: string): Promise<string> => {
  const lowerInput = input.toLowerCase();

  const productNames = productList.map(p => p.name.toLowerCase());
  const isProductQuery = lowerInput.includes('product') || 
                         lowerInput.includes('find') || 
                         productNames.some(name => lowerInput.includes(name));

  const isTariffQuery = lowerInput.includes('tariff') ||
                        lowerInput.includes('duty') ||
                        lowerInput.includes('rate');
						
  const isVendorQuery = lowerInput.includes('vendor for') || lowerInput.includes('vendors for');

  if (isProductQuery) {
    return await fetchProductSearch(input);
  }

  if (isTariffQuery) {
    return await fetchTariffSearch(input);
  }
  
  if (isVendorQuery) {
    return await fetchVendorSearch(input); // You define this function
  }
  
  if (lowerInput.includes('product') || lowerInput.includes('find product') || lowerInput.includes('search product')) {
  return await fetchProductSearch(input);
}

  try {
    const res = await axios.post('/api/openai', { message: input });
    return res.data.reply;
  } catch (err) {
    console.error('Chatbot error:', err);
    return t('chatbotError');
  }
};

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = `👤 ${input}`;
    setMessages(prev => [...prev, userMsg]);

    const reply = await processMessage(input);
    setMessages(prev => [...prev, `🤖 ${reply}`]);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-container">
	<div className="chatbot-header">
        <h3>{t('chatbotTitle')}</h3>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)} defaultValue={i18n.language}>
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 French</option>
          <option value="sw">🌍 Swahili</option>
          <option value="yo">🗣️ Yoruba</option>
          <option value="ha">🗣️ Hausa</option>
          <option value="tw">🗣️ Twi</option>
        </select>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chatbot-msg">{msg}</div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder')}
        />
        <div className="chatbot-buttons">		
          <button onClick={sendMessage}>{t('send')}</button>
          <button onClick={() => setMessages([])}>{t('clear')}</button>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}>
          {i18n.language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AfCFTAChatbot;
