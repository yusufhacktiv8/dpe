import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const ImageWindow = ({ visible, onCancel, onCreate, form, image }) => {
  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      title="Image"
      okText="Save"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Code">
          {getFieldDecorator('code', {
            initialValue: image.code,
            rules: [
              { required: true, message: 'Please input code' },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: image.name,
            rules: [
              { required: true, message: 'Please input name' },
            ],
          })(
            <Input />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(ImageWindow);
