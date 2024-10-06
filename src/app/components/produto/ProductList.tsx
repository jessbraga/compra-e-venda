import { Produto } from '@/core/model/Produto'
import ProductCard from './ProductCard'
import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'

export interface ProductListProps {
  products: Produto[]
  onClick?: (productChart: ProdutoCarrinho) => void
}

export default function ProductList({ products, onClick } : ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product: Produto) => {
        return <ProductCard key={product.codigo_produto} product={product} /** onClick={props.onClick} */ />
      })}
    </div>
  )
}