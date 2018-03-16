import React from 'react';
import { Layout } from 'antd';
import ImageList from './ImageList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Images</span>
    </Header>
    <Content className="page-content">
      <ImageList />
    </Content>
  </Layout>
);
