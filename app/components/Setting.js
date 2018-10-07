import React, { Component } from 'react';
import { Icon, Modal, Input } from 'antd';
import { connect } from 'react-redux';

class Setting extends Component {
  state = {
    phone: this.props.phone, // eslint-disable-line
    password: this.props.password, // eslint-disable-line
  }

  setPhone = (e) => {
    this.setState({
      phone: e.currentTarget.value,
    });
  }

  setPassword = (e) => {
    this.setState({
      password: e.currentTarget.value,
    });
  }

  saveSetting = () => {
    const { phone, password } = this.state;
    const { saveSetting, fetchProducts } = this.props;

    saveSetting({ phone, password });
    fetchProducts();
  }

  render() {
    const { show, phone, password, toggleShow } = this.props;

    if (!show) {
      return null;
    }

    return (
      <Modal
        visible
        title="设置"
        okText="保存"
        cancelText="关闭"
        onCancel={toggleShow}
        onOk={this.saveSetting}
        width={280}
      >
        <Input
          prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="tel"
          defaultValue={phone}
          onChange={this.setPhone}
          placeholder="13*********" />

        <Input style={{ marginTop: 10 }}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          defaultValue={password}
          onChange={this.setPassword}
          placeholder="密码" />

      </Modal>
    )
  }
}

const mapState = state => ({
  show: state.setting.show,
  phone: state.setting.phone,
  password: state.setting.password,
});

const mapDispatch = ({
  setting: { toggleShow, saveSetting },
  products: { fetchProducts, },
}) => ({
  toggleShow, saveSetting, fetchProducts,
});

export default connect(mapState, mapDispatch)(Setting);
