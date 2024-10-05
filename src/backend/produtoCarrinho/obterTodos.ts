"use server"

import { ProdutoCarrinho } from "@/core/model/ProdutoCarrinho";
import Id from "@/core/utils/id";
import RepositorioProdutoCarrinho from "./RepositorioProdutoCarrinho";

export default async function obterTodos () {
    return RepositorioProdutoCarrinho.obterTodos()
}