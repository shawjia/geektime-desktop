import React, { Component } from 'react';
import { Layout } from 'antd';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';

import { version } from '../package.json';

import Nav from './Nav';
import Setting from './Setting';
import Articles from './Articles';
import Article from './Article';

const { Content } = Layout;

class Home extends Component {

  componentDidMount() {
    document.title = `GeekTime Desktop (v${version})`;

    ipcRenderer.on('show-settings', () => {
      const { toggleShow } = this.props;

      toggleShow();
    });
  }

  render() {
    return (
      <Layout>
        <Nav />

        <Layout style={{ marginLeft: 200 }}>
          <Articles />
          <Content style={{ background: 'white' }}>
            <Article style={{ padding: 10 }}/>
          </Content>
        </Layout>

        <Setting />

      </Layout >
    );
  }
}


const mapDispatch = ({
  setting: { toggleShow },
}) => ({
  toggleShow,
});

export default connect(null, mapDispatch)(Home);
