import React, { useState } from 'react';
import Notification from '../shared/Notification'; 

interface CartSummaryProps {
  total: number;
  selectedCount: number;
  onToggleSelectAll: () => void;
  allSelected: boolean;
}

export default function CartSummary({
  total,
  selectedCount,
  onToggleSelectAll,
  allSelected,
}: CartSummaryProps) {
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handlePurchase = () => {
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <button
        onClick={onToggleSelectAll}
        className="text-blue-600 hover:text-blue-800 transition-colors mb-2"
      >
        {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
      </button>
      <div className="flex justify-between text-lg font-semibold">
        <span>Total estimado</span>
        <span>R${total.toFixed(2)}</span>
      </div>
      <button
        className="w-full mt-4 border border-black rounded-md hover:bg-black hover:text-white transition-colors"
        disabled={selectedCount === 0}
        onClick={handlePurchase} 
      >
        Comprar ({selectedCount})
      </button>

      <Notification
        message="Compra efetuada com sucesso"
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </div>
  );
}
