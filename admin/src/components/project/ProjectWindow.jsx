import React from 'react';
import { Modal, Form, Input } from 'antd';
import ProjectTypeSelect from './ProjectTypeSelect';

const FormItem = Form.Item;

const ProjectWindow = ({ visible, onCancel, onCreate, form, project }) => {
  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      title="Project"
      okText="Save"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Code">
          {getFieldDecorator('code', {
            initialValue: project.code,
            rules: [
              { required: true, message: 'Please input code' },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: project.name,
            rules: [
              { required: true, message: 'Please input name' },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="Project Type">
          {getFieldDecorator('projectType', {
            initialValue: (project.ProjectType || {}).id,
            rules: [
              { required: true, message: 'Please input project type' },
            ],
          })(
            <ProjectTypeSelect />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(ProjectWindow);
