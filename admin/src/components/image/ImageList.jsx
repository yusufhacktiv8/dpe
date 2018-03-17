import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import constant from '../../constant';
import ImageWindow from './ImageWindow';

const IMAGES_URL = `${constant.serverUrl}/api/images`;
const Column = Table.Column;

class ImageList extends Component {
  state = {
    searchText: '',
    selectedImage: {},
    images: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    imageWindowVisible: false,
  }
  componentDidMount() {
    this.getImages();
  }

  getImages() {
    this.setState({
      loading: true,
    });
    axios.get(IMAGES_URL, { params: {
      searchText: this.state.searchText,
      start: (this.state.currentPage - 1) * this.state.pageSize,
      count: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          images: response.data.rows,
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

  filterImages() {
    this.setState({
      currentPage: 1,
    }, () => { this.getImages(); });
  }

  saveImage(image) {
    const hide = message.loading('Action in progress..', 0);
    const { selectedImage } = this.state;
    if (selectedImage.id) {
      axios.put(`${IMAGES_URL}/${selectedImage.id}`, image)
        .then(() => {
          hide();
          this.handleCancel();
          this.getImages();
          message.success('Update image success');
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
      axios.post(IMAGES_URL, image)
        .then(() => {
          hide();
          this.handleCancel();
          this.getImages();
          message.success('Create image success');
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

  deleteImage(image) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${IMAGES_URL}/${image.id}`)
      .then(() => {
        hide();
        this.getImages();
        message.success('Delete image success');
      })
      .catch((error) => {
        hide();
        console.error(error);
      });
  }

  openEditWindow(record) {
    this.setState({
      selectedImage: record,
      imageWindowVisible: true,
    });
  }

  handleCancel() {
    this.setState({
      imageWindowVisible: false,
    });
    this.imageWindow.resetFields();
  }

  handleCreate() {
    this.imageWindow.validateFields((err, values) => {
      if (err) {
        return;
      }

      // console.log('Received values of form: ', values);
      this.saveImage(values);
      this.imageWindow.resetFields();
      this.setState({ imageWindowVisible: false });
    });
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    }, () => { this.getImages(); });
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
                onClick={() => this.filterImages()}
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
              dataSource={this.state.images}
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
                      title={`Are you sure delete image ${record.name}`}
                      onConfirm={() => this.deleteImage(record)}
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

        <ImageWindow
          visible={this.state.imageWindowVisible}
          onCreate={() => this.handleCreate()}
          onCancel={() => this.handleCancel()}
          image={this.state.selectedImage}
          ref={imageWindow => (this.imageWindow = imageWindow)}
        />
      </div>
    );
  }
}

export default ImageList;
