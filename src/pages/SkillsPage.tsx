import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { menuItems } from '../data';
import Footer from '../components/Footer';
import Skills from '../views/Skills';

function SkillsPage(): ReactNode {
  return (
    <>
      <Navbar menuItems={menuItems} />

      <Skills />

      <Footer />
    </>
  );
}

export default React.memo(SkillsPage);
