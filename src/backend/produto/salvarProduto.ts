"use server"

import { Produto } from "@/core/model/Produto";
import Id from "@/core/utils/id";
import RepositorioProduto from "./RepositorioProduto";

export default async function salvarProduto (produto: Partial<Produto>) {
    const novoProduto = {
        ...produto,
        codigo_produto: produto.codigo_produto ?? Id.novo,
    }

    RepositorioProduto.salvar(novoProduto as Produto)
}