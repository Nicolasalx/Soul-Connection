import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="bg-white border text-black rounded-small p-12">
      {children}
    </div>
  );
};

export default ContentWrapper;
