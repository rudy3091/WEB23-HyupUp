import { Styled } from '@/components/Profile/style';
import React, { useState, useRef } from 'react';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import { useSocketSend } from '@/lib/hooks';

const Profile = () => {
  const [openState, setOpenState] = useState(false);
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const toggleDropDown = () => setOpenState((openState) => !openState);
  const handleOutClick = () => setOpenState((openState) => !openState);
  const emitLogout = useSocketSend('LOGOUT');
  const handleLogout = () => {
    emitLogout(userState.id);
    userDispatch({ type: 'LOGOUT' });
    location.pathname = '/'; // TODO: 세션 제거 로직 필요
  };
  const ref = useRef(null);

  useOutSideClick(ref, handleOutClick);
  return (
    <Styled.Profile>
      <section onClick={toggleDropDown}></section>
      {openState && (
        <div className="list-container" ref={ref}>
          <ul className="dropdown-list">
            <li>이름</li>
            <li className="logout" onClick={handleLogout}>
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </Styled.Profile>
  );
};

export default Profile;