
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { notification } from "antd";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, message, Upload, Collapse } from 'antd';
import firebase from '../utils/firebase'

const { Panel } = Collapse;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}



const Register = (props) => {
  // const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImgUrl] = useState("")
  const [image, setImage] = useState('');
  let history = useHistory();

  const { getFieldDecorator } = props.form;


  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      console.log(values.password, values.email)
      if (!err) {
        console.log('Received values of form: ', values);
        try {
          await firebase.register(values.email, values.password, values.username)
          await firebase.addUserInformation(values.username, values.phone, values.adress, values.date, image)
          await firebase.addScurityQuestions(values.question1, values.question2, values.question3)
          history.push("/");
          return notification.success({
            message: "Success",
            description: "Register Successful"
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

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {

      handleImageUpload(info.file.originFileObj)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false)
        setImgUrl(imageUrl)
      }

      );
    }
  };

  const handleImageUpload = async (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "geoApp");
    data.append("cloud_name", "dhsegkn40");
    const result = await axios.post(
      "https://api.cloudinary.com/v1_1/dhsegkn40/image/upload",
      data
    );
    setImage(result.data.url);
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );


  function callback(key) {
    console.log(key);
  }


  return (
    <Div>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} className="login-form">

        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone Number!' }],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="number"
              placeholder="Phone Number"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('adress', {
            rules: [{ required: true, message: 'Please input your Adress!' }],
          })(
            <Input
              prefix={<Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Adress"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please input your date of birth!' }],
          })(
            <Input
              prefix={<Icon type="plus" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="date"
              placeholder="Date of Birth"
            />,
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('image', {
            rules: [{ required: true, message: 'Please input your date of birth!' }],
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="center"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>,
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
          Or <Link to="/login">login now!</Link>
        </Form.Item>
        <Collapse onChange={callback}>
          <Panel header="Sequrity Questios" key="1">
            <Collapse defaultActiveKey="1">
              <Panel header="What is your favorite car?" key="1">
                <Form.Item>
                  {getFieldDecorator('question1', {
                    rules: [{ required: true, message: 'What is your favorite car?' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="sequeity question 1"
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
                      placeholder="sequeity question 2"
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
                      placeholder="sequeity question 3"
                    />,
                  )}
                </Form.Item>
              </Panel>
            </Collapse>
          </Panel>
        </Collapse>
      </Form>
    </Div>
  );
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_login' })(Register);


export default WrappedNormalRegisterForm

const Div = styled.div`
  max-width: 300px;
  margin:0 auto;
  margin-top:0px;
  background:lightcyan;
  padding:20px;

`;