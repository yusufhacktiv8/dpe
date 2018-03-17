import React from 'react';
import { Layout } from 'antd';
import BadList from './BadList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Piutang &amp; BAD</span>
    </Header>
    <Content className="page-content">
      <BadList />
    </Content>
  </Layout>
);
