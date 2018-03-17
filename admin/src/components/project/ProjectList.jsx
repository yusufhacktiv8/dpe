import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import constant from '../../constant';
import ProjectWindow from './ProjectWindow';

const PROJECTS_URL = `${constant.serverUrl}/api/projects`;
const Column = Table.Column;

class ProjectList extends Component {
  state = {
    searchText: '',
    selectedProject: {},
    projects: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    projectWindowVisible: false,
  }
  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    this.setState({
      loading: true,
    });
    axios.get(PROJECTS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          projects: response.data.rows,
          count: response.data.count,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        message.error(`Error: ${error.response.data}, status: ${error.response.status}`);
        this.setState({
          loading: false,
        });
      });
  }

  filterProjects() {
    this.setState({
      currentPage: 1,
    }, () => { this.getProjects(); });
  }

  saveProject(project) {
    const hide = message.loading('Action in progress..', 0);
    const { selectedProject } = this.state;
    if (this.state.selectedProject.id) {
      axios.put(`${PROJECTS_URL}/${selectedProject.id}`, project)
        .then(() => {
          hide();
          this.handleCancel();
          this.getProjects();
          message.success('Update project success');
        })
        .catch((error) => {
          hide();
          console.error(error);
          message.error(`Error: ${error.response.data}, status: ${error.response.status}`);
          this.setState({
            loading: false,
          });
        });
    } else {
      axios.post(PROJECTS_URL, project)
        .then(() => {
          hide();
          this.handleCancel();
          this.getProjects();
          message.success('Create project success');
        })
        .catch((error) => {
          hide();
          console.error(error);
          message.error(`Error: ${error.response.data}, status: ${error.response.status}`);
          this.setState({
            loading: false,
          });
        });
    }
  }

  deleteProject(project) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${PROJECTS_URL}/${project.id}`)
      .then(() => {
        hide();
        this.getProjects();
        message.success('Delete project success');
      })
      .catch((error) => {
        hide();
        console.error(error);
      });
  }

  openEditWindow(record) {
    this.setState({
      selectedProject: record,
      projectWindowVisible: true,
    });
  }

  handleCancel() {
    this.setState({
      projectWindowVisible: false,
    });
    this.projectWindow.resetFields();
  }

  handleCreate() {
    this.projectWindow.validateFields((err, values) => {
      if (err) {
        return;
      }

      // console.log('Received values of form: ', values);
      this.saveProject(values);
      this.projectWindow.resetFields();
      this.setState({ projectWindowVisible: false });
    });
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    }, () => { this.getProjects(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={this.state.searchText}
              onChange={(e) => {
                this.setState({
                  searchText: e.target.value,
                });
              }}
              placeholder="Code or name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => this.filterProjects()}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => this.openEditWindow({})}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.projects}
              style={{ marginTop: 20 }}
              rowKey="id"
              loading={this.state.loading}
              pagination={{
                total: this.state.count,
                current: this.state.currentPage,
                pageSize: this.state.pageSize,
              }}
              onChange={pagination => this.pageChanged(pagination.current)}
              size="small"
            >
              <Column
                title="Code"
                dataIndex="code"
                key="code"
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon="ellipsis"
                      size="small"
                      onClick={() => this.openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Popconfirm
                      title={`Are you sure delete project ${record.name}`}
                      onConfirm={() => this.deleteProject(record)}
                      okText="Yes" cancelText="No"
                    >
                      <Button
                        type="danger"
                        icon="delete"
                        size="small"
                      />
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <ProjectWindow
          visible={this.state.projectWindowVisible}
          onCreate={() => this.handleCreate()}
          onCancel={() => this.handleCancel()}
          project={this.state.selectedProject}
          ref={projectWindow => (this.projectWindow = projectWindow)}
        />
      </div>
    );
  }
}

export default ProjectList;
