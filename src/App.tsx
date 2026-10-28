import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OfflinePage from './pages/OfflinePage';
import HomePage from './pages/HomePage';
import HireMePage from './pages/HireMePage';
import SkillsPage from './pages/SkillsPage';
import ContactMePage from './pages/ContactMePage';
import ProjectPage from './pages/ProjectPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';

function App(): ReactNode {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/projects' element={<ProjectPage />} />
          <Route path='/experience' element={<ExperiencePage />} />
          <Route path='/education' element={<EducationPage />} />
          <Route path='/offline' element={<OfflinePage />} />
          <Route path='/hiring' element={<HireMePage />} />
          <Route path='/skills' element={<SkillsPage />} />
          <Route path='/contact-me' element={<ContactMePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
