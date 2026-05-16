import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Spinner } from './components/ui/shadcn-io/spinner';
import { ThemeProvider } from './components/theme/theme-provider';
import Layout from './layout/Layout';
import { queryClient } from './lib/queryClient';

const MissingList = lazy(() => import('./pages/MissingList'));
const MissingDetails = lazy(() => import('./pages/MissingDetails'));

const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: 'desaparecidos-mt-cache',
});

const App: React.FC = () => {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
                maxAge: 24 * 60 * 60 * 1000,
                buster: '1',
            }}
        >
            <Router>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Suspense fallback={
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Spinner variant="default" size={32} />
                        </div>
                    }>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<MissingList />} />
                                <Route path='/details/:id' element={<MissingDetails />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </ThemeProvider>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
    );
};

export default App;
