import { ProdutoCarrinho } from "@/core/model/ProdutoCarrinho";
import { PrismaClient } from "@prisma/client";

export default class RepositorioProdutoCarrinho {
    private static db: PrismaClient = new PrismaClient()


    static async listar () {
        return await this.db.produtoAVenda.findMany()
    }

    static async salvar (produtoCarrinho: ProdutoCarrinho): Promise<ProdutoCarrinho> {
        return await this.db.produtoNoCarrinho.upsert({
            where: {codigo_carrinho: produtoCarrinho.codigo_carrinho},
            update: produtoCarrinho,
            create: produtoCarrinho,
        })
    }

    static async obterTodos(): Promise<ProdutoCarrinho[]>  {
        return await this.db.produtoNoCarrinho.findMany()
    }

    static async obterPorId(codigo_carrinho: number): Promise<ProdutoCarrinho> {
        const produtoCarrinho = await this.db.produtoNoCarrinho.findUnique({
            where: { codigo_carrinho },
        })
        return produtoCarrinho as ProdutoCarrinho
    }

    static async excluir(codigo_carrinho: number) {
        const produtoCarrinho = await this.db.produtoNoCarrinho.delete({where: { codigo_carrinho },})
        return produtoCarrinho as ProdutoCarrinho
    }
}