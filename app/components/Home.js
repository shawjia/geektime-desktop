import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import Nav from './Nav';
import Setting from './Setting';
import Articles from './Articles';

import './Home.css';

const { Content } = Layout;

export default class Home extends Component {

  render() {
    return (
      <Layout>
        <Nav />

        <Layout style={{ marginLeft: 200, padding: 10 }}>
          <Content>
            <Articles />
          </Content>
        </Layout>

        <Setting />

      </Layout >
    );
  }
}
