'use client'

import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ProductList from '@/app/components/produto/ProductList'
import InnerPage from '@/app/components/template/InnerPage'
import Title from '@/app/components/template/Title'
import useProdutos from '@/app/data/hooks/useProdutos'

export default function Page() {
  const { produto, produtos, salvar, excluir, alterarProduto } = useProdutos()

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Minhas compras" secondary="" />
      <ProductList products={produtos} onClick={alterarProduto} />
    </InnerPage>
  )
}