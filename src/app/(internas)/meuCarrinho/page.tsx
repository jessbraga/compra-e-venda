'use client'

//import { UserRound } from 'lucide-react';
import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ListaProdutoCarrinho from '@/app/components/produtoCarrinho/ListaProdutoCarrinho'
import InnerPage from '@/app/components/template/InnerPage'
import Title from '@/app/components/template/Title'
import useProdutos from '@/app/data/hooks/useProdutosCarrinho'

export default function Page() {
  const { produtoCarrinho, produtosCarrinho, salvarCarrinho, excluirCarrinho, alterarProduto } = useProdutos()

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Meus Anúncios" secondary="" />
        <>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md" style={{backgroundColor: "#ffece9"}}
              onClick={() => alterarProduto({})}
            >
              +
              <span>Cadastrar Produto</span>
            </button>
          </div>
          <ListaProdutoCarrinho produtosCarrinho={produtosCarrinho} onClick={alterarProduto} />
        </>
    </InnerPage>
  )
}