import React from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 p-4 bg-black text-white rounded-lg shadow-lg w-96"> 
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button className="ml-4 text-sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
