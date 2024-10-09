'use client'

import React, { useState } from 'react';
import InnerPage from '@/app/components/template/InnerPage';
import Title from '@/app/components/template/Title';
import ProductBuy from '@/app/components/produto/ProductBuy';

export default function Page() {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      name: 'Produto 1',
      status: 'disponível',
      imgSrc: 'https://m.media-amazon.com/images/I/61tZYCa32KL._AC_SX425_.jpg',
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Produto 2',
      status: 'indisponível',
      imgSrc: 'https://m.media-amazon.com/images/I/61tZYCa32KL._AC_SX425_.jpg',
      price: 49.99,
      quantity: 2,
    },
  ]);



  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Minhas compras" secondary="" />
      <ProductBuy products={produtos} />
    </InnerPage>
  );
}
