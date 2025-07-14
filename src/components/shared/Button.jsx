import React from 'react';

const Button = ({ type = 'navigate', label, onClick, disabled = false }) => {
  const getButtonClass = () => {
    switch (type) {
      case 'complete':
        return 'btn-complete';
      case 'navigate':
        return 'btn-navigate';
      case 'fail':
        return 'btn-fail';
      default:
        return 'btn-navigate';
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-sm ${getButtonClass()}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;