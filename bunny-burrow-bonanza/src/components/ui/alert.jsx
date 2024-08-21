import React from 'react';

export const Alert = ({ children, variant = 'default', className = '' }) => {
  return (
    <div className={`p-4 rounded-md ${variant === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => {
  return <h5 className="font-medium mb-1">{children}</h5>;
};

export const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};