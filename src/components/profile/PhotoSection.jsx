import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    flex-direction: column;
  }
`;

const PhotoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.div`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  background: #eaeaea;
  overflow: hidden;
  background: cover;
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function PhotoSection({ imageUrl, username, date }) {
  return (
    <Wrapper>
      <PhotoWrapper>
        <Photo>
          <img src={imageUrl} alt="" height="100%" />
        </Photo>
      </PhotoWrapper>
      <TextWrapper>
        <h1>{username}</h1>
        <p>Date of Birth: {date}</p>
      </TextWrapper>
    </Wrapper>
  );
}

PhotoSection.propTypes = {};

export default PhotoSection;
