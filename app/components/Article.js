import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from 'react-player';

import styles from './Article.css';

class Article extends Component {

  render() {

    const { article } = this.props;

    if (article === null) {
      return null;
    }

    const hasVideo = article.video_media_map;
    const video = hasVideo
      ? (article.video_media_map.hd || article.video_media_map.sd).url
      : null;

    return (
      <div className={styles.article}>
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
      </div>
    )
  }
};

const mapState = state => ({
  article: state.article.article,
});

export default connect(mapState, null)(Article);
