import React, { useEffect, useState } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmText = 'Confirmer',
  cancelText = 'Annuler'
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <>
      {/* Overlay avec animation */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-50 ${
          isVisible ? 'bg-opacity-40' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Contenu de la popin avec animation */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className={`bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out max-w-md w-full mx-auto ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* En-tête de la popin */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>

          {/* Corps de la popin */}
          <div className="px-6 py-4">
            {children ? children : message && <p className="text-gray-600">{message}</p>}
          </div>

          {/* Pied de la popin */}
          {onConfirm && (
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-4">
              <Button
                text={cancelText}
                color="secondary"
                variant="outline"
                onClick={onClose}
              />
              <Button
                text={confirmText}
                color="danger"
                onClick={onConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
} 