

import React from 'react';
import { debounce } from 'lodash';

const AfCFTAOrderForm: React.FC = () => {
  return (
    <div className="order-form-container">
      <h1>Place Your Order</h1>
      {/* Buyer Contact Info */}
      <form>
        <label>
          Name:
          <input type="text" required />
        </label>
        <label>
          WhatsApp:
          <input type="tel" placeholder="+123456789" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="buyer@example.com" />
        </label>
        <label>
          Address:
          <textarea required></textarea>
        </label>

        {/* Cart Summary and Downloadable Receipt */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          {/* List items from cart */}
          <ul>
            {/* Placeholder for mapped items */}
            <li>Product A - 3 units</li>
          </ul>

          <button type="button">Download TXT Receipt</button>
          <button type="button">Download PDF Receipt</button>
        </div>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default AfCFTAOrderForm;