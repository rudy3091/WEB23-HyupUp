import React, { useEffect, useState } from 'react';
import produce from 'immer';
import { Modal } from '@/lib/design';
import Styled from '@/components/ProjectModal/style';
import { useInput } from '@/lib/hooks';
import { ProjectType } from '@/types/project';
import { UserInfoWithProject } from '@/types/users';
import SearchBar from '@/lib/design/SearchBar';
import TeamManagementItem from '@/components/TeamManagementItem';
import { useRecoilState } from 'recoil';
import { userListAtom } from '@/recoil/user';

type ProjectModalProps = {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectType;
};

const ProjectModal = ({ showProjectModal, setShowProjectModal, project }: ProjectModalProps) => {
  const [userListState, setUserListState] = useRecoilState(userListAtom);
  const [renderUsers, setRenderUsers] = useState<UserInfoWithProject[]>([]);
  const { value, onChange } = useInput('');
  useEffect(() => {
    if (value.length === 0) {
      setRenderUsers(userListState);
      return;
    }
    setRenderUsers(userListState.filter((item) => new RegExp(value, 'i').test(item.name)));
  }, [userListState, value]);
  return (
    <Modal
      title={project.name}
      shouldConfirm={false}
      visible={showProjectModal}
      onClose={() => setShowProjectModal(false)}
      size="LARGE"
    >
      <Styled.ContentWrapper>
        <SearchBar
          color="gray"
          value={value}
          placeholder="찾으시는 팀원의 이름을 입력하세요."
          onChange={onChange}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
        <Styled.UserList>
          {renderUsers.map((user) => (
            <TeamManagementItem
              key={user.index}
              imageURL={user.imageURL}
              name={user.name}
              job={user.job}
              admin={user.admin}
            >
              <Styled.Button
                isMinus={user.projects.findIndex((elem) => elem.id === project.id) >= 0}
              />
            </TeamManagementItem>
          ))}
        </Styled.UserList>
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default ProjectModal;
