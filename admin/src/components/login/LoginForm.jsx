import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import axios from 'axios';

import constant from '../../constant';

const FormItem = Form.Item;

const LOGIN_URL = `${constant.serverUrl}/api/security/signin`;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(LOGIN_URL, values)
          .then((response) => {
            const token = response.data.token;
            if (typeof (Storage) !== 'undefined') {
              window.sessionStorage.setItem('token', token);
              window.location.href = '/';
            } else {
                alert('Sorry! No Web Storage support..');
            }
          })
          .catch((err2) => {
            let errorMessage = '';
            if (err2.response) {
              if (err2.response.status === 403) {
                errorMessage = 'Wrong username or password';
              } else {
                errorMessage = `Status: ${err2.response.status}`;
              }
            } else {
              errorMessage = err2.message;
            }
            notification.error({
              message: 'Login Problem',
              description: errorMessage,
            });
          });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div style={{ width: 145, marginLeft: 'auto', marginRight: 'auto', marginBottom: 30 }}>
          <span style={{ fontSize: 14, fontWeight: 'bold', color: '#5093E1', border: '1px dotted silver', borderRadius: 50, padding: 8 }}>
            <span style={{ color: '#5093E1' }}>DPE Dashboard</span>
          </span>
        </div>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
        <div style={{ color: 'silver', fontSize: 12 }}>
          Department Power Plant and Energy. © DPE 2018. All rights reserved.
        </div>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);
