'use client'

import ProductList from './components/produto/ProductList'
import InnerPage from './components/template/InnerPage'
import Title from './components/template/Title'
import useProdutos from '@/app/data/hooks/useProdutos'

export default function Home() {

  const { produto, produtos, salvar, excluir, alterarProduto } = useProdutos()

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Produtos" secondary="Seja bem-vindo(a)!" />
      <ProductList products={produtos} onClick={alterarProduto} />
    </InnerPage>
  );
}
