import LinhaUsuario from './LinhaProdutoCarrinho'
import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'

export interface ListaProdutoProps {
    produtosCarrinho: ProdutoCarrinho[]
    onClick?: (produtoCarrinho: ProdutoCarrinho) => void
}

export default function ListaProdutoCarrinho(props: ListaProdutoProps) {
    return (
        <div className="flex flex-col gap-4">
            {props.produtosCarrinho.map((produtoCarrinho: ProdutoCarrinho) => {
                return <LinhaUsuario key={produtoCarrinho.codigo_produto} produto={produtoCarrinho} /** onClick={props.onClick} */ />
            })}
        </div>
    )
}