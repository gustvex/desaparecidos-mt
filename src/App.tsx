import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from './components/ui/shadcn-io/spinner';
import { ThemeProvider } from './components/theme/theme-provider';
import Layout from './layout/Layout';

const MissingList = lazy(() => import('./pages/MissingList'));
const MissingDetails = lazy(() => import('./pages/MissingDetails'));
const MissingInfo = lazy(() => import('./pages/MissingInfo'));

const App: React.FC = () => {
  return (
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
              <Route path='/details/form/:id' element={<MissingInfo />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};

export default App;