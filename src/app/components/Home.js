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

const VIEW_FULL = 1; // 三栏模式
const VIEW_CONTENT = 4; // 单文章模式

class Home extends Component {

  componentDidMount() {
    document.title = `GeekTime Desktop (v${version})`;

    const { toggleShow, toggleMode } = this.props;

    ipcRenderer.on('show-settings', toggleShow);

    ipcRenderer.on('toggle-pannel', (e, mode) => {
      toggleMode(mode);
    });
  }

  render() {
    const { viewMode } = this.props;

    const showNav = viewMode === VIEW_FULL;
    const showCatalog = viewMode !== VIEW_CONTENT;
    const layoutMarginLeft = showNav ? 200 : 0;

    return (
      <Layout>
        {showNav && <Nav />}

        <Layout style={{ marginLeft: layoutMarginLeft }}>
          {showCatalog && <Articles />}

          <Content style={{ background: 'white' }}>
            <Article style={{ padding: 10 }}/>
          </Content>
        </Layout>

        <Setting />

      </Layout >
    );
  }
}

const mapState = state => ({
  viewMode: state.setting.viewMode,
});

const mapDispatch = ({
  setting: { toggleShow, toggleMode },
}) => ({
  toggleShow, toggleMode
});

export default connect(mapState, mapDispatch)(Home);
