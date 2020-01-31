import React, { useContext } from 'react'
import { AppContext } from '../utils/AppProvider'
import firebase from '../utils/firebase'
import Svg from '../assets/hero.svg'
import styled from 'styled-components'
import MainContent from './MainContent'
import { notification } from "antd";


const Home = ({ history }) => {

  if (!firebase.getCurrentUserName()) {
    // not logged in
    //alert('Please login first')
    notification.success({
      message: "Please Login",
      description: "This Page will be available after login"
    });
    history.replace('/login')
    return null
  }

  return (
    <Root>
      <img src={Svg} alt="hero" />
      <h1>Welcome {firebase.getCurrentUserName()}</h1>
      <MainContent />
    </Root>
  )
}

export default Home

const Root = styled.main`
  h1{
    text-align:center;
    margin-top:40px;
  }
`