import React, { Component } from 'react';
import { List, Avatar, Input, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import Player from 'react-player';

import styles from './Articles.css';

const { Search } = Input;
const { Sider } = Layout;
const VIEW_FULL = 1; // 三栏模式
const DEFAULT_AUDIO = 'http://freewhitenoise.com/noise/ocean-waves-at-the-beach/Ocean_Surf_Big.ogg';

class Articles extends Component {

  onSearch = (v) => {
    const { setSearch } = this.props;

    setSearch( typeof v === 'string' ? v : v.currentTarget.value );
  }

  onClickSort = () => {
    const { toggleAsc } = this.props;

    toggleAsc();
  }

  toggleMusic = (mp3) => {
    const { playMp3, pauseMp3, playing, mp3: currentMp3 } = this.props;

    return (playing && (mp3 === currentMp3))
      ? pauseMp3()
      : playMp3({ mp3 });
  }

  render() {

    const { filterArticles, fetchArticle, aid, asc, playing, mp3, viewMode
    } = this.props;

    const sortIcon = asc ? 'sort-ascending' : 'sort-descending';
    const left = viewMode === VIEW_FULL ? 200: 0;

    return (
      <Sider theme="light" width="300" className={styles.articles} style={{left}}>

        <div className={styles.player}>
          <Player
            playing={playing}
            height={32}
            width="100%"
            controls
            fileConfig={{
              attributes: {
                controlsList: "nodownload"
              }
            }}
            url={mp3 || DEFAULT_AUDIO}
          />

          <div>
            <Search
              placeholder="搜索标题"
              onCompositionEnd={this.onSearch}
              onSearch={this.onSearch}
              style={{ width: '90%', padding: '5px' }}
            />

            <Icon type={sortIcon}
              style={{ width: '10%', cursor: 'pointer' }}
              onClick={this.onClickSort} />
          </div>
        </div>

        {filterArticles.length > 0 &&
          <List
            itemLayout="horizontal"
            dataSource={filterArticles}
            renderItem={item => (
              <List.Item onClick={() => fetchArticle(item.id)}
              style={{
                background: aid === item.id ? 'white' : '#fafafa',
                paddingRight: 10,
              }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.article_cover} />}
                  title={item.article_title}
                  style={{ paddingLeft: 10, flex: 10, }}
                  />

                {'mp3' in item === true &&
                  <Icon type={ ((item.mp3 === mp3) && playing) ? 'pause-circle' : 'play-circle' }
                    onClick={() => this.toggleMusic(item.mp3) }
                    style={{ fontSize: 28, cursor: 'pointer', margin: 'auto 0' }} />
                }

              </List.Item>
            )}
          />
        }
      </Sider>
    )
  }
};

const mapState = state => ({
  filterArticles: state.articles.filterArticles,
  asc: state.articles.asc,
  aid: state.article.aid,
  mp3: state.article.mp3,
  playing: state.article.playing,
  viewMode: state.setting.viewMode,
});

const mapDispatch = ({
  article: { fetchArticle, playMp3, pauseMp3, },
  articles: { toggleAsc, setSearch, },
}) => ({
  fetchArticle, playMp3, pauseMp3, toggleAsc, setSearch,
});

export default connect(mapState, mapDispatch)(Articles);
