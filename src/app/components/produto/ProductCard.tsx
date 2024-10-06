import { useState } from 'react';
import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'
import { InputNumber } from 'antd';
import Image from 'next/image'
import { Produto } from "@/core/model/Produto";
import InputTexto from "../shared/InputTexto";
import useProdutosCarrinho from '@/app/data/hooks/useProdutosCarrinho';
import { PrismaClient } from '@prisma/client/extension';
import Backend from '@/backend/produtoCarrinho';
import { ShoppingCart } from 'lucide-react';
import Modal from '../shared/Modal';

export interface ProductCardProps {
  product: Produto
  onClick?: (product: Produto) => void
}

export default function ProductCard({ product, onClick } : ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  let produtosCarrinho = []

  const produtoCarrinho = {
    codigo_carrinho: 435,
    nome: product.nome,
    codigo_produto: product.codigo_produto,
    descricao: product.descricao,
    valor: product.valor,
    quantidade: product.quantidade,
    email_cliente: "manoel.cabral@gmail.com",
    email_vendedor: product.email_vendedor,
    codigo_venda: product.codigo_venda
  };

  async function salvarCarrinho() {
    if (!produtoCarrinho) return
    const produtosCarrinhoReturn = await Backend.produtosCarrinho.obterCarrinho()
    produtosCarrinho = produtosCarrinhoReturn;
    await Backend.produtosCarrinho.salvarCarrinho(produtoCarrinho)
    produtosCarrinho.push(produtoCarrinho);
    console.log(produtosCarrinho)
    //setProdutosCarrinho(produtosCarrinho)
  }

  const onHandleModal = () => setModalOpen(!modalOpen)

  return (
    <div
      className="flex flex-col items-center w-full h-35 bg-white shadow-sm border border-gray-300 rounded-md"
      onClick={() => onClick?.(product)}
    >
      <Image
        src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
        width={80}
        height={80}
        className="w-full max-h-60"
        alt="Avatar"
      />
      <div className="flex w-full flex-col gap-2 p-4 mb-2">
        <h5 className="font-black text-center">{product.nome}</h5>
        <p className="text-gray-500 text-center">R$ {product.valor}</p>
        {/* <p className="text-gray-500 max-h-36 overflow-auto text-start break-words">{product.descricao}</p> */}
        <div className="flex flex-row gap-2 justify-end">
          <button
            className="flex items-center justify-center w-full gap-2 py-2 border border-black rounded-md hover:bg-black hover:text-white"
            onClick={onHandleModal}
          >
            Detalhes
          </button>
          <button
            className="flex items-center justify-center p-3 rounded-full border border-black hover:bg-black hover:text-white"
          >
            <ShoppingCart size={18}/>
          </button>
        </div>
      </div>
      <Modal
        title="Detalhes do Produto"
        isOpen={modalOpen}
        onClose={onHandleModal}
        content={
          <p>teste</p>
        }
      />
    </div>
  )
}