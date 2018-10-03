import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

import styles from './Nav.css';

const { Sider } = Layout;
const { Item: MenuItem } = Menu;

class Nav extends Component {

  async componentDidMount() {
    const {fetchProducts} = this.props;

    await fetchProducts();
  }

  render() {

    const { toggleShow, menus } = this.props;

    // 专栏
    // 视频课
    // 微课

    return (
      <Sider className={styles.nav} >

        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${menus[0].cid}`]}>
          {menus.map(column =>
            <MenuItem key={column.cid}>
              <Icon type="book" />
              <span>{column.title}</span>
            </MenuItem>
          )}
        </Menu>

        <Icon type="setting" theme="outlined" className={styles.nav__setting}
          onClick={toggleShow} />

      </Sider >

    )
  }
};

const mapState = state => ({
  menus: state.products.products,
});

const mapDispatch = ({
  setting: { toggleShow, },
  products: { fetchProducts, },
}) => ({
  toggleShow, fetchProducts
});

export default connect(mapState, mapDispatch)(Nav);
