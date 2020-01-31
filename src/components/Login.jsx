
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { notification } from "antd";
import firebase from '../utils/firebase'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  let history = useHistory();
  const { getFieldDecorator } = props.form;


  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        try {
          const res = await firebase.login(values.email, values.password)
          console.log(res)
          history.push("/");
          return notification.success({
            message: "Success",
            description: "Login Successful"
          });
        } catch (error) {
          console.log(error.message)
          return notification.error({
            message: "Error",
            description: error.message
          });
        }
      }
    });
  };


  return (
    <Div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>

      </Form>
    </Div>
  );
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);


export default WrappedNormalLoginForm

const Div = styled.div`
  max-width: 300px;
  margin:0 auto;
  margin-top:0px;
  background:lightcyan;
  padding:20px;

`;