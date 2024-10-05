import { Produto } from "@/core/model/Produto";
import { PrismaClient } from "@prisma/client";

export default class RepositorioProduto {
    private static db: PrismaClient = new PrismaClient()


    static async listar () {
        return await this.db.produtoAVenda.findMany()
    }

    static async salvar (produto: Produto): Promise<Produto> {
        return await this.db.produtoAVenda.upsert({
            where: {codigo_produto: produto.codigo_produto},
            update: produto,
            create: produto,
        })
    }

    static async obterTodos(): Promise<Produto[]>  {
        return await this.db.produtoAVenda.findMany()
    }

    static async obterPorId(codigo_produto: number): Promise<Produto> {
        const produto = await this.db.produtoAVenda.findUnique({
            where: { codigo_produto },
        })
        return produto as Produto
    }

    static async excluir(codigo_produto: number) {
        const produto = await this.db.produtoAVenda.delete({where: { codigo_produto },})
        return produto as Produto
    }
}