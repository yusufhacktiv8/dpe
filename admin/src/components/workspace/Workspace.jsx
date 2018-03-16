import React, { Component } from 'react';
import { Layout, Menu, Icon, Affix } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;
const SubMenu = Menu.SubMenu;

class Workspace extends Component {
  state = {
    selectedKeys: ['dashboard'],
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ backgroundColor: '#FFF', padding: 0, lineHeight: 1, height: 90 }}>
          <div style={{ width: '100%', height: 35, padding: 15, paddingTop: 17, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', border: '1px dotted silver', borderRadius: 50, padding: 7 }}>
              <Icon type="line-chart" style={{ marginRight: 5, color: 'gray', fontSize: 17 }} />
              <span style={{ color: 'gray' }}>Department of</span>
              <span style={{ color: 'gray' }}> Power Plant</span>
              <span style={{ color: 'gray' }}> and Energy &trade;</span>
            </span>
          </div>
          <Affix>
            <div>
              <Menu
                onClick={this.handleClick}
                selectedKeys={this.state.selectedKeys}
                mode="horizontal"
              >
                <Menu.Item key="dashboard">
                  <Link
                    to="/"
                    onClick={() => {
                      this.setState({
                        selectedKeys: ['dashboard'],
                      });
                    }}
                  ><Icon type="pie-chart" />Dashboard</Link>
                </Menu.Item>
                <SubMenu title={<span><Icon type="profile" />Projects</span>}>
                  <Menu.Item key="projects">
                    <Link
                      to="/projects"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['projects'],
                        });
                      }}
                    ><Icon type="profile" />Project List</Link>
                  </Menu.Item>
                  <Menu.Item key="projectProgresses">
                    <Link
                      to="/projectprogresses"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['projectProgresses'],
                        });
                      }}
                    ><Icon type="profile" />Project Progress</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span><Icon type="profile" />Finance</span>}>
                  <Menu.Item key="piutangs">
                    <Link
                      to="/piutangs"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['piutangs'],
                        });
                      }}
                    ><Icon type="profile" />Piutang</Link>
                  </Menu.Item>
                  <Menu.Item key="projections">
                    <Link
                      to="/projections"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['projections'],
                        });
                      }}
                    ><Icon type="profile" />Proyeksi</Link>
                  </Menu.Item>
                  <Menu.Item key="cashFlows">
                    <Link
                      to="/cashflows"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['cashFlows'],
                        });
                      }}
                    ><Icon type="profile" />Cash Flow</Link>
                  </Menu.Item>
                  <Menu.Item key="bads">
                    <Link
                      to="/bads"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['bads'],
                        });
                      }}
                    ><Icon type="profile" />Piutang &amp; BAD</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span><Icon type="lock" />Security</span>}>
                  <Menu.Item key="users">
                    <Link
                      to="/users"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['users'],
                        });
                      }}
                    ><Icon type="user" />Users</Link>
                  </Menu.Item>
                  <Menu.Item key="roles">
                    <Link
                      to="/roles"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['roles'],
                        });
                      }}
                    ><Icon type="idcard" />Roles</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span><Icon type="setting" />Settings</span>}>
                  <Menu.Item key="images">
                    <Link
                      to="/images"
                      onClick={() => {
                        this.setState({
                          selectedKeys: ['images'],
                        });
                      }}
                    ><Icon type="profile" />Images</Link>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <Link
                      to="/"
                      onClick={() => {
                        window.sessionStorage.removeItem('token');
                        window.location.href = '/';
                      }}
                    ><Icon type="logout" />Logout</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Affix>
        </Header>
        <Content style={{ backgroundColor: '#FFF' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default Workspace;
