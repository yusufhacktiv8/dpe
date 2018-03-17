import React from 'react';
import { Layout } from 'antd';
import PiutangList from './PiutangList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Umur Piutang</span>
    </Header>
    <Content className="page-content">
      <PiutangList />
    </Content>
  </Layout>
);
