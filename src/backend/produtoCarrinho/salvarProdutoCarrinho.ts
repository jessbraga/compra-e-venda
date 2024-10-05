"use server"

import { ProdutoCarrinho } from "@/core/model/ProdutoCarrinho";
import Id from "@/core/utils/id";
import RepositorioProduto from "./RepositorioProdutoCarrinho";

export default async function salvarProdutoCarrinho (produtoCarrinho: Partial<ProdutoCarrinho>) {
    const novoProdutoCarrinho = {
        ...produtoCarrinho,
        codigo_carrinho: produtoCarrinho.codigo_carrinho ?? Id.novo,
    }

    RepositorioProduto.salvar(novoProdutoCarrinho as ProdutoCarrinho)
}