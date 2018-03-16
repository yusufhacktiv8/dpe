import React from 'react';
import { Select } from 'antd';
import axios from 'axios';
import constant from '../../constant';

const Option = Select.Option;

const ROLES_URL = `${constant.serverUrl}/api/roles`;

class RoleSelect extends React.Component {
  constructor(props) {
    super(props);

    const { value } = this.props;
    this.state = {
      value,
      roles: [],
    };
  }

  componentDidMount() {
    this.getRoles();
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      this.setState({ value });
    }
  }

  onSelect = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  }

  getRoles() {
    axios.get(ROLES_URL, { params: {
      start: 0,
      count: 100,
    } })
      .then((response) => {
        this.setState({
          roles: response.data.rows,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }
  render() {
    const { value, roles } = this.state;
    return (
      <Select
        value={value}
        style={{ width: '100%' }}
        onChange={this.onSelect}
      >
        {roles.map(obj => (
          <Option value={obj.id}>{obj.name}</Option>
        ))}
      </Select>
    );
  }
}

export default RoleSelect;
