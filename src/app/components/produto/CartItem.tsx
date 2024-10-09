import React from 'react';
import { Trash } from 'lucide-react';

interface CartItemProps {
  id: number;
  name: string;
  status: string;
  imgSrc: string;
  price: number;
  selected: boolean;
  quantity: number;
  onToggleSelect: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export default function CartItem({
  id,
  name,
  status,
  imgSrc,
  price,
  selected,
  quantity,
  onToggleSelect,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(id)}
        />
        <img src={imgSrc} alt={name} className="w-16 h-16 object-cover rounded" />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">Status: {status}</p>
          <div className="flex items-center space-x-2 mt-1">
            <button onClick={() => onUpdateQuantity(id, -1)} className="bg-gray-200 p-1 rounded-md" aria-label="Decrease quantity">-</button>
            <span>{quantity}</span>
            <button onClick={() => onUpdateQuantity(id, 1)} className="bg-gray-200 p-1 rounded-md" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-red-600 hover:text-red-800 transition-colors"
        aria-label="Remove item"
      >
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
}
