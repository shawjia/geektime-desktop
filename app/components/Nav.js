import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

import styles from './Nav.css';

const { Sider } = Layout;
const { Item: MenuItem } = Menu;


class Nav extends Component {

  render() {

    const { toggleShow } = this.props;

    // 专栏
    // 视频课
    // 微课

    return (
      <Sider className={styles.nav} >

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['120']}>
          <MenuItem key="120">
            <Icon type="home" />
            <span>极客新闻</span>
          </MenuItem>
        </Menu>

        <Icon type="setting" theme="outlined" className={styles.nav__setting}
          onClick={toggleShow} />

      </Sider >

    )
  }
};

const mapDispatch = ({
  setting: { toggleShow, fetchProducts }
}) => ({
  toggleShow, fetchProducts
});

export default connect(null, mapDispatch)(Nav);
