import React, { useEffect, useContext } from 'react'
import { AppContext } from '../utils/AppProvider'
import firebase from '../utils/firebase'
import ProfileView from './profile/ProfileView'
import { notification } from "antd";


const UserProfile = ({ history }) => {
  // const [userDetail, setUserDetail] = useState(null)
  // const [securityQuestion, setSequerityQuestions] = useState(null)
  const { dispatch } = useContext(AppContext)
  useEffect(() => {
    firebase.getCurrentUserName() && firebase.getcurrentUserSecurityQuestions().then(val => {
      dispatch({ type: "SET_USER_SECURITY_QUESTIONS", payload: val })
    })
    firebase.getCurrentUserName() && firebase.getUserInfo().then(val => {
      dispatch({ type: "SET_USER_INFO", payload: val })
    })
  }, [dispatch])

  if (!firebase.getCurrentUserName()) {
    // not logged in
    notification.success({
      message: "Please Login",
      description: "This Page will be available after login"
    });
    history.replace('/login')
    return null
  }
  return (
    <div>
      <p>User Profile</p>
      <ProfileView />
    </div>
  )
}

export default UserProfile