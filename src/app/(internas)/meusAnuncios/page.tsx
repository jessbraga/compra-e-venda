'use client'

import { PackagePlus } from 'lucide-react';
import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ProductList from '@/app/components/produto/ProductList'
import InnerPage from '@/app/components/template/InnerPage'
import Title from '@/app/components/template/Title'
import useProdutos from '@/app/data/hooks/useProdutos'

export default function Page() {
  const { produto, produtos, salvar, excluir, alterarProduto } = useProdutos()

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Meus Anúncios" secondary=""/>
      {produto ? (
        <FormularioProduto
          produto={produto}
          onChange={alterarProduto}
          salvar={salvar}
          cancelar={() => alterarProduto(null)}
          excluir={excluir}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white" 
              onClick={() => alterarProduto({})}
            >
              <PackagePlus/>
              <span>Cadastrar Produto</span>
            </button>
          </div>
          <ProductList products={produtos} onClick={alterarProduto}/>
        </>
      )}
    </InnerPage>
  )
}