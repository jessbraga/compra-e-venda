'use client'

import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ProductList from '@/app/components/produto/ProductList'
import InnerPage from '@/app/components/template/InnerPage'
import Title from '@/app/components/template/Title'

export default function Page() {

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Minhas compras" secondary="" />
      {/* <ProductList products={produtos} onClick={alterarProduto} /> */}
    </InnerPage>
  )
}