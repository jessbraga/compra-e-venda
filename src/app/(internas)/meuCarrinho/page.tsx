'use client'

import React, { useState, useEffect } from 'react';
import InnerPage from '@/app/components/template/InnerPage';
import Title from '@/app/components/template/Title';
import CartItem from '@/app/components/produto/CartItem';
import CartSummary from '@/app/components/produto/CartSummary';
import { useFetch } from '@/app/hooks/fetch';

interface Item {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
  quantity: number;
  selected?: boolean; // Para seleção no frontend
}

export default function MyCart() {
  const userId = 1; // substituir pelo ID do usuário logado, se houver
  const { data: cartItems, isLoading } = useFetch<Item[]>(`/cart?userId=${userId}`);
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems.map(item => ({ ...item, selected: false }))); // Inicializa como não selecionado
    }
  }, [cartItems]);

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  const toggleSelectItem = (id: number) => {
    setCart(cart.map((item) =>
      item.product.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    setCart(cart.map((item) => ({ ...item, selected: !allSelected })));
  };

  // Função para calcular o total levando em conta quantidade e preço
  const totalSelected = cart
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map((item) =>
      item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Meu carrinho" secondary="" />
      <div className="w-full bg-white shadow p-4 rounded-lg mb-4">
        {cart.length === 0 ? (
          <p>Carrinho vazio.</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.product.id}
              id={item.product.id}
              name={item.product.name}
              status={item.product.stock > 0 ? 'Disponível' : 'Indisponível'}
              imgSrc={`https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA`} 
              price={item.product.price}
              selected={item.selected || false}
              quantity={item.quantity}
              onToggleSelect={toggleSelectItem}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))
        )}
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
