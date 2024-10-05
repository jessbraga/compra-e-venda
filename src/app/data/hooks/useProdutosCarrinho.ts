import Backend from '@/backend/produtoCarrinho'
import { ProdutoCarrinho } from '@/core/model/ProdutoCarrinho'
import { useEffect, useState } from 'react'

export default function useProdutosCarrinho() {
    const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutoCarrinho[]>([])
    const [produtoCarrinho, setProdutoCarrinho] = useState<Partial<ProdutoCarrinho> | null>(null)

    useEffect(() => {
        Backend.produtosCarrinho.obterCarrinho().then(setProdutosCarrinho)
    }, [])

    async function salvarCarrinho() {
        if (!produtoCarrinho) return
        await Backend.produtosCarrinho.salvarCarrinho(produtoCarrinho)
        const produtosCarrinho = await Backend.produtosCarrinho.obterCarrinho()
        setProdutosCarrinho(produtosCarrinho)
        setProdutoCarrinho(null)
    }

    async function excluirCarrinho() {
        if (!produtoCarrinho || !produtoCarrinho.codigo_venda) return
        await Backend.produtosCarrinho.excluirCarrinho(produtoCarrinho.codigo_produto??0)
        const usuarios = await Backend.produtosCarrinho.obterCarrinho()
        setProdutosCarrinho(produtosCarrinho)
        setProdutoCarrinho(null)
    }

    return {
        produtosCarrinho,
        produtoCarrinho,
        salvarCarrinho,
        excluirCarrinho,
        cancelarCarrinho: () => setProdutoCarrinho(null),
        alterarProduto: (produto: Partial<ProdutoCarrinho> | null) => setProdutoCarrinho(produto),
    }
}