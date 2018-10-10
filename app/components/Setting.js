import React, { Component } from 'react';
import { Icon, Modal, Input, message } from 'antd';
import { connect } from 'react-redux';

const InputGroup = Input.Group;
const GRAY = 'rgba(0,0,0,.25)';

class Setting extends Component {
  state = {

    country: this.props.country, // eslint-disable-line
    phone: this.props.phone, // eslint-disable-line
    password: this.props.password, // eslint-disable-line
  }

  setCountry = (e) => {
    this.setState({
      country: e.currentTarget.value.trim(),
    });
  }

  setPhone = (e) => {
    this.setState({
      phone: e.currentTarget.value.trim(),
    });
  }

  setPassword = (e) => {
    this.setState({
      password: e.currentTarget.value.trim(),
    });
  }

  saveSetting = async () => {
    const { country, phone, password } = this.state;
    const { saveSetting, fetchProducts } = this.props;

    saveSetting({ country, phone, password });

    try {
      await fetchProducts();
      message.success('登录成功', 5);
    } catch (err) {
      message.error('登录失败，请重新设置手机密码', 5);
    }
  }

  render() {
    const { show, country, phone, password, toggleShow } = this.props;

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

        <InputGroup compact>
          <Input
            prefix={<Icon type="plus" style={{ color: GRAY }} />}
            style={{ width: '30%' }}
            defaultValue={country}
            onChange={this.setCountry}
            placeholder="区号"/>

          <Input
            prefix={<Icon type="phone" style={{ color: GRAY }} />}
            style={{ width: '70%'}}
            type="tel"
            defaultValue={phone}
            onChange={this.setPhone}
            placeholder="13*********" />
        </InputGroup>

        <Input style={{ marginTop: 10 }}
          prefix={<Icon type="lock" style={{ color: GRAY }} />}
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
  country: state.setting.country,
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
