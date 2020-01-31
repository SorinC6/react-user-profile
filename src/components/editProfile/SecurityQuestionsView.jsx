import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../utils/AppProvider'
import firebase from '../../utils/firebase'
import { Form, Icon, Input, Button, Collapse, message } from 'antd';
import styled from 'styled-components'

const { Panel } = Collapse;

const SecurityQuestionsView = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AppContext)
  const { userQuestions } = state
  const [question1, setQuestion1] = useState(userQuestions.question1)
  const [question2, setQuestion2] = useState(userQuestions.question2)
  const [question3, setQuestion3] = useState(userQuestions.question3)

  console.log(question3)

  useEffect(() => {
    form.getFieldDecorator('question1', { initialValue: question1 });
    form.getFieldDecorator('question2', { initialValue: question2 });
    form.getFieldDecorator('question3', { initialValue: question3 });
  }, []);

  function callback(key) {
    console.log(key);
  }

  const success = () => {
    message.success('Your Profile was update succesfully');
  };

  const error = () => {
    message.error('This is an error message');
  };

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        setLoading(true);
        console.log('Received values of form: ', values);
        try {
          await firebase.updateSecurityQuestions(values.question1, values.question2, values.question3)
          setLoading(false);
          success()

        } catch (error) {
          console.log("FIrebase Error", error)
          error()
          setLoading(false)
        }

      }
    });
  }
  return (
    <Root>
      <Form onSubmit={handleSubmit} className="security-form">
        <Collapse onChange={callback} defaultActiveKey={['1', '2', '3']}  >
          <Panel header="Sequrity Questios" key="1">
            <Collapse defaultActiveKey={['1', '2', '3']}>
              <Panel header="What is your favorite car?" key="1">
                <Form.Item>
                  {getFieldDecorator('question1', {
                    rules: [{ required: true, message: 'What is your favorite car?' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={question1}
                    />,
                  )}
                </Form.Item>
              </Panel>
              <Panel header="What is your favorite planet?" key="2">
                <Form.Item>
                  {getFieldDecorator('question2', {
                    rules: [{ required: true, message: 'What is your favorite planet?' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={question2}
                    />,
                  )}
                </Form.Item>
              </Panel>
              <Panel header="What is your favorite animal?" key="3">
                <Form.Item>
                  {getFieldDecorator('question3', {
                    rules: [{ required: true, message: 'What is your favorite animal?' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={question3}
                    />,
                  )}
                </Form.Item>
              </Panel>
            </Collapse>
          </Panel>
        </Collapse>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>

    </Root>
  )
}


const WrappedNormalSecurityForm = Form.create({ name: 'normal_login' })(SecurityQuestionsView);

export default WrappedNormalSecurityForm

const Root = styled.main`
  width:50%;
  margin:0 auto;
`