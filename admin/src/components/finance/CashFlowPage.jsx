import React from 'react';
import { Layout } from 'antd';
import CashFlowList from './CashFlowList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Cash Flow</span>
    </Header>
    <Content className="page-content">
      <CashFlowList />
    </Content>
  </Layout>
);
