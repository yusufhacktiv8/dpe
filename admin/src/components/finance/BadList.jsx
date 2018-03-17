import React, { Component } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Table, Button, Input, Row, Col, message } from 'antd';
import constant from '../../constant';

const BADS_URL = `${constant.serverUrl}/api/bads`;
const Column = Table.Column;

class BadList extends Component {
  state = {
    searchText: '',
    bads: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
  }
  componentDidMount() {
    this.getBads();
  }

  getBads() {
    this.setState({
      loading: true,
    });
    axios.get(BADS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          bads: response.data.rows,
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

  filterBads() {
    this.setState({
      currentPage: 1,
    }, () => { this.getBads(); });
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    }, () => { this.getBads(); });
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
                onClick={() => this.filterBads()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.bads}
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
                title="Piutang Usaha"
                dataIndex="piutangUsaha"
                key="piutangUsaha"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Tagihan Bruto"
                dataIndex="tagihanBruto"
                key="tagihanBruto"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Retensi"
                dataIndex="piutangRetensi"
                key="piutangRetensi"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="PDP"
                dataIndex="pdp"
                key="pdp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="BAD"
                dataIndex="bad"
                key="bad"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BadList;
