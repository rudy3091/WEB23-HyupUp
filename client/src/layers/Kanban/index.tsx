import React from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanTodo from '@/components/KanbanTodo';

interface KanbanProps {
  projectId?: number;
}

const Kanban = ({ projectId }: KanbanProps) => {
  return (
    <Styled.Container>
      <Styled.Title>프로젝트 칸반보드</Styled.Title>
      <Styled.ColumnContainer>
        <KanbanTodo projectId={projectId} />
        <Styled.Column>
          <h4>In Progress</h4>
        </Styled.Column>
        <Styled.Column>
          <h4>Done</h4>
        </Styled.Column>
      </Styled.ColumnContainer>
    </Styled.Container>
  );
};

export default Kanban;