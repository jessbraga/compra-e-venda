"use server"

import { Produto } from "@/core/model/Produto";
import Id from "@/core/utils/id";
import RepositorioProduto from "./RepositorioProduto";

export default async function obterTodos () {
    return RepositorioProduto.obterTodos()
}