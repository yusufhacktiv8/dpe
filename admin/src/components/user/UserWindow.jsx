import React from 'react';
import { Modal, Form, Input } from 'antd';
import RoleSelect from '../role/RoleSelect';

const FormItem = Form.Item;

const UserWindow = ({ visible, onCancel, onCreate, form, user }) => {
  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      title="User"
      okText="Save"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Username">
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [
              { required: true, message: 'Please input username' },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('password', {
            initialValue: user.password,
            rules: [
              { required: true, message: 'Please input password' },
            ],
          })(
            <Input type="password" />,
          )}
        </FormItem>
        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: user.name,
            rules: [
              { required: true, message: 'Please input name' },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="Role">
          {getFieldDecorator('role', {
            initialValue: (user.Role || {}).id,
            rules: [
              { required: true, message: 'Please input role' },
            ],
          })(
            <RoleSelect />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(UserWindow);
