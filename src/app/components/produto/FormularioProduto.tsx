import { useState } from "react";
import { Product } from "@/core/model/Product";
import InputTexto from "../shared/InputTexto";
import ActionButton from "../shared/ActionButton";
import Notification from "../shared/Notification"; // Importa o componente de notificação
import { usePush } from "@/app/hooks/push";

export default function FormularioProduto() {
  const [productInfo, setProductInfo] = useState<Partial<Product>>({});
  const { loadData, isLoading } = usePush("/products");

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationError, setNotificationError] = useState(false);

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, type: string, field: string) => {
    let parsedNumber = 0;
    const value = e.target.value;

    switch (type) {
      case "int":
        parsedNumber = parseInt(value);
        break;
      case "float":
        parsedNumber = parseFloat(value);
        break;
    }

    if (!isNaN(parsedNumber)) {
      setProductInfo({ ...productInfo, [field]: parsedNumber });
    } else {
      setProductInfo({ ...productInfo, [field]: '' });
    }
  };

  const onCreateProduct = async () => {
    const response: any = await loadData(productInfo);
    if (!response.error) {
      setNotificationMessage("Produto cadastrado com sucesso");
      setNotificationError(false);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000);
      setProductInfo({}); 
    } else {
      setNotificationMessage("Falha ao cadastrar produto");
      setNotificationError(true);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <InputTexto 
          label="Nome" 
          type="text" 
          value={productInfo.name || ""}
          onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value }) }/>
        <InputTexto 
          label="Descrição" 
          type="text" 
          value={productInfo.description || ""}
          onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value }) }/>
        <InputTexto 
          label="Valor" 
          type="number" 
          step="0.01" 
          value={productInfo.price || ""}
          onChange={(e) => handleNumberInput(e, "float", "price") }/>
        <InputTexto 
          label="Quantidade" 
          type="text" 
          value={productInfo.stock || ""}
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
        </div>
      </div>
      <Notification
        message={notificationMessage}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </>
  );
}
