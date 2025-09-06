import Header from '@/components/PageHeader';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <div className="min-h-screen bg-background">
            <Toaster position="top-center" />
            {!isHomePage && <Header />}
            <main className="px-4 py-8">
                {children ? children : <Outlet />}
            </main>
           
        </div>
    );
};

export default Layout;