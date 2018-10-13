import React, { Component, Fragment } from 'react';
import { List, Avatar, Input, Icon, message } from 'antd';
import { connect } from 'react-redux';
import Player from 'react-player';
import bgm from '../bgm.mp3';

const { Search } = Input;

class Articles extends Component {

  state = {
    search: '',
  }

  onSearch = (e) => {
    this.setState({ search: e.currentTarget.value });
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

    const { articles, fetchArticle, aid, asc, playing, mp3 } = this.props;
    const { search } = this.state;
    let filterArticles = search === ''
      ? articles
      : articles.filter(v => v.article_title.includes(search));

    if (articles.length && (filterArticles.length === 0)) {
      message.info(`找不到匹配${search}的文章`, 1.5);
      filterArticles = articles;
    }

    const sortIcon = asc ? 'sort-ascending' : 'sort-descending';

    return (
      <Fragment>

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
          url={mp3 || bgm}
        />

        <div>
          <Search
            placeholder="搜索标题"
            onCompositionEnd={this.onSearch}
            style={{ width: '90%', padding: '5px' }}
          />

          <Icon type={sortIcon}
            style={{ width: '10%', cursor: 'pointer' }}
            onClick={this.onClickSort} />
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
      </Fragment>
    )
  }
};

const mapState = state => ({
  articles: state.articles.articles,
  asc: state.articles.asc,
  aid: state.article.aid,
  mp3: state.article.mp3,
  playing: state.article.playing,
});

const mapDispatch = ({
  article: { fetchArticle, playMp3, pauseMp3, },
  articles: { toggleAsc, },
}) => ({
  fetchArticle, playMp3, pauseMp3, toggleAsc,
});

export default connect(mapState, mapDispatch)(Articles);
