'use client'

//import { UserRound } from 'lucide-react';
import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ListaProduto from '@/app/components/produto/ListaProduto'
import ListaProdutoCarrinho from '@/app/components/produtoCarrinho/ListaProdutoCarrinho'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import useProdutos from '@/app/data/hooks/useProdutosCarrinho'

export default function Page() {
    const { produtoCarrinho, produtosCarrinho, salvarCarrinho, excluirCarrinho, alterarProduto } = useProdutos()

    return (
        <Pagina className="flex flex-col gap-10">
            <Titulo principal="Meus Anúncios" secundario="" />


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

        </Pagina>
    )
}