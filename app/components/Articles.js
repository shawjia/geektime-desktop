import React, { Component, Fragment } from 'react';
import { List, Avatar, Input, Icon, message } from 'antd';
import { connect } from 'react-redux';

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

  render() {

    const { articles, fetchArticle, aid, asc } = this.props;
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
        <div>
          <Search
            placeholder="搜索标题"
            onCompositionEnd={this.onSearch}
            style={{ width: '90%', padding: '5px' }}
          />

          <Icon type={sortIcon}
            style={{ width: '10%', cursor: 'pointer' }}
            theme="outlined"
            onClick={this.onClickSort} />
        </div>


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
  asc: state.articles.asc,
  aid: state.article.aid,
});

const mapDispatch = ({
  article: { fetchArticle, },
  articles: { toggleAsc, },
}) => ({
  fetchArticle, toggleAsc
});

export default connect(mapState, mapDispatch)(Articles);
