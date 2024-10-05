'use client'

//import { UserRound } from 'lucide-react';
import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ListaProduto from '@/app/components/produto/ListaProduto'
import Pagina from '@/app/components/template/Pagina'
import Titulo from '@/app/components/template/Titulo'
import useProdutos from '@/app/data/hooks/useProdutos'

export default function Page() {
    const { produto, produtos, salvar, excluir, alterarProduto } = useProdutos()

    return (
        <Pagina className="flex flex-col gap-10">
            <Titulo principal="Meus Anúncios" secundario="" />

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
                            className="flex items-center gap-2 px-4 py-2 rounded-md" style={{backgroundColor: "#ffece9"}}
                            onClick={() => alterarProduto({})}
                        >
                            +
                            <span>Cadastrar Produto</span>
                        </button>
                    </div>
                    <ListaProduto produtos={produtos} onClick={alterarProduto} />
                </>
            )}
        </Pagina>
    )
}