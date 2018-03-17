import React, { Component } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Table, Button, Input, Row, Col, message } from 'antd';
import constant from '../../constant';

const PROJECTIONS_URL = `${constant.serverUrl}/api/projections`;
const Column = Table.Column;

class ProjectionList extends Component {
  state = {
    searchText: '',
    projections: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
  }
  componentDidMount() {
    this.getProjections();
  }

  getProjections() {
    this.setState({
      loading: true,
    });
    axios.get(PROJECTIONS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          projections: response.data.rows,
          count: response.data.count,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          message.error(`Error: ${error.response.data}, status: ${error.response.status}`);
        } else {
          message.error(error.message);
        }
        this.setState({
          loading: false,
        });
      });
  }

  filterProjections() {
    this.setState({
      currentPage: 1,
    }, () => { this.getProjections(); });
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    }, () => { this.getProjections(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              disabled
              value={this.state.searchText}
              onChange={(e) => {
                this.setState({
                  searchText: e.target.value,
                });
              }}
              placeholder=""
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => this.filterProjections()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.projections}
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
                title="PDP"
                dataIndex="pdp"
                key="pdp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Tagihan Bruto"
                dataIndex="tagihanBruto"
                key="tagihanBruto"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Usaha"
                dataIndex="piutangUsaha"
                key="piutangUsaha"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Retensi"
                dataIndex="piutangRetensi"
                key="piutangRetensi"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectionList;
