import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

import styles from './Nav.css';

const { Sider } = Layout;
const { Item: MenuItem } = Menu;

class Nav extends Component {

  async componentDidMount() {
    const { fetchProducts, fetchArticles } = this.props;
    await fetchProducts();

    const { menus } = this.props;
    if (menus.length) {
      await fetchArticles(menus[0].cid);

      const { articles, aid, fetchArticle } = this.props;
      if (articles.length && aid === 0) {
        fetchArticle(articles[0].id);
      }
    }
  }

  setCid = ({key: cid}) => {
    const { fetchArticles } = this.props;

    fetchArticles(+cid);
  }

  render() {

    const { toggleShow, menus } = this.props;

    const haveMenus = menus.length > 0;
    const selected = haveMenus ? `${menus[0].cid}` : '0';

    return (
      <Sider className={styles.nav} >

        <p className={styles.nav__title}>已购专栏</p>

        {menus.length > 0 &&
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]}>
            {menus.map(column =>
              <MenuItem key={`${column.cid}`} onClick={this.setCid}
                style={{lineHeight: 1.5, height: '150%'}}
              >

                <Icon type={column.icon} />
                <span>{column.title}</span>
              </MenuItem>
            )}
          </Menu>
        }

        <Icon type="setting" className={styles.nav__setting}
          onClick={toggleShow} />

      </Sider >

    )
  }
};

const mapState = state => ({
  menus: state.products.products,
  articles: state.articles.articles,
  aid: state.article.aid,
});

const mapDispatch = ({
  setting: { toggleShow, },
  products: { fetchProducts, },
  articles: { fetchArticles, },
  article: { fetchArticle, },
}) => ({
  toggleShow, fetchProducts, fetchArticles, fetchArticle,
});

export default connect(mapState, mapDispatch)(Nav);
