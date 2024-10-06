import { Produto } from '@/core/model/Produto'
import LinhaUsuario from './LinhaProduto'
import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'

export interface ProductListProps {
  products: Produto[]
  onClick?: (productChart: ProdutoCarrinho) => void
}

export default function ProductList({ products, onClick } : ProductListProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product: Produto) => {
        return <LinhaUsuario key={product.codigo_produto} produto={product} /** onClick={props.onClick} */ />
      })}
    </div>
  )
}