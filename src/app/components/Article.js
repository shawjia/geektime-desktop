import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Player from 'react-player';
import { Divider, List, Avatar } from 'antd';
import dayjs from 'dayjs';

import styles from './Article.css';

const dateFormat = 'YYYY-MM-DD';
const VIEW_CONTENT = 4; // 单文章模式

function Replies (props) {
  const { comment_content: content } = props;
  let { replies } = props;

  replies = replies || [] ;

  return (
    <div>
      {/* eslint-disable-next-line */}
      <div dangerouslySetInnerHTML={{__html: content.replace('<br>', '<br />')}} />

      {replies.length > 0 &&
        <Fragment>
          <Divider dashed style={{ margin: '2px 0' }}/>
          <List
            itemLayout="horizontal"
            dataSource={replies}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<p>{item.user_name}
                      <small>  ({dayjs.unix(item.ctime).format(dateFormat)})</small>
                      :
                    </p>
                  }
                  // eslint-disable-next-line
                  description={<div dangerouslySetInnerHTML={{__html: item.content.replace('<br>', '<br />')}} />}
                />
              </List.Item>
            )}
          />
        </Fragment>
      }

    </div>
  );
}

class Article extends Component {

  componentDidUpdate() {
    window.scroll(0, 0);
  }

  render() {

    const { article, comments, viewMode } = this.props;

    if (article === null) {
      return null;
    }

    const hasVideo = article.video_media_map;
    const video = hasVideo
      ? (article.video_media_map.hd || article.video_media_map.sd).url
      : null;

    const marginLeft = viewMode === VIEW_CONTENT ? 0 : 300;

    return (
      <div className={styles.article} style={{ marginLeft }}>
        <h1 className={styles.article__title}>{article.article_title}</h1>

        {article.article_cover !== '' && !hasVideo &&
          <p>
            <img src={article.article_cover} alt="cover"/>
          </p>
        }

        {video !== null &&
          <Player controls width="100%" url={video} />
        }

        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{__html: article.article_content}} />

        <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>
          版权归极客邦科技所有，未经许可不得转载
        </p>


        <Divider>精选留言</Divider>

        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.user_header} />}
                title={<p>{item.user_name}
                    <small>  ({dayjs.unix(item.comment_ctime).format(dateFormat)})</small>
                    :
                  </p>
                }
                description={<Replies {...item} />}
              />
            </List.Item>
          )}
        />


      </div>
    )
  }
};

const mapState = state => ({
  article: state.article.article,
  comments: state.article.comments,
  viewMode: state.setting.viewMode,
});

export default connect(mapState, null)(Article);
