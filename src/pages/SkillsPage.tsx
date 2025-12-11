import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { menuItems } from "../data";
import Footer from "../components/Footer";
import Skills from "../views/Skills";

function SkillsPage(): ReactNode {
  return (
    <>
      <Navbar
        menuItems={menuItems}
        url={`${import.meta.env.VITE_BACKEND_BASE_URL}/baas/files/download-cv`}
        disabled
      />

      <Skills />

      <Footer />
    </>
  );
}

export default React.memo(SkillsPage);