import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, message, Button } from 'antd';
import firebase from '../../utils/firebase'

const EditNameBio = ({ form, user }) => {
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);

  const { TextArea } = Input;
  useEffect(() => {
    form.getFieldDecorator('username', { initialValue: user && user.username });
    setUsername(user && user.username);
    form.getFieldDecorator('phone', { initialValue: user && user.phone });
    setPhone(user && user.phone);
    form.getFieldDecorator('adress', { initialValue: user && user.adress });
    setAdress(user && user.adress);
    form.getFieldDecorator('date', { initialValue: user && user.date });
    setAdress(user && user.date);

  }, []);

  const success = () => {
    message.success('Your Profile was update succesfully');
  };

  const error = () => {
    message.error('This is an error message');
  };

  const handleSave = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        setLoading(true);
        console.log('Received values of form: ', values);
        try {
          await firebase.updateInfo(username, adress, phone, date)
          setLoading(false);
          success()

        } catch (error) {
          console.log("FIrebase Error", error)
          error()
          setLoading(false)
        }

      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <FirstSection>
      <Form onSubmit={handleSave}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                // pattern: /^[a-zA-Z]*$/,
                // message: 'Must contain only letters'
              },
              {
                required: false,
                message: 'Please input your Username!'
              }
            ]
          })(
            <Input
              // value={user.first_name}
              placeholder={user && user.username}
              onChange={e => setUsername(e.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item label="Phone">
          {getFieldDecorator('phone', {
            rules: [
              {
                pattern: /^[0-9]*$/,
                message: 'Must contain only Numbers'
              },
              {
                required: false,
                message: 'Please input your Phone Number!'
              }
            ]
          })(
            <Input
              // value={user.first_name}
              placeholder={user && user.phone}
              onChange={e => setPhone(e.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item label="adress">
          {getFieldDecorator('adress', {
            rules: [
              {
                type: 'string',
                message: 'The input is not valid!'
              },
              {
                required: false,
                message: 'Please input your Adress!'
              }
            ]
          })(
            <Input
              // value={user.bio}
              placeholder={user && user.adress}
              onChange={e => setAdress(e.target.value)}
            />
          )}
        </Form.Item>

        <Form.Item label="date">
          {getFieldDecorator('date', {
            rules: [
              {
                type: 'string',
                message: 'The input is not valid!'
              },
              {
                required: false,
                message: 'Please input your Adress!'
              }
            ]
          })(
            <Input
              placeholder={user && user.date}
              onChange={e => setDate(e.target.value)}
            />
          )}
        </Form.Item>

        <Button
          type="primary"
          size="large"
          loading={loading}
          htmlType="submit"
        >
          Update Information
          </Button>
      </Form>
    </FirstSection>
  );

};
const WrappedRegistrationForm = Form.create({ name: 'register' })(EditNameBio);
export default WrappedRegistrationForm;

const FirstSection = styled.section`
  display: flex;
  justify-content: center;
  form {
    width: 50%;

    @media(max-width:700px){
      width: 100%;

    }
  }
  button {
    width: 100%;
  }
`;