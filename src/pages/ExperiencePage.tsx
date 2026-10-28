import React, { ReactNode } from 'react';
import PageLayout from '../components/PageLayout';
import Experience from '../components/Experience';
import { experience } from '../data';

function ExperiencePage(): ReactNode {
  return (
    <PageLayout uri='/experience'>
      <Experience experience={experience} />
    </PageLayout>
  );
}

const MemoizedExperiencePage = React.memo(ExperiencePage);
export default MemoizedExperiencePage;
