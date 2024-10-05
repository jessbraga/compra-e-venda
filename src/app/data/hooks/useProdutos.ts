import Backend from '@/backend/produto'
import { Produto } from '@/core/model/Produto'
import { useEffect, useState } from 'react'

export default function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produto, setProduto] = useState<Partial<Produto> | null>(null)

    useEffect(() => {
        Backend.produtos.obter().then(setProdutos)
    }, [])

    async function salvar() {
        if (!produto) return
        await Backend.produtos.salvar(produto)
        const produtos = await Backend.produtos.obter()
        setProdutos(produtos)
        setProduto(null)
    }

    async function excluir() {
        if (!produto || !produto.codigo_venda) return
        await Backend.produtos.excluir(produto.codigo_produto??0)
        const usuarios = await Backend.produtos.obter()
        setProdutos(produtos)
        setProduto(null)
    }

    return {
        produtos,
        produto,
        salvar,
        excluir,
        cancelar: () => setProduto(null),
        alterarProduto: (produto: Partial<Produto> | null) => setProduto(produto),
    }
}