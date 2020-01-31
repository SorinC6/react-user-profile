import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const BioSection = styled.div`
  position: absolute;
  top: -40px;
  box-sizing: border-box;
  width: 650px;
  max-width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 1rem 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  p {
    word-break: break-all;
  }
`;

const Location = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    display: flex;
    align-items: center;
  }
  i {
    padding-top: 0px;
    margin-right: 10px;
  }
`;

const Social = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 10px;
    height: 35px;
    width: 60%;
    border-radius: 50%;
    display: flex;
    border: none;
    background: none;
    align-items: center;
    justify-content: center;
    color: #484848;
    cursor: pointer;
  }
  button:hover {
    color: #000;
  }
  i {
    margin-top: 5px;
    margin-left: 1px;
    font-size: 18px;
  }
`;

function Bio({ phone, adress }) {
  return (
    <Wrapper>
      <BioSection>
        <Location>
          <div>
            <Icon type="phone" />
            {phone}
          </div>
          <div>
            <Icon type="global" />
            {adress}
          </div>
        </Location>
        <h1>Bio</h1>
        <p>No other information about this user for the moment</p>
        <Social>
          <Link to="/edit">
            <Button type="danger">Edit Your Profile</Button>
          </Link>
        </Social>
      </BioSection>
    </Wrapper>
  );
}

Bio.propTypes = {
};

export default Bio;