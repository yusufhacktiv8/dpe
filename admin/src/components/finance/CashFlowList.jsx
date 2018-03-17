import React, { Component } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Table, Button, Input, Row, Col, message } from 'antd';
import constant from '../../constant';

const CASH_FLOWS_URL = `${constant.serverUrl}/api/cashflows`;
const Column = Table.Column;

class CashFlowList extends Component {
  state = {
    searchText: '',
    cashFlows: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
  }
  componentDidMount() {
    this.getCashFlows();
  }

  getCashFlows() {
    this.setState({
      loading: true,
    });
    axios.get(CASH_FLOWS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          cashFlows: response.data.rows,
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

  filterCashFlows() {
    this.setState({
      currentPage: 1,
    }, () => { this.getCashFlows(); });
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    }, () => { this.getCashFlows(); });
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
                onClick={() => this.filterCashFlows()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.cashFlows}
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
                title="Type Code"
                dataIndex="CashFlow.typeCode"
                key="CashFlow.typeCode"
              />
              <Column
                title="Month"
                dataIndex="month"
                key="month"
              />
              <Column
                title="Year"
                dataIndex="CashFlow.year"
                key="CashFlow.year"
              />
              <Column
                title="RKAP"
                dataIndex="CashFlow.rkap"
                key="CashFlow.rkap"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Rolling"
                dataIndex="CashFlow.rolling"
                key="CashFlow.rolling"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Ra"
                dataIndex="ra"
                key="ra"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Prog"
                dataIndex="prog"
                key="prog"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Ri"
                dataIndex="ri"
                key="ri"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CashFlowList;
