import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  size = 'md', 
  className = '', 
  type = 'button',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        rounded-md font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
