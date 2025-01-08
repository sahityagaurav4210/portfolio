import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OfflinePage from './pages/OfflinePage';
import HomePage from './pages/HomePage';

function App(): ReactNode {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/offline' element={<OfflinePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
