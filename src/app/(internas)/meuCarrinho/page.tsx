'use client'

import React, { useState } from 'react';
import InnerPage from '@/app/components/template/InnerPage';
import Title from '@/app/components/template/Title';
import CartItem from '@/app/components/produto/CartItem';
import CartSummary from '@/app/components/produto/CartSummary';

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
        {cart.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            status={item.status}
            imgSrc={item.imgSrc}
            price={item.price}
            selected={item.selected}
            quantity={item.quantity}
            onToggleSelect={toggleSelectItem}
            onRemove={removeItem}
            onUpdateQuantity={updateQuantity}
          />
        ))}
        <CartSummary
          total={totalSelected}
          selectedCount={cart.filter((item) => item.selected).length}
          onToggleSelectAll={toggleSelectAll}
          allSelected={cart.every((item) => item.selected)}
        />
      </div>
    </InnerPage>
  );
}
