import salvarProdutoCarrinho from "./salvarProdutoCarrinho"
import obterTodos from "./obterTodos"
import excluirProdutoCarrinho from "./excluirProdutoCarrinho"

export default class Backend {
    static readonly produtosCarrinho = {
        salvarCarrinho: salvarProdutoCarrinho,
        obterCarrinho: obterTodos,
        excluirCarrinho: excluirProdutoCarrinho,
    }
}