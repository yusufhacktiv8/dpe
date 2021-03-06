import React from 'react';
import { Layout } from 'antd';
import ProjectProgressList from './ProjectProgressList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Project Progresses</span>
    </Header>
    <Content className="page-content">
      <ProjectProgressList />
    </Content>
  </Layout>
);
