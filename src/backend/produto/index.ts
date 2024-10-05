import salvarProduto from "./salvarProduto"
import obterTodos from "./obterTodos"
import excluirProduto from "./excluirProduto"

export default class Backend {
    static readonly produtos = {
        salvar: salvarProduto,
        obter: obterTodos,
        excluir: excluirProduto,
    }
}