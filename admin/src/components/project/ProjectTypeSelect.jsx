import React from 'react';
import { Select } from 'antd';
import axios from 'axios';
import constant from '../../constant';

const Option = Select.Option;

const PROJECT_TYPES_URL = `${constant.serverUrl}/api/projecttypes`;

class ProjectTypeSelect extends React.Component {
  constructor(props) {
    super(props);

    const { value } = this.props;
    this.state = {
      value,
      projectTypes: [],
    };
  }

  componentDidMount() {
    this.getProjectTypes();
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

  getProjectTypes() {
    axios.get(PROJECT_TYPES_URL, {})
      .then((response) => {
        this.setState({
          projectTypes: response.data,
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
    const { value, projectTypes } = this.state;
    return (
      <Select
        value={value}
        style={{ width: '100%' }}
        onChange={this.onSelect}
      >
        {projectTypes.map(obj => (
          <Option value={obj.id}>{obj.name}</Option>
        ))}
      </Select>
    );
  }
}

export default ProjectTypeSelect;
