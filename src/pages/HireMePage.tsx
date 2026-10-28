import React, { ReactNode } from 'react';
import PageLayout from '../components/PageLayout';
import HireMe from '../views/HireMe';

function HireMePage(): ReactNode {
  return (
    <PageLayout uri='/hiring'>
      <HireMe />
    </PageLayout>
  );
}

const MemoizedHireMePage = React.memo(HireMePage);
export default MemoizedHireMePage;
