import React, { ReactNode } from 'react';

interface SimpleContainerProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

const SimpleContainer: React.FC<SimpleContainerProps> = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: '#283618',
        padding: '1rem',
        borderRadius: '8px',
        color: 'white',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SimpleContainer;
