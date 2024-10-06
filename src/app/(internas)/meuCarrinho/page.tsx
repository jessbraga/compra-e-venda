'use client'

import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import InnerPage from '@/app/components/template/InnerPage';
import Title from '@/app/components/template/Title';

interface Item {
  id: number;
  name: string;
  status: string;
  imgSrc: string;
  price: number;
  selected: boolean;
  quantity: number; 
}

export default function MyCart() {
  const [cart, setCart] = useState<Item[]>([
    {
      id: 1,
      name: 'K-04 Keycaps Keyboard, Classic Retro Transparent',
      status: 'disponível',
      imgSrc: 'https://m.media-amazon.com/images/I/61tZYCa32KL._AC_SX425_.jpg',
      price: 150.0,
      selected: false,
      quantity: 1,
    },
    {
      id: 2,
      name: 'K-04 Keycaps Keyboard, Classic Retro Transparent',
      status: 'disponível',
      imgSrc: 'https://m.media-amazon.com/images/I/61tZYCa32KL._AC_SX425_.jpg',
      price: 150.0,
      selected: false,
      quantity: 1,
    },
  ]);

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const toggleSelectItem = (id: number) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    setCart(cart.map((item) => ({ ...item, selected: !allSelected })));
  };

  const totalSelected = cart
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Meu carrinho" secondary="" />
      <div className="w-full bg-white shadow p-4 rounded-lg mb-4">
        <button
          onClick={toggleSelectAll}
          className="text-blue-600 hover:text-blue-800 transition-colors mb-2"
        >
          {cart.every((item) => item.selected) ? 'Desmarcar todos' : 'Selecionar todos'}
        </button>

        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelectItem(item.id)}
              />
              <img src={item.imgSrc} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Status: {item.status}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-200 p-1 rounded-md " aria-label="Decrease quantity">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-200 p-1 rounded-md" aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Remove item"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        ))}

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total estimado</span>
            <span>R${totalSelected.toFixed(2)}</span>
          </div>
          <button
            className="w-full mt-4 border border-black rounded-md hover:bg-black hover:text-white transition-colors"
            disabled={cart.every((item) => !item.selected)}
          >
            Continue ({cart.filter((item) => item.selected).length})
          </button>
        </div>
      </div>
    </InnerPage>
  );
}
