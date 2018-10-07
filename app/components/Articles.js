import React, { Component, Fragment } from 'react';
import { List, Avatar, Input, message } from 'antd';
import { connect } from 'react-redux';

const { Search } = Input;

class Articles extends Component {

  state = {
    search: '',
  }

  onSearch = (search) => {
    this.setState({ search });
  }

  render() {

    const { articles, fetchArticle, aid } = this.props;
    const { search } = this.state;
    const filterArticles = search === ''
      ? articles
      : articles.filter(v => v.article_title.includes(search));

    if (articles.length && (filterArticles.length === 0)) {
      message.info(`找不到匹配${search}的文章`);
    }

    return (
      <Fragment>
         <Search
          placeholder="搜索标题"
          onSearch={this.onSearch}
          style={{ width: '100%', padding: '5px' }}
        />

        {filterArticles.length > 0 &&
          <List
            itemLayout="horizontal"
            dataSource={filterArticles}
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
        }
      </Fragment>
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
