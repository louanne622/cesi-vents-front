'use client';

import { FaTimes } from 'react-icons/fa'; 
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  duration?: number;
}

export default function Toast({ message, type = 'error', duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
        type === 'error'
          ? 'bg-red-50 border-red-200 text-red-700'
          : 'bg-green-50 border-green-200 text-green-700'
      } ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex items-center">
        <div className="flex-1">
          {message}
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
