import { getGeektimeClient, getStore } from '../utils/index';

const store = getStore();
const articles = {
  state: {
    articles: [],
    asc: store.get('asc', true),
  },

  reducers: {
    setArticles(state, payload) {
      return {
        ...state,
        articles: state.asc ? payload.reverse() : payload,
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
