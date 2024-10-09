import { useState } from "react";
import { Product } from "@/core/model/Product";
import InputTexto from "../shared/InputTexto";
import ActionButton from "../shared/ActionButton";
import { usePush } from "@/app/hooks/push"

export default function FormularioProduto() {
  const [productInfo, setProductInfo] = useState<Partial<Product>>({})

  const { loadData, isLoading } = usePush("/products")

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, type: string, field: string) => {
    let parsedNumber = 0;
    const value = e.target.value

    switch (type) {
      case "int":
        parsedNumber = parseInt(value)
        break
      case "float":
        parsedNumber = parseFloat(value)
        break
    }

    console.log(value)

    if (!isNaN(parsedNumber)) {
      console.log(parsedNumber)
      setProductInfo({ ...productInfo, [field]: parsedNumber })
    } else {
      setProductInfo({ ...productInfo, [field]: '' });
    }
  };

  const onCreateProduct = async () => {
    const response: any = await loadData(productInfo)
    if (!response.error) {
      window.alert("Produto cadastrado com sucesso")
      location.reload()
    } else {
      window.alert("Falha ao cadastrar produto")
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <InputTexto label="Nome" type="text" value={productInfo.name}
          onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value }) }/>
        <InputTexto label="Descrição" type="text" value={productInfo.description}
          onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value }) }/>
        <InputTexto label="Valor" type="text" value={productInfo.price}
          onChange={(e) => handleNumberInput(e, "float", "price") }/>
        <InputTexto label="Quantidade" type="text" value={productInfo.stock}
          onChange={(e) => handleNumberInput(e, "int", "stock") }/>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <ActionButton 
            title="Salvar" 
            onClick={onCreateProduct} 
            isLoading={isLoading} 
            extraStyle="flex flex-row justify-center items-center gap-2 mt-4 px-4"
          />
          {/* <ActionButton 
            title="Excluir" 
            onClick={() => {}} 
            extraStyle="flex flex-row justify-center items-center gap-2 mt-4 px-4"
          /> */}
        </div>
      </div>
    </>
  )
}