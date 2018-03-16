import React from 'react';
import { Layout } from 'antd';
import ProjectList from './ProjectList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Projects</span>
    </Header>
    <Content className="page-content">
      <ProjectList />
    </Content>
  </Layout>
);
