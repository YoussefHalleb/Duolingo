import React from 'react';
import './Button.css';

const Button = ({ type = 'navigate', label, onClick, disabled = false, className = '' }) => {
  const baseStyles = 'px-7 py-2.5 rounded-lg font-medium text-base text-white border-none transition-background cursor-pointer shadow-sm';
  const typeStyles = {
    complete: `bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${disabled ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`,
    navigate: `bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 ${disabled ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`,
    failed: `bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${disabled ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`,
  };

  return (
    <button
      className={`${baseStyles} ${typeStyles[type] || typeStyles.navigate} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;