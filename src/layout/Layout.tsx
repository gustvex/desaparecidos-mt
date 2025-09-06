import Header from '@/components/theme/page-header';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background">
            <Toaster position="top-center" />
            <Header />
            <main className="px-4 py-8">
                {children ? children : <Outlet />}
            </main>

        </div>
    );
};

export default Layout;