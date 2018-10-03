import Geektime from 'geektime';
import Store from 'electron-store';

const store = new Store();

function getClient() {
  return new Geektime(store.get('phone'), store.get('password'));
}

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

      const { list } = await getClient().articles(cid);


      if (list.length) {
        this.setArticles(list);
      }
    },
  }
}

export default articles;
