import { getGeektimeClient } from '../utils/index';

const articles = {
  state: {
    articles: [],
  },

  reducers: {
    setArticles(state, payload) {
      return {
        ...state,
        articles: payload,
      }
    },
  },

  effects: {
    async fetchArticles(cid) {

      const { list } = await getGeektimeClient().articles(cid);


      if (list.length) {
        this.setArticles(list);
      }
    },
  }
}

export default articles;
