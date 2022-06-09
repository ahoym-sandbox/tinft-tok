import styled from '@emotion/styled';
import logo from '../assets/logo.png';

const TopBar = styled.div`
  position: fixed;
  height: 48px;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;

export const TopNavigation = ({
  onViewChange,
}: {
  onViewChange: () => void;
}) => {
  return (
    <>
      <TopBar className="TopNavigation">
        <img alt="logo" src={logo} onClick={onViewChange} />
      </TopBar>
      <hr className="mt-10" />
    </>
  );
};
