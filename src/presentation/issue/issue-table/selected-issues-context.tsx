import { Issue } from '@/services/issue/issue';
import { ReactNode, createContext, useContext, useState } from 'react';

interface SelectedIssuesContextType {
  selectedIssueIds: Issue['id'][];
  toggleIssueSelection: (id: Issue['id']) => void;
  selectAllIssues: (ids: Issue['id'][]) => void;
  deselectAllIssues: () => void;
}

interface SelectedIssusProviderProps {
  children: ReactNode;
}

const SelectedIssuesContext = createContext<SelectedIssuesContextType>(null!);

export const SelectedIssuesProvider = ({
  children,
}: SelectedIssusProviderProps) => {
  const [selectedIssueIds, setSelectedIssueIds] = useState<Issue['id'][]>([]);

  const toggleIssueSelection = (id: Issue['id']) => {
    if (selectedIssueIds.includes(id)) {
      const filteredIssues = selectedIssueIds.filter(
        (issueId) => issueId !== id
      );
      setSelectedIssueIds(filteredIssues);
    } else {
      setSelectedIssueIds([...selectedIssueIds, id]);
    }
  };

  const selectAllIssues = (ids: Issue['id'][]) => {
    setSelectedIssueIds(ids);
  };

  const deselectAllIssues = () => {
    setSelectedIssueIds([]);
  };

  return (
    <SelectedIssuesContext.Provider
      value={{
        selectedIssueIds,
        toggleIssueSelection,
        selectAllIssues,
        deselectAllIssues,
      }}
    >
      {children}
    </SelectedIssuesContext.Provider>
  );
};

export const useSelectedIssues = () => {
  const context = useContext(SelectedIssuesContext);
  if (context === undefined)
    throw new Error(
      'SelectedIssuesContext가 SelectedIssuesProvider외부에서 사용됨 '
    );

  return context;
};
