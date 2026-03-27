import React from 'react';
import RequesterSidebar from '@/components/requester/RequesterSidebar';
import Header from '@/components/shared/header/Header';



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <RequesterSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
