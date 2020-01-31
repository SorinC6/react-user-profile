import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../utils/AppProvider'
import firebase from '../../utils/firebase'
import { Tabs } from 'antd';
import EditInfo from './EditInfo'
import SecurityQuestionView from './SecurityQuestionsView'
const { TabPane } = Tabs;

const EditProfile = () => {
  function callback(key) {
    //console.log(key);
  }
  const { dispatch } = useContext(AppContext)
  useEffect(() => {
    firebase.getCurrentUserName() && firebase.getcurrentUserSecurityQuestions().then(val => {
      dispatch({ type: "SET_USER_SECURITY_QUESTIONS", payload: val })
    })
    firebase.getCurrentUserName() && firebase.getUserInfo().then(val => {
      dispatch({ type: "SET_USER_INFO", payload: val })
    })
  }, [])

  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="Edit Basic Info" key="1">
        <EditInfo />
      </TabPane>
      <TabPane tab="Edit Security Questions" key="2">
        <SecurityQuestionView />
      </TabPane>
    </Tabs>
  );
}

export default EditProfile