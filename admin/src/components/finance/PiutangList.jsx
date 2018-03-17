import React, { Component } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Table, Button, Input, Row, Col, message } from 'antd';
import constant from '../../constant';

const PROJECTIONS_URL = `${constant.serverUrl}/api/piutangs`;
const Column = Table.Column;

class PiutangList extends Component {
  state = {
    searchText: '',
    piutangs: [],
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
          piutangs: response.data.rows,
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
              dataSource={this.state.piutangs}
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
              scroll={{ x: 2900 }}
            >
              <Column
                width="30"
                title="Month"
                dataIndex="month"
                key="month"
                fixed="left"
              />
              <Column
                width="50"
                title="Year"
                dataIndex="year"
                key="year"
                fixed="left"
              />
              <Column
                width="100"
                title="Owner"
                dataIndex="owner"
                key="owner"
                fixed="left"
              />
              <Column
                width="100"
                title="PDP 1"
                dataIndex="pdp1"
                key="pdp1"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Tagihan Bruto 1"
                dataIndex="tagihanBruto1"
                key="tagihanBruto1"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Usaha 1"
                dataIndex="piutangUsaha1"
                key="piutangUsaha1"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Retensi 1"
                dataIndex="piutangRetensi1"
                key="piutangRetensi1"
                render={text => (numeral(text).format('0,0.00'))}
              />

              <Column
                width="100"
                title="PDP 2"
                dataIndex="pdp2"
                key="pdp2"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Tagihan Bruto 2"
                dataIndex="tagihanBruto2"
                key="tagihanBruto2"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Usaha 2"
                dataIndex="piutangUsaha2"
                key="piutangUsaha2"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Retensi 2"
                dataIndex="piutangRetensi2"
                key="piutangRetensi2"
                render={text => (numeral(text).format('0,0.00'))}
              />

              <Column
                width="100"
                title="PDP 3"
                dataIndex="pdp3"
                key="pdp3"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Tagihan Bruto 3"
                dataIndex="tagihanBruto3"
                key="tagihanBruto3"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Usaha 3"
                dataIndex="piutangUsaha3"
                key="piutangUsaha3"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Retensi 3"
                dataIndex="piutangRetensi3"
                key="piutangRetensi3"
                render={text => (numeral(text).format('0,0.00'))}
              />

              <Column
                width="100"
                title="PDP 4"
                dataIndex="pdp4"
                key="pdp4"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Tagihan Bruto 4"
                dataIndex="tagihanBruto4"
                key="tagihanBruto4"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Usaha 4"
                dataIndex="piutangUsaha4"
                key="piutangUsaha4"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Retensi 4"
                dataIndex="piutangRetensi4"
                key="piutangRetensi4"
                render={text => (numeral(text).format('0,0.00'))}
              />

              <Column
                width="100"
                title="PDP 5"
                dataIndex="pdp5"
                key="pdp5"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Tagihan Bruto 5"
                dataIndex="tagihanBruto5"
                key="tagihanBruto5"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Usaha 5"
                dataIndex="piutangUsaha5"
                key="piutangUsaha5"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                width="100"
                title="Piutang Retensi 5"
                dataIndex="piutangRetensi5"
                key="piutangRetensi5"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PiutangList;
