import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from './components/ui/shadcn-io/spinner';

// Implementando Lazy Loading para as páginas
const HomePage = lazy(() => import('./pages/PersonList'));
const DetailPage = lazy(() => import('./pages/PersonDetails'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner variant={'default'} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:uuid" element={<DetailPage />} />
          {/* Você pode adicionar uma rota para página 404 */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
