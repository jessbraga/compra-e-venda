"use server"

import { Produto } from "@/core/model/Produto";
import Id from "@/core/utils/id";
import RepositorioProduto from "./RepositorioProduto";

export default async function excluirProduto (codigo_produto: number) {
    RepositorioProduto.excluir(codigo_produto)
}