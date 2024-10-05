import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'
import { InputNumber } from 'antd';
import Image from 'next/image'
import { Produto } from "@/core/model/Produto";
import InputTexto from "../shared/InputTexto";
import useProdutosCarrinho from '@/app/data/hooks/useProdutosCarrinho';
import { PrismaClient } from '@prisma/client/extension';
import Backend from '@/backend/produtoCarrinho';
import { useState } from 'react';

export interface LinhaProdutoProps {
    produto: Produto
    onClick?: (produto: Produto) => void
}


export default function LinhaProduto(props: LinhaProdutoProps) {

    let produtosCarrinho = []


    const produtoCarrinho =    
    {codigo_carrinho: 435,
    nome: props.produto.nome,
    codigo_produto: props.produto.codigo_produto,
    descricao: props.produto.descricao,
    valor: props.produto.valor,
    quantidade: props.produto.quantidade,
    email_cliente: "manoel.cabral@gmail.com",
    email_vendedor: props.produto.email_vendedor,
    codigo_venda: props.produto.codigo_venda};

    async function salvarCarrinho() {
        if (!produtoCarrinho) return
        const produtosCarrinhoReturn = await Backend.produtosCarrinho.obterCarrinho()
        produtosCarrinho = produtosCarrinhoReturn;
        await Backend.produtosCarrinho.salvarCarrinho(produtoCarrinho)
        produtosCarrinho.push(produtoCarrinho);
        console.log(produtosCarrinho)
        //setProdutosCarrinho(produtosCarrinho)
    }

    
    
    return (
        <div
            className="flex items-center gap-5 p-4 rounded-md cursor-pointer"
            style={{backgroundColor: "#F7EEE9"}}
            onClick={() => props.onClick?.(props.produto)}
        >
            <Image
                src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
                width={80}
                height={80}
                className="rounded-full"
                alt="Avatar"
            />
            <div className="flex flex-col">
                <span className="text-xl font-black">{props.produto.nome}</span>
                <span className="text-sm text-zinc-400">{props.produto.descricao}</span>
                <div className="flex justify-end">
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-md" style={{backgroundColor: "#ffece9"}}
                            onClick={salvarCarrinho}
                        >
                            +
                            <span>Adicionar ao carrinho</span>
                        </button>
                </div>
            </div>
        </div>
    )
}