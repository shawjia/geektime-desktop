import React, { Component } from 'react';
import { Layout } from 'antd';
import { version } from '../package.json';

import Nav from './Nav';
import Setting from './Setting';
import Articles from './Articles';
import Article from './Article';

import styles from './Home.css';

const { Content, Sider } = Layout;

export default class Home extends Component {

  componentDidMount() {
    document.title = `Geektime Desktop (v${version})`;
  }

  render() {
    return (
      <Layout>
        <Nav />

        <Layout style={{ marginLeft: 200 }}>
          <Sider theme="light" width="300" className={styles.articles}>
            <Articles />
          </Sider>
          <Content style={{ background: 'white' }}>
            <Article style={{ padding: 10 }}/>
          </Content>
        </Layout>

        <Setting />

      </Layout >
    );
  }
}
