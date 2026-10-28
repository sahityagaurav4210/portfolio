import React, { ReactNode } from 'react';
import PageLayout from '../components/PageLayout';
import Skills from '../views/Skills';

function SkillsPage(): ReactNode {
  return (
    <PageLayout uri='/skills'>
      <Skills />
    </PageLayout>
  );
}

const MemoizedSkillsPage = React.memo(SkillsPage);
export default MemoizedSkillsPage;
