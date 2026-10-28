import React, { ReactNode, useCallback, useState } from 'react';
import PageLayout from '../components/PageLayout';
import Projects from '../components/Projects';
import { IProjects } from '../interfaces/IProjects';
import usePages from '../hooks/usePages';
import { ISkillsPageState } from '../interfaces/ISkills';
import { UseStateFunction } from '../types';

function ProjectPage(): ReactNode {
  const [projects, setProjects] = useState<Array<IProjects>>([]);
  const { fetchProjects } = usePages();

  const handleInit = useCallback(
    (setApiResponses: UseStateFunction<ISkillsPageState>) => {
      return fetchProjects(setApiResponses, setProjects);
    },
    [fetchProjects]
  );

  return (
    <PageLayout uri='/projects' onInit={handleInit}>
      {({ setApiResponses }) => (
        <Projects
          projects={projects}
          fetchProjects={fetchProjects}
          setApiResponses={setApiResponses}
          setProjects={setProjects}
        />
      )}
    </PageLayout>
  );
}

const MemoizedProjectPage = React.memo(ProjectPage);
export default MemoizedProjectPage;
