import { Produto } from '@/core/model/Produto'
import LinhaUsuario from './LinhaProduto'
import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'

export interface ListaProdutoProps {
    produtos: Produto[]
    onClick?: (produtoCarrinho: ProdutoCarrinho) => void
}

export default function ListaProduto(props: ListaProdutoProps) {
    return (
        <div className="flex flex-col gap-4">
            {props.produtos.map((produto: Produto) => {
                return <LinhaUsuario key={produto.codigo_produto} produto={produto} /** onClick={props.onClick} */ />
            })}
        </div>
    )
}