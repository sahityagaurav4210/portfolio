import React, { ReactNode } from 'react';
import PageLayout from '../components/PageLayout';
import Education from '../components/Education';
import { education } from '../data';

function EducationPage(): ReactNode {
  return (
    <PageLayout uri='/education'>
      <Education education={education} />
    </PageLayout>
  );
}

const MemoizedEducationPage = React.memo(EducationPage);
export default MemoizedEducationPage;
