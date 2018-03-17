import React from 'react';
import { Layout } from 'antd';
import ProjectionList from './ProjectionList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Proyeksi</span>
    </Header>
    <Content className="page-content">
      <ProjectionList />
    </Content>
  </Layout>
);
