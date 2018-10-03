import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

import styles from './Nav.css';

const { Sider } = Layout;
const { Item: MenuItem } = Menu;

class Nav extends Component {

  async componentDidMount() {
    const { fetchProducts, fetchArticles, menus } = this.props;

    await fetchProducts();
    await fetchArticles(menus[0].cid);
  }

  setCid = ({key: cid}) => {
    const {  fetchArticles } = this.props;

    fetchArticles(+cid);
  }

  render() {

    const { toggleShow, menus } = this.props;
    const selected = `${menus[0].cid}`;

    // 专栏
    // 视频课
    // 微课

    return (
      <Sider className={styles.nav} >

        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]}>
          {menus.map(column =>
            <MenuItem key={column.cid} onClick={this.setCid}>
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
  articles: { fetchArticles, },
}) => ({
  toggleShow, fetchProducts, fetchArticles
});

export default connect(mapState, mapDispatch)(Nav);
