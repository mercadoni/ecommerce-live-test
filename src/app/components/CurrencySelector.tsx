import { ChevronDown } from "lucide-react";
import { useState } from "react";

const currencies = [
  {
    code: 'USD', symbol: '$', flag: '🇺🇸', name: 'United States Dollar'
  },
  {
    code: 'COP', symbol: '₡', flag: '🇨🇴', name: 'Colombian Peso'
  }
];

export default function CurrencySelector({ selectedCurrency, onCurrencyChange }: { selectedCurrency: { code: string, symbol: string, flag: string, name: string }, onCurrencyChange: (currency: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{selectedCurrency.symbol}</span>
        <span className="text-white font-medium text-sm">{selectedCurrency.code}</span>
        <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed top-12 right-0 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors duration-200 ${selectedCurrency.code === currency.code ? 'bg-blue-100' : ''
                }`}
              onClick={() => {
                onCurrencyChange(currency.code);
                setIsOpen(false);
              }}
            >
              <span className="text-lg">{currency.symbol}</span>
              <div className="text-left">
                <div className="font-medium text-gray-800">{currency.code}</div>
                <div className="text-xs text-gray-500">{currency.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}