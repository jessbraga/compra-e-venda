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
        <h5 className="text-lg font-semibold text-center">{product.nome}</h5>
        <p className="text-gray-500 text-center">R$ {product.valor}</p>
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
          <>
            <div className="pt-4 flex">
              <Image
                src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
                width={80}
                height={80}
                className="hidden lg:flex md:w-96 md:h-96 mr-4"
                alt={product.nome}
              />
              <div className="max-h-96 w-auto text-pretty overflow-y-auto">
                <div className="flex flex-col mb-2">
                  <h3 className="text-xl font-medium">{product.nome}</h3>
                  <p className="text-md text-gray-500">R$ {product.valor}</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">Código:</span>
                  <p className="text-gray-700">{product.codigo_produto}</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">Estoque:</span>
                  <p className="text-gray-700">{product.quantidade} un.</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">E-mail do Vendedor:</span>
                  <p className="text-gray-700">{product.email_vendedor}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span>Descrição:</span>
                  <p className="text-gray-700 break-words">{product.descricao}</p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}