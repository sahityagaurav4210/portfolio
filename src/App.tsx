import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OfflinePage from './pages/OfflinePage';
import HomePage from './pages/HomePage';
import HireMePage from './pages/HireMePage';

function App(): ReactNode {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/offline' element={<OfflinePage />} />
          <Route path='/hiring' element={<HireMePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
