import { Produto } from "@/core/model/Produto";
import InputTexto from "../shared/InputTexto";

export interface FormularioProdutoProps {
    produto: Partial<Produto>
    onChange: (produto: Partial<Produto>) => void
    salvar: () => void
    cancelar: () => void
    excluir: () => void
}
  
export default function FormularioProduto (props: FormularioProdutoProps) {
    return(
        <div>
            <InputTexto label="Nome" type="text" value={props.produto.nome} 
            onChange={(e) => props.onChange?.({...props.produto, nome: e.target.value})}/>
            <div className="flex flex-col gap-5">
            <InputTexto label="Código" type="text" value={props.produto.codigo_produto?.toString()} 
            onChange={(e) => props.onChange?.({...props.produto, codigo_produto: parseInt(e.target.value)})}/>
            <InputTexto label="Descrição" type="text" value={props.produto.descricao} 
            onChange={(e) => props.onChange?.({...props.produto, descricao: e.target.value})}/>
            <InputTexto label="Valor" type="text" value={props.produto.valor?.toString()} 
            onChange={(e) => props.onChange?.({...props.produto, valor: parseFloat(e.target.value)})}/>
            <InputTexto label="Quantidade" type="text" value={props.produto.quantidade?.toString()} 
            onChange={(e) => props.onChange?.({...props.produto, quantidade: parseInt(e.target.value)})}/>
            <InputTexto label="Email" type="text" value={props.produto.email_vendedor} 
            onChange={(e) => props.onChange?.({...props.produto, email_vendedor: e.target.value})}/>
            <InputTexto label="Código Venda" type="text" value={props.produto.codigo_venda?.toString()} 
            onChange={(e) => props.onChange?.({...props.produto, codigo_venda: parseInt(e.target.value)})}/>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <button className="bg-zinc-500 px-4 py-2 rounded-md" onClick={props.salvar}>Salvar</button>
                    <button className="bg-zinc-500 px-4 py-2 rounded-md" onClick={props.cancelar}>Cancelar</button>
                    <button className="bg-zinc-500 px-4 py-2 rounded-md" onClick={props.excluir}>Excluir</button>
                </div>
            </div>
        </div>
    )
}