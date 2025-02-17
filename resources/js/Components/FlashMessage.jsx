import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const FlashMessage = ({ message, type = 'success', duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!message) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(hideTimer);
    };
  }, [duration, message]);

  if (!message || !isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="max-w-md bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className={`font-medium ${
                type === 'success' ? 'text-emerald-900' : 'text-red-900'
              }`}>
                {type === 'success' ? 'Success' : 'Error'}
              </h3>
              <p className="text-gray-600 mt-1">{message}</p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div
            className={`h-full transition-all duration-100 ${
              type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlashMessage;