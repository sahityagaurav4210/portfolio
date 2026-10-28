import React, { ReactNode } from 'react';
import PageLayout from '../components/PageLayout';
import Contact from '../views/Contact';

function ContactMePage(): ReactNode {
  return (
    <PageLayout uri='/contact-me'>
      <Contact />
    </PageLayout>
  );
}

const MemoizedContactMePage = React.memo(ContactMePage);
export default MemoizedContactMePage;
