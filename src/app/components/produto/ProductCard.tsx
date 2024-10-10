import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import Modal from '../shared/Modal';
import { Product } from '@/core/model/Product';
import ActionButton from '../shared/ActionButton';
import { usePush } from '@/app/hooks/push';

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  toBuy?: boolean;
}

export default function ProductCard({ product, onClick, toBuy } : ProductCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onHandleModal = (): void => setModalOpen(!modalOpen);

  // Hook para adicionar o produto ao carrinho
  const { loadData: addToCart, isLoading } = usePush(`/cart`, 'POST');

  const handleAddToCart = async () => {
    const payload = {
      userId: 1, // O ID do usuário pode ser obtido de um contexto ou estado global
      productId: product.id,
      price: product.price,
      quantity: 1, // Pode ser alterado conforme necessário
    };

    const response = await addToCart(payload);
    if (response?.error) {
      console.error('Erro ao adicionar ao carrinho:', response.error);
    } else {
      console.log('Produto adicionado ao carrinho:', response);
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full h-35 bg-white shadow-sm border border-gray-300 rounded-md"
      onClick={() => onClick?.(product)}
    >
      <Image
        src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
        width={80}
        height={80}
        className="w-full max-h-60"
        alt="Avatar"
      />
      <div className="flex w-full flex-col gap-2 p-4 mb-2">
        <h5 className="text-lg font-semibold text-center">{product.name}</h5>
        <p className="text-gray-500 text-center">R$ {product.price}</p>
        <div className="flex flex-row gap-2 justify-end">
          <ActionButton 
            title="Detalhes" 
            onClick={onHandleModal} 
            extraStyle="flex items-center justify-center w-full gap-2"
          />
          {toBuy ?? (
            <button
              className="flex items-center justify-center p-3 rounded-full border border-black hover:bg-black hover:text-white"
              onClick={handleAddToCart} 
              disabled={isLoading} 
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
      <Modal
        title="Detalhes do Produto"
        isOpen={modalOpen}
        onClose={onHandleModal}
        content={
          <>
            <div className="pt-4 flex">
              <Image
                src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
                width={80}
                height={80}
                className="hidden lg:flex md:w-96 md:h-96 mr-4"
                alt={product.name}
              />
              <div className="max-h-96 w-auto text-pretty overflow-y-auto">
                <div className="flex flex-col mb-2">
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <p className="text-md text-gray-500">R$ {product.price}</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">Código:</span>
                  <p className="text-gray-700">{product.id}</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">Estoque:</span>
                  <p className="text-gray-700">{product.stock} un.</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">E-mail do Vendedor:</span>
                  <p className="text-gray-700">{product.userEmail}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span>Descrição:</span>
                  <p className="text-gray-700 break-words">{product.description}</p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
