'use client'

import ListaProduto from '@/app/components/produto/ListaProduto'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import useProdutos from '@/app/data/hooks/useProdutos'

export default function Home() {

  const { produto, produtos, salvar, excluir, alterarProduto } = useProdutos()

  return (
    <Pagina className="flex flex-col gap-10">
      <Titulo principal="Produtos" secundario="Seja bem-vindo(a)!" />
      <>
        <ListaProduto produtos={produtos} onClick={alterarProduto} />
      </>
    </Pagina>
  );
}
