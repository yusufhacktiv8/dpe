import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col } from 'antd';
import constant from '../../constant';
import numeral from 'numeral';

const PROJECT_PROGRESSES_URL = `${constant.serverUrl}/api/projectprogresses`;
const Column = Table.Column;

class ProjectProgressList extends Component {
  state = {
    searchText: '',
    roles: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
  }
  componentDidMount() {
    this.getProjectProgresss();
  }

  getProjectProgresss() {
    this.setState({
      loading: true,
    });
    axios.get(PROJECT_PROGRESSES_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          roles: response.data.rows,
          count: response.data.count,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  filterProjectProgresss() {
    this.setState({
      currentPage: 1,
    }, () => { this.getProjectProgresss(); });
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    }, () => { this.getProjectProgresss(); });
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
                onClick={() => this.filterProjectProgresss()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.roles}
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
                title="Project Code"
                dataIndex="Project.code"
                key="Project.code"
              />
              <Column
                title="Month"
                dataIndex="month"
                key="month"
              />
              <Column
                title="Year"
                dataIndex="year"
                key="year"
              />
              <Column
                title="RKAP OK"
                dataIndex="rkapOk"
                key="rkapOk"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="RKAP OP"
                dataIndex="rkapOp"
                key="rkapOp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="RKAP LK"
                dataIndex="rkapLk"
                key="rkapLk"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Prognosa OK"
                dataIndex="prognosaOk"
                key="prognosaOk"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Prognosa OP"
                dataIndex="prognosaOp"
                key="prognosaOp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Prognosa LK"
                dataIndex="prognosaLk"
                key="prognosaLk"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Realisasi OK"
                dataIndex="realisasiOk"
                key="realisasiOk"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Realisasi OP"
                dataIndex="realisasiOp"
                key="realisasiOp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Realisasi LK"
                dataIndex="realisasiLk"
                key="realisasiLk"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectProgressList;
