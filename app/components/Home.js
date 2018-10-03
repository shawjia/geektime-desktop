import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import Nav from './Nav';
import Setting from './Setting';

import './Home.css';

const { Content } = Layout;

export default class Home extends Component {

  render() {
    return (
      <Layout>
        <Nav />

        <Layout style={{ marginLeft: 200 }}>
          <Content>
            <Spin size="large" />
          </Content>
        </Layout>

        <Setting />

      </Layout >
    );
  }
}
