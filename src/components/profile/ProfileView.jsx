import React, { useContext } from 'react';
import { AppContext } from '../../utils/AppProvider'
import styled from 'styled-components';
import PhotoSection from './PhotoSection';
import Bio from './Bio';

const Container = styled.main`
    width: 100%;
`;

function Profile() {
  const { state } = useContext(AppContext)
  const { userInfo } = state
  return (
    <Container>
      <PhotoSection imageUrl={userInfo && userInfo.image} username={userInfo && userInfo.username} date={userInfo && userInfo.date} />
      <Bio phone={userInfo && userInfo.phone} adress={userInfo && userInfo.adress} />
    </Container>
  );
}
Profile.propTypes = {

};

export default Profile