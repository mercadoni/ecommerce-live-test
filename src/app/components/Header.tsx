"use client";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { type Cart } from "@/api/types";
import CartPopup from "./CartPopup";
import CurrencySelector from "./CurrencySelector";

export default function Header({
  cart,
  clearCartAction,
}: {
  cart: Cart;
  clearCartAction: () => Promise<Cart>;
}) {
  const [showCart, setShowCart] = useState(false);
  const [selectedCurrency, setCurrency] = useState({ code: "USD", symbol: "$", flag: "🇺🇸", name: "United States Dollar" });

  return (
    <header className="relative mx-2 p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 mb-10 shadow-2xl rounded-b-3xl overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main header content */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Logo/Title Section */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <span className="text-2xl">🍩</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent hover:from-yellow-200 hover:to-white transition-all duration-300 cursor-pointer">
              Donuts & Dragoons
            </h1>
            <p className="text-blue-200 text-sm font-medium tracking-wide">
              Magical Treats & Epic Adventures
            </p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">

          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={(currency) => setCurrency({ code: currency, symbol: "$", flag: "🇺🇸", name: "United States Dollar" })}
          />
          {/* Cart Button */}
          <div className="relative">
            <button
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 group"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="w-6 h-6 text-white group-hover:animate-bounce" />

              {/* Cart Count Badge */}
              {cart.products.length > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-xs font-bold text-white">
                    {cart.products.length}
                  </span>
                </div>
              )}

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-200 blur-lg"></div>
            </button>

            {/* Cart Popup */}
            {showCart && (
              <CartPopup
                cart={cart}
                clearCartAction={clearCartAction}
                onClose={() => setShowCart(false)}
                selectedCurrency={selectedCurrency}
              />
            )}
          </div>
        </div>
      </div>
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}
