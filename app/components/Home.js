import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import Nav from './Nav';
import Setting from './Setting';
import Articles from './Articles';
import Article from './Article';

import './Home.css';

const { Content, Sider } = Layout;

export default class Home extends Component {

  render() {
    return (
      <Layout>
        <Nav />

        <Layout style={{ marginLeft: 200 }}>
          <Content>
            <Row>
              <Col span={6} style={{ borderRight: '1px solid #e8e8e8'}}>
                <Articles style={{ padding: 10 }} />
              </Col>
              <Col span={18} style={{ padding: 10 }}>
                <Article />
              </Col>
            </Row>
          </Content>
        </Layout>

        <Setting />

      </Layout >
    );
  }
}
