import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';

class Articles extends Component {

  render() {

    const { articles, fetchArticle, aid } = this.props;

    if (articles.length === 0) {
      return null;
    }

    return (
      <List
        itemLayout="horizontal"
        dataSource={articles}
        renderItem={item => (
          <List.Item onClick={() => fetchArticle(item.id)}
            style={{ background: aid === item.id ? 'white' : '#fafafa' }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.article_cover} />}
              title={item.article_title}
              style={{paddingLeft: 10, paddingRight: 10 }}
            />
          </List.Item>
        )}
      />
    )
  }
};

const mapState = state => ({
  articles: state.articles.articles,
  aid: state.article.aid,
});

const mapDispatch = ({
  article: { fetchArticle, },
}) => ({
  fetchArticle
});

export default connect(mapState, mapDispatch)(Articles);
