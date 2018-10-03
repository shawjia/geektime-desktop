import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';

class Articles extends Component {

  render() {

    const { articles } = this.props;

    return (
      <List
        itemLayout="horizontal"
        dataSource={articles}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.article_cover} />}
              title={item.article_title}
              description={item.article_summary}
            />
          </List.Item>
        )}
      />
    )
  }
};

const mapState = state => ({
  articles: state.articles.articles,
});

export default connect(mapState, null)(Articles);
